# AI Business Generator SaaS

A production-ready AI SaaS platform that generates product descriptions, SEO content, marketing ads, business ideas, and social media content.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **AI:** Google Gemini API
- **Payments:** Stripe + JazzCash

## Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env variables
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Fill in your .env variables
npm run dev
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-saas
JWT_SECRET=your-super-secret-jwt-key
GEMINI_API_KEY=your-gemini-api-key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
FRONTEND_URL=http://localhost:5173
JAZZCASH_MERCHANT_ID=your_jazzcash_merchant_id
JAZZCASH_PASSWORD=your_jazzcash_password
JAZZCASH_HASH_KEY=your_jazzcash_hash_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public
```

## Deployment

### MongoDB Atlas
1. Create cluster at https://cloud.mongodb.com
2. Create database user
3. Whitelist 0.0.0.0/0 for IP access
4. Get connection string

### Backend (Render)
1. Push code to GitHub
2. Connect repo to Render
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy

## Pricing Plans
- **Free:** 5 AI requests/day
- **Pro:** $9/month - Unlimited
- **Enterprise:** $99/month - Unlimited + Priority
