# Pastelaria VistaPark

Responsive web app for condominium residents to order sweet and savory pastels through WhatsApp, without an internal payment system.

## Features

- Filter between sweet and savory options
- Select quantities per flavor and add notes (e.g., no onion, extra cheese)
- Choose a payment method (Card, Pix, or Cash) with change amount input
- Provide building tower and apartment for delivery
- Generate a WhatsApp deep link with a preformatted order message

## Tech Stack

- Next.js 15 for routing, SSR/SSG, and performance optimizations
- React 19 for the UI layer
- TypeScript for static typing
- Tailwind CSS 4 for responsive, utility-first styling
- React Hook Form + Zod for form state and validation
- Lucide React for icons
- Framer Motion for UI animation
- Local Storage for cart persistence between sessions
- WhatsApp deep link for order submission

## Language

- TypeScript (primary)
- JavaScript (runtime dependencies)

## Requirements

- Node.js 18+ (LTS recommended)
- npm, pnpm, or yarn

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm run start` - start the production server
- `npm run lint` - run lint checks
