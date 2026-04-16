const FUB_BASE = "https://api.followupboss.com/v1";

interface FubRequestOptions {
  apiKey: string;
  method?: string;
  path: string;
  body?: Record<string, unknown>;
  params?: Record<string, string>;
}

async function fubFetch<T>({ apiKey, method = "GET", path, body, params }: FubRequestOptions): Promise<T> {
  const url = new URL(`${FUB_BASE}${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`FUB API ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

interface FubPerson {
  id: number;
  firstName: string | null;
  lastName: string | null;
  emails: { value: string; type: string }[];
  tags: string[];
}

interface FubPeopleResponse {
  people: FubPerson[];
  _metadata: { total: number };
}

/** Verify an API key is valid by fetching account info */
export async function verifyFubKey(apiKey: string): Promise<boolean> {
  try {
    await fubFetch({ apiKey, path: "/me" });
    return true;
  } catch {
    return false;
  }
}

/** Fetch all people (contacts) from Follow Up Boss */
export async function getFubContacts(apiKey: string, limit = 100, offset = 0): Promise<FubPeopleResponse> {
  return fubFetch<FubPeopleResponse>({
    apiKey,
    path: "/people",
    params: { limit: String(limit), offset: String(offset), sort: "created" },
  });
}

/** Add a note to a person in Follow Up Boss */
export async function addFubNote(apiKey: string, personId: number, subject: string, body: string): Promise<void> {
  await fubFetch({
    apiKey,
    method: "POST",
    path: "/notes",
    body: { personId, subject, body },
  });
}

/** Find a person by email */
export async function findFubPersonByEmail(apiKey: string, email: string): Promise<FubPerson | null> {
  const data = await fubFetch<FubPeopleResponse>({
    apiKey,
    path: "/people",
    params: { emails: email, limit: "1" },
  });
  return data.people?.[0] ?? null;
}

/** Push a "report sent" event as a note to the matching FUB contact */
export async function pushReportToFub(
  apiKey: string,
  recipientEmail: string,
  reportTitle: string,
  reportUrl: string
): Promise<boolean> {
  try {
    const person = await findFubPersonByEmail(apiKey, recipientEmail);
    if (!person) return false;

    await addFubNote(
      apiKey,
      person.id,
      `Market Report Sent: ${reportTitle}`,
      `A new market report "${reportTitle}" was sent to this contact via MarketPulse.\n\nView report: ${reportUrl}`
    );
    return true;
  } catch {
    return false;
  }
}
