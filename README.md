# Angie Created — Website

Built with Next.js 14, TypeScript, Tailwind CSS, and Stripe.

---

## Running Locally

```bash
# Install dependencies
npm install

# Copy env file and fill in your keys
cp .env.local.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How to Add a New Product

1. Open `/data/products.ts`
2. Add a new object to the `products` array following the `Product` interface in `/lib/types.ts`
3. Create a Stripe Product + Price in your [Stripe Dashboard](https://dashboard.stripe.com/products)
4. Paste the Price ID (starts with `price_`) into the `stripePriceId` field
5. Add a product photo to `/public/images/products/`
6. Done — the product will appear automatically on the Shop page

**Example:**
```ts
{
  id: 'garden-trowel',
  slug: 'garden-trowel',
  name: 'Hand-Painted Garden Trowel',
  description: 'A custom-painted trowel, perfect for the plant lover in your life.',
  longDescription: '...',
  price: 2500,
  displayPrice: '$25',
  category: 'tote', // use 'digital' for non-physical items
  images: ['/images/products/garden-trowel.jpg'],
  stripePriceId: 'price_XXXXX', // from Stripe dashboard
  available: true,
  badge: 'New',
}
```

---

## How to Add a New Workshop

1. Open `/data/workshops.ts`
2. Add a new object to the `workshops` array
3. Create a Stripe Product + Price (one-time payment) in your [Stripe Dashboard](https://dashboard.stripe.com/products)
4. Paste the Price ID into `stripePriceId`
5. Update `date` to the actual workshop date (ISO format: `'2025-05-10T19:00:00'`)
6. Set `spotsRemaining` to the number of open spots

To **mark a workshop as sold out**, set `available: false` or `spotsRemaining: 0`.

---

## How to Add Portfolio Photos

1. Drop the photo into `/public/images/portfolio/`
2. Open `/data/portfolio.ts`
3. Add a new entry:
```ts
{
  id: '11',
  title: 'My New Project',
  category: 'diy', // diy | tote | recipe | garden | workshop
  imageSrc: '/images/portfolio/my-new-project.jpg',
  description: 'Short description shown on hover.',
  featured: false, // set true to make the card taller
}
```

---

## Stripe Setup (Step by Step)

1. Create a free account at [stripe.com](https://stripe.com)
2. Go to **Products** → **+ Add product**
3. Create a product for each item (e.g. "Custom Tote Bag")
4. Add a **One-time price** for each (e.g. $35.00)
5. Click the price — copy the **Price ID** (starts with `price_`)
6. Paste it into the `stripePriceId` field in `/data/products.ts` or `/data/workshops.ts`
7. Copy your **Publishable key** and **Secret key** from the API keys page
8. Paste into `.env.local`

**For webhooks (to receive payment confirmations):**
1. Install Stripe CLI: [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET` in `.env.local`
4. In production: add the webhook endpoint in your Stripe dashboard → Webhooks

---

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. In **Environment Variables**, add all the values from your `.env.local`:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your live URL, e.g. `https://angiecreated.com`)
4. Click **Deploy** 🎉
5. Point your domain DNS to Vercel (Settings → Domains)

---

## Environment Variables

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → API keys |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks (or CLI) |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL (e.g. `https://angiecreated.com`) |

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Payments**: [Stripe Checkout](https://stripe.com/docs/checkout)
- **Email**: [Resend](https://resend.com) (TODO: connect)
- **Fonts**: Playfair Display + Lato (Google Fonts)
- **Hosting**: [Vercel](https://vercel.com)
