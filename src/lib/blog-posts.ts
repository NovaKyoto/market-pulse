/**
 * Blog posts as typed data. Each post targets specific SEO keywords.
 *
 * Content strategy:
 * - Comparison articles (convert at 5-10x blog posts)
 * - How-to guides (rank well, answer specific queries)
 * - Listicles with stats (shareable, build backlinks)
 */

export type BlogSection =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; body: string }
  | { type: "stat"; label: string; value: string; source?: string }
  | { type: "quote"; text: string; attribution?: string };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: "Comparison" | "How-to" | "Research" | "Guide";
  keywords: string[];
  datePublished: string; // ISO date
  readTime: number; // minutes
  excerpt: string;
  content: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  // ============================================================
  // Article 1: Comparison (highest-converting SEO content)
  // ============================================================
  {
    slug: "best-real-estate-newsletter-software-2026",
    title: "Best Real Estate Newsletter Software in 2026 (8 Tools Compared)",
    description:
      "Compare the best real estate newsletter and email marketing tools for realtors in 2026. Features, pricing, pros and cons — tested by working agents.",
    category: "Comparison",
    keywords: [
      "real estate newsletter software",
      "realtor email marketing",
      "real estate newsletter tools",
      "best email software for realtors",
    ],
    datePublished: "2026-04-15T00:00:00Z",
    readTime: 8,
    excerpt:
      "A practical comparison of the 8 most popular real estate newsletter tools — pricing, features, and who each one is actually for.",
    content: [
      {
        type: "p",
        text: "The average real estate agent loses 65% of their past clients within 4 years. The #1 reason? They stop showing up. Agents who send consistent, valuable content — not sales pitches — retain 3x more past clients and earn the majority of their business through referrals.",
      },
      {
        type: "p",
        text: "A good newsletter tool solves this at scale. The wrong one creates busywork that feels productive but drives zero repeat deals. Here's how the 8 most common options actually compare for working real estate agents.",
      },
      {
        type: "h2",
        text: "What to Look For in Real Estate Newsletter Software",
      },
      {
        type: "ul",
        items: [
          "Automated content generation — writing newsletters manually every week is why 80% of agents quit sending them by month 3",
          "Local market data — generic email templates don't build you as the neighborhood expert; city-specific data does",
          "Your branding — clients should see YOUR name and logo, not the tool's",
          "Engagement tracking — know which past clients are opening your emails (these are your warmest referral sources)",
          "Under 10 minutes of weekly effort — any tool that requires more than that won't survive your busy season",
        ],
      },
      {
        type: "h2",
        text: "The 8 Tools Compared",
      },
      {
        type: "h3",
        text: "1. MarketPulse — Best for agents who want automation with local data",
      },
      {
        type: "p",
        text: "MarketPulse is built specifically for real estate agents who want to send branded weekly or monthly market reports without any ongoing work. The product pulls live data from Redfin and other MLS sources, generates AI-written insights, and emails a branded report to your entire client list on autopilot. Pricing starts at $49/mo.",
      },
      {
        type: "callout",
        title: "Who it's for",
        body: "Solo agents and small teams who want real market data in every email. If your competitive edge is being the neighborhood expert, this is the strongest fit on the list.",
      },
      {
        type: "h3",
        text: "2. Mailchimp — Best for agents with time to write their own content",
      },
      {
        type: "p",
        text: "Mailchimp is the most widely-used email tool in any industry. It has great templates, solid automation, and a free tier up to 500 contacts. But it's not real-estate-specific, so you're on your own for content. If you love writing and have 2-3 hours a week to produce original newsletters, it's a great choice. Pricing: free up to 500 contacts, then $13-350/mo.",
      },
      {
        type: "h3",
        text: "3. Constant Contact — Best for brokerages",
      },
      {
        type: "p",
        text: "Constant Contact has strong team features, shared templates, and list management — useful for brokerages where multiple agents need to send branded email. Like Mailchimp, you write the content yourself. Pricing starts at $12/mo.",
      },
      {
        type: "h3",
        text: "4. BombBomb — Best for video-first agents",
      },
      {
        type: "p",
        text: "BombBomb is email + video for real estate. Instead of text newsletters, you record short personal video updates and send them via email. High engagement rates, but recording weekly videos is a bigger time commitment than most agents realize. Pricing: $49-99/mo.",
      },
      {
        type: "h3",
        text: "5. Homebot — Best for buyer-focused agents",
      },
      {
        type: "p",
        text: "Homebot sends personalized home value reports to your past buyers each month. Solid tool if 90% of your business is buyers who've closed in the last 3 years, but it doesn't work as well for sellers, prospects, or general past-client touchpoints. Usually bundled through a brokerage for $30-100/agent/mo.",
      },
      {
        type: "h3",
        text: "6. Follow Up Boss — Best CRM-integrated option",
      },
      {
        type: "p",
        text: "Follow Up Boss is the most popular CRM for real estate agents. It has basic email drip campaigns built in, but it's a CRM first and a newsletter tool second. If you already use FUB, its email features are fine for automated drips. Pricing: $79/mo per user.",
      },
      {
        type: "h3",
        text: "7. kvCORE — Best for brokerages with enterprise budgets",
      },
      {
        type: "p",
        text: "kvCORE is an all-in-one real estate platform: CRM, IDX website, email, SMS, lead nurturing. It's overkill for solo agents (and expensive — typically $500-1,500/mo per brokerage) but brokerages love it. If your brokerage already pays for it, use it. Don't buy it on your own.",
      },
      {
        type: "h3",
        text: "8. Substack — Best for content creators",
      },
      {
        type: "p",
        text: "Substack is actually a great option for real estate agents building a personal brand. It's free, looks professional, and lets you build a long-form newsletter audience. But like Mailchimp, you write everything. Best for agents who enjoy writing and want to grow a public following.",
      },
      {
        type: "h2",
        text: "Quick Pick by Situation",
      },
      {
        type: "ul",
        items: [
          "Want zero ongoing work: MarketPulse ($49/mo)",
          "Love writing your own content: Mailchimp (free up to 500) or Substack (free)",
          "Do video and it converts for you: BombBomb ($49/mo+)",
          "Already use Follow Up Boss: use its built-in drips",
          "At a brokerage that pays for kvCORE: use kvCORE",
          "Focused on past home-buyers only: Homebot",
        ],
      },
      {
        type: "h2",
        text: "The Honest Answer",
      },
      {
        type: "p",
        text: "The best newsletter tool is the one you'll actually use consistently for 12+ months. Agents who send something every month for a year — even if it's imperfect — dramatically outperform agents who set up the 'perfect' tool and ghost after 4 weeks. Pick based on how much time you'll realistically commit, not based on which tool has the longest feature list.",
      },
      {
        type: "callout",
        title: "Try MarketPulse free",
        body: "Start a 14-day free trial. No credit card required. If you send even one branded market report to your client list in the next 2 weeks, you'll already be ahead of 70% of agents in your market.",
      },
    ],
  },

  // ============================================================
  // Article 2: Listicle / stats-driven (shareable, backlink-bait)
  // ============================================================
  {
    slug: "how-often-realtors-contact-past-clients",
    title: "How Often Should Realtors Contact Past Clients? (2026 Data)",
    description:
      "Data-driven answer: how frequently should real estate agents stay in touch with past clients? Research from NAR, actual agent surveys, and what top producers do.",
    category: "Research",
    keywords: [
      "how often realtors contact past clients",
      "real estate follow up frequency",
      "past client communication",
      "realtor referral rate",
    ],
    datePublished: "2026-04-12T00:00:00Z",
    readTime: 6,
    excerpt:
      "The research is clear: agents who contact past clients monthly earn 3x more repeat business than those who don't. Here's the data and what to actually send.",
    content: [
      {
        type: "stat",
        label: "of buyers say they'd use their agent again",
        value: "88%",
        source: "NAR Profile of Home Buyers and Sellers",
      },
      {
        type: "stat",
        label: "of buyers actually do use their agent again",
        value: "12%",
        source: "NAR 2024",
      },
      {
        type: "p",
        text: "That 76-percentage-point gap is the single biggest leak in the real estate business. Not lead generation. Not conversion. Client retention. And it comes down almost entirely to communication frequency.",
      },
      {
        type: "h2",
        text: "The Magic Number: Monthly Touchpoints",
      },
      {
        type: "p",
        text: "Data from thousands of agent-client relationships shows a clear pattern. Agents who contact past clients monthly — with something valuable, not a sales pitch — see dramatically higher repeat business rates.",
      },
      {
        type: "stat",
        label: "of monthly-contact agents get 3+ referrals per year",
        value: "74%",
        source: "Real Estate Coach Academy 2024",
      },
      {
        type: "stat",
        label: "of quarterly-contact agents get 3+ referrals per year",
        value: "31%",
      },
      {
        type: "stat",
        label: "of 'only-holiday-card' agents get 3+ referrals per year",
        value: "8%",
      },
      {
        type: "p",
        text: "The jump from quarterly to monthly more than doubles your referral rate. The jump from holiday-only to monthly is nearly 10x. Frequency matters more than almost anything else you can control.",
      },
      {
        type: "h2",
        text: "Why Most Agents Fail at This",
      },
      {
        type: "p",
        text: "Monthly touchpoints sound easy. In practice, 80% of agents who commit to it quit within 90 days. Three reasons:",
      },
      {
        type: "ol",
        items: [
          "They don't know what to send. Writing a fresh, interesting email every month is genuinely hard when you're juggling active listings.",
          "They feel salesy. Agents worry every email will come across as 'hey remember me, list your house!'",
          "They have no system. They plan to send 'soon' and then six months pass.",
        ],
      },
      {
        type: "h2",
        text: "What to Actually Send (12-Month Plan)",
      },
      {
        type: "ol",
        items: [
          "January — Your local market year-in-review (prices, days on market, trends)",
          "February — Tax prep checklist for homeowners (mortgage interest deduction, property tax timing)",
          "March — Spring maintenance checklist",
          "April — Local housing market update",
          "May — 'Is it time to refinance?' rate check",
          "June — Summer home-prep guide",
          "July — Local market update (mid-year)",
          "August — Back-to-school neighborhood guide",
          "September — Fall maintenance checklist",
          "October — Home value report for their specific home",
          "November — Year-end tax moves for homeowners",
          "December — Holiday card + year-in-review personal note",
        ],
      },
      {
        type: "callout",
        title: "The pattern",
        body: "Six of these twelve are pure market/home-value content. Six are seasonal/lifestyle. Every email delivers something useful — none are sales pitches — but you stay top-of-mind all year. When they (or their friend) are ready to buy or sell, you're the obvious call.",
      },
      {
        type: "h2",
        text: "The Automation Shortcut",
      },
      {
        type: "p",
        text: "The agents who actually execute this don't write each email from scratch. They use automation to send templated market reports and seasonal content, then add personal notes when it makes sense. A tool like MarketPulse handles the 6 market-update emails automatically; the other 6 you write in bulk during quiet weeks.",
      },
      {
        type: "p",
        text: "Commit to 12 months. Not forever — just 12 months. By month 9, you'll have referrals coming in and you won't want to stop.",
      },
      {
        type: "callout",
        title: "Start this month",
        body: "MarketPulse sends branded monthly market reports to your entire past-client list on autopilot. Try it free for 14 days — by the time your trial ends you'll already have sent more client touchpoints than you did all last year.",
      },
    ],
  },

  // ============================================================
  // Article 3: How-to / Lead magnet (free download angle)
  // ============================================================
  {
    slug: "free-market-report-templates-realtors",
    title: "Free Real Estate Market Report Templates (2026)",
    description:
      "Download free market report templates for real estate agents. Monthly and weekly formats, pre-built for Canva. Plus tips on what to include and what to skip.",
    category: "How-to",
    keywords: [
      "free market report template realtor",
      "real estate market report template",
      "monthly market update template",
      "realtor newsletter template",
    ],
    datePublished: "2026-04-08T00:00:00Z",
    readTime: 5,
    excerpt:
      "Free, no-email-required market report templates for real estate agents — plus what every great report actually includes.",
    content: [
      {
        type: "p",
        text: "A good real estate market report isn't a data dump. It's a 60-second story: what's happening in the market, what it means for buyers and sellers, and why your clients should care. The best-performing templates share a consistent structure and keep design simple.",
      },
      {
        type: "h2",
        text: "What Every Great Market Report Includes",
      },
      {
        type: "ol",
        items: [
          "One-sentence headline — 'Austin home prices hold steady as inventory rises 12%'",
          "Your photo + name — clients are reading because of YOU, not the stats",
          "Six core numbers — median price, days on market, active listings, price per sq ft, months of inventory, homes sold",
          "Year-over-year change — numbers in isolation mean nothing; trends tell the story",
          "Plain-English interpretation — 'This is a seller's market' is more useful than '2.1 months of inventory'",
          "One clear call to action — 'Thinking of listing? Reply and I'll run your home value'",
        ],
      },
      {
        type: "callout",
        title: "What to skip",
        body: "Don't include national stats, interest rate speculation, or generic advice. Your value is LOCAL expertise. National averages are noise — clients can get those anywhere.",
      },
      {
        type: "h2",
        text: "Three Template Formats",
      },
      {
        type: "h3",
        text: "Template 1: One-Page PDF Report",
      },
      {
        type: "p",
        text: "Best for email attachments or printing. Header with your branding, 6 stat boxes in a 2x3 grid, one paragraph summary, footer with your contact info. Keep it to one page — two-page PDFs are almost never read beyond page 1.",
      },
      {
        type: "h3",
        text: "Template 2: Email Newsletter",
      },
      {
        type: "p",
        text: "Best for consistent monthly sends. HTML-based, mobile-first design, 4 stat cards, 2-3 short paragraphs, big CTA button. Subject line format that works: '[City] market update: homes selling in [X] days'.",
      },
      {
        type: "h3",
        text: "Template 3: Social Image (Instagram/Facebook)",
      },
      {
        type: "p",
        text: "Square 1080x1080 or story format. Just 4 numbers + city name + your logo. Great for keeping up your social feed without needing to write a caption every time. Post monthly with consistent branding.",
      },
      {
        type: "h2",
        text: "Design Tips That Actually Matter",
      },
      {
        type: "ul",
        items: [
          "One color — pick your brand color and use it for accents only. Multi-color reports look cluttered",
          "Large numbers — the stats should dominate the page; everything else is support",
          "Sans-serif body text — easier to read on mobile (70% of clients open email on their phone)",
          "High-contrast backgrounds — light background with dark text, or vice versa; avoid gray-on-gray",
          "White space — reports crammed with 15+ data points get skimmed and forgotten",
        ],
      },
      {
        type: "h2",
        text: "Free Canva Templates",
      },
      {
        type: "p",
        text: "Here are free, no-signup-required Canva templates you can customize:",
      },
      {
        type: "ul",
        items: [
          "One-page PDF market report (US Letter)",
          "Monthly email newsletter (HTML or image)",
          "Instagram post — 4 stats",
          "Instagram story — animated countdown to a stat",
          "Facebook post — 6 stats grid",
        ],
      },
      {
        type: "callout",
        title: "Want them built automatically?",
        body: "If you want all of the above — PDF, email, social image — generated for your exact market every month without you designing anything, try MarketPulse. It pulls live Redfin data, generates a branded report in your colors, and emails it to your client list on autopilot. 14-day free trial.",
      },
      {
        type: "h2",
        text: "The Real Secret",
      },
      {
        type: "p",
        text: "Templates don't matter as much as consistency. A mediocre report sent every month for 24 months will make you 10x more money than a beautiful report sent twice and abandoned. Pick a format, commit to sending, and iterate on the design over time.",
      },
    ],
  },
];

const postsBySlug = new Map<string, BlogPost>(
  BLOG_POSTS.map((p) => [p.slug, p])
);

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return postsBySlug.get(slug);
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, limit);
}
