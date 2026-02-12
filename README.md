# APEX Concierge - Ultra-Luxury Mobility Platform

A world-class, enterprise-grade mobility and concierge platform built for ultra-high-net-worth individuals and luxury brands. This is a **fully portable, platform-independent codebase** that you can run anywhere: VS Code, your own servers, or any cloud provider.

---

## Executive Summary

APEX Concierge reimagines premium mobility as a seamless extension of wealth management—combining Uber's logistics precision with Aman Resorts' discretion, Apple's interface elegance, and private banking-grade security. We serve ultra-high-net-worth individuals who demand instant access to luxury vehicles, white-glove concierge services, and curated brand experiences.

### Target Personas
1. **Ultra-High-Net-Worth Individual (UHNWI)** - $50M+ net worth, needs privacy, consistency, zero friction
2. **Executive Assistant / Chief of Staff** - Manages 3-8 principals' schedules and travel
3. **Luxury Brand Partner** - Hotels, fashion houses, dealerships seeking verified affluent clientele
4. **Elite Chauffeur / Security Operator** - 10+ years experience, background-verified professionals

### Key Differentiation
- Membership-first model ($5K-$50K+ annual tiers)
- AI preference engine with LangGraph-powered agents
- Zero-UI booking (voice, assistant APIs, calendar integration)
- Verified luxury network (background-checked, $5M+ liability)
- Concierge marketplace integrated
- Discretion by design (encrypted, no ride sharing, NDA-bound staff)
- SLA guarantees with compensation
- Corporate/EA management tools

---

## Tech Stack

### Frontend
- **Next.js 13+** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Supabase** for auth and database
- **Lucide React** for icons

### Backend
- **Next.js Route Handlers** (API routes)
- **Supabase PostgreSQL** with Row-Level Security
- **pgvector** for RAG embeddings (future)
- **Stripe** for payments (ready to integrate)

### Authentication
- **Supabase Auth** with email/password
- Role-based access control (RBAC)
- JWT tokens with secure session management

### Database
- **PostgreSQL** via Supabase
- 20+ tables with comprehensive schema
- Row-level security policies
- Audit logging built-in

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (free tier works)
- VS Code or any code editor

### 1. Clone and Install

```bash
# Navigate to project directory
cd project

# Install dependencies
npm install
```

### 2. Environment Setup

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: For full functionality
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
OPENAI_API_KEY=sk-...
```

### 3. Database Setup

The database schema has already been created via Supabase migrations. The schema includes:

- **Users & Authentication**: users, profiles, preferences
- **Membership System**: memberships with 4 tiers
- **Fleet Management**: vehicles, chauffeurs
- **Booking System**: bookings, rides
- **Payments**: payment_methods, payments, disputes
- **Concierge**: concierge_requests, partners
- **Safety**: incidents, sos_alerts
- **Compliance**: audit_logs, verification_documents
- **AI/RAG**: knowledge_chunks, agent_actions

All tables have Row-Level Security (RLS) enabled for maximum data protection.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
project/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   │   ├── login/page.tsx        # Login page
│   │   └── signup/page.tsx       # Signup with tier selection
│   ├── dashboard/                # Member dashboard
│   │   └── page.tsx              # Main dashboard
│   ├── layout.tsx                # Root layout with auth provider
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles (luxury dark theme)
│
├── components/                   # UI Components
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       └── ... (50+ components)
│
├── lib/                          # Library code
│   ├── auth/
│   │   └── context.tsx           # Auth context provider
│   ├── supabase/
│   │   └── client.ts             # Supabase client
│   └── utils.ts                  # Utility functions
│
├── .env.local.example            # Environment variables template
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies
```

---

## Database Schema Overview

### Core Tables

#### Users & Authentication
- **users**: Core user identity with roles (rider, chauffeur, EA, ops, admin)
- **profiles**: Personal information, verification status
- **preferences**: User preferences (temperature, music, communication style)

#### Membership System
- **memberships**: Tier assignments (Select, Premier, Obsidian, Corporate)
  - Annual fees: $5,000 - $50,000+
  - Concierge hours included
  - Ride discounts (10%-30%)

#### Fleet & Operations
- **vehicles**: Fleet inventory (sedan, SUV, sprinter)
- **chauffeurs**: Driver roster with certifications, ratings
- **bookings**: Ride requests and scheduling
- **rides**: Actual ride execution with GPS tracking

#### Payments
- **payment_methods**: Tokenized payment methods (Stripe)
- **payments**: Transaction records with audit trail
- **payment_disputes**: Dispute management workflow

#### Concierge & Partners
- **concierge_requests**: Customer service requests
- **partners**: Luxury brand catalog (dining, hotels, events)
- **partner_bookings**: Reservations through concierge

#### Safety & Compliance
- **incidents**: Safety incident reporting
- **sos_alerts**: Emergency alerts with location
- **audit_logs**: Immutable audit trail (7-year retention)
- **verification_documents**: ID verification, background checks

#### AI & Knowledge Base
- **knowledge_chunks**: RAG document storage with embeddings
- **agent_actions**: LLM agent observability logs

### Row-Level Security (RLS)

Every table has RLS policies ensuring:
- Users can only access their own data
- Chauffeurs see assigned rides only
- Operations team has appropriate access levels
- Admins have full access with audit logging
- Partner admins see only their referrals (anonymized)

---

## Authentication & Authorization

### User Roles

1. **rider**: Regular members, book rides and concierge
2. **chauffeur**: Drivers, accept rides, view passenger preferences
3. **ea**: Executive assistants, manage multiple principals
4. **partner_admin**: Luxury brand partners, manage inventory
5. **ops_agent**: Operations team, customer support
6. **ops_manager**: Operations managers, full dashboard access
7. **super_admin**: System administrators, full system access

### Authentication Flow

1. **Sign Up**: User selects membership tier → identity verification → background check → payment setup
2. **Sign In**: Email/password → JWT token → fetch user details → dashboard
3. **Session Management**: Automatic token refresh, secure cookie storage
4. **Sign Out**: Clear session, revoke tokens, redirect to login

### Security Features

- **Encryption**: All PII encrypted at rest (AES-256)
- **Transport Security**: TLS 1.3 for all connections
- **Password Policy**: Minimum 8 characters, bcrypt hashing
- **Session Expiry**: 24-hour tokens with auto-refresh
- **Audit Logging**: All authentication events logged
- **Rate Limiting**: Protection against brute force attacks

---

## Design System

### Color Palette (Dark Mode First)

```css
--background: #0A0A0A (dark base)
--card: #141414 (elevated surface)
--primary: #D4AF37 (gold accent)
--foreground: #F5F5F5 (text)
--muted-foreground: #A3A3A3 (secondary text)
--border: #242424 (subtle dividers)
```

### Typography

- **Font**: Inter (system font, variable)
- **Heading Scale**: 48px → 36px → 28px → 20px
- **Body**: 14-16px with 1.5-1.6 line height
- **Tracking**: -0.02em for large headings

### Component Patterns

- **Glass Morphism**: Subtle backdrop blur on cards
- **Hover Lifts**: 2px translateY on interactive elements
- **Gold Accents**: Used sparingly for CTAs and active states
- **Smooth Animations**: 200ms ease transitions

### Membership Tier Colors

- **Select**: Amber gradient (`tier-select` class)
- **Premier**: Slate gradient (`tier-premier` class)
- **Obsidian**: Black gradient (`tier-obsidian` class)
- **Corporate**: Blue gradient (`tier-corporate` class)

---

## API Architecture (Future Development)

### Planned API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Create account
- `POST /api/v1/auth/login` - JWT token generation
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Invalidate session

#### Booking
- `POST /api/v1/bookings/calculate-price` - Estimate ride cost
- `POST /api/v1/bookings` - Create ride booking
- `GET /api/v1/bookings/:id` - Booking details
- `DELETE /api/v1/bookings/:id` - Cancel booking

#### Dispatch (Chauffeur)
- `GET /api/v1/dispatch/queue` - Pending ride requests
- `POST /api/v1/dispatch/:id/accept` - Accept ride
- `POST /api/v1/dispatch/shift` - Start/end shift

#### Payments
- `POST /api/v1/payments/methods` - Add payment method
- `POST /api/v1/payments/authorize` - Pre-authorize payment
- `POST /api/v1/payments/capture` - Capture authorized payment

#### Concierge
- `POST /api/v1/concierge/request` - Submit concierge request
- `GET /api/v1/concierge/requests` - List user's requests

---

## Deployment Options

### Option 1: Vercel (Recommended for MVP)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# https://vercel.com/[your-project]/settings/environment-variables
```

### Option 2: Docker + Any Cloud Provider

```dockerfile
# Dockerfile (create this)
FROM node:18-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t apex-concierge .
docker run -p 3000:3000 --env-file .env.local apex-concierge
```

### Option 3: Traditional VPS (Ubuntu/Debian)

```bash
# On your server
git clone [your-repo]
cd apex-concierge
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "apex-concierge" -- start
pm2 startup
pm2 save

# Setup Nginx reverse proxy
# Configure SSL with Let's Encrypt
```

### Option 4: AWS/GCP/Azure

- **Compute**: EC2/Compute Engine/App Service
- **Database**: RDS PostgreSQL or use Supabase
- **Storage**: S3/Cloud Storage for uploads
- **CDN**: CloudFront/Cloud CDN for static assets
- **Load Balancer**: ALB/Cloud Load Balancing

---

## Environment Configuration

### Development Environment

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production Environment

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://apexconcierge.com
```

### Required Services

1. **Supabase** (Database + Auth)
   - Create project at supabase.com
   - Run migrations (already done)
   - Get API keys from project settings

2. **Stripe** (Payments - Optional for MVP)
   - Create account at stripe.com
   - Get publishable and secret keys
   - Setup webhook endpoint

3. **Mapbox** (Maps - Optional for MVP)
   - Create account at mapbox.com
   - Get access token

4. **OpenAI** (AI Agents - Optional for MVP)
   - Create account at openai.com
   - Get API key

---

## Security Checklist

### Before Production Launch

- [ ] Rotate all API keys and secrets
- [ ] Enable Supabase RLS on all tables
- [ ] Configure CORS properly
- [ ] Setup rate limiting
- [ ] Enable HTTPS/SSL
- [ ] Configure CSP headers
- [ ] Setup monitoring (Sentry, LogRocket)
- [ ] Perform security audit
- [ ] Test backup/restore procedures
- [ ] Document incident response plan
- [ ] Setup DDoS protection (Cloudflare)
- [ ] Enable WAF rules
- [ ] Configure audit log retention
- [ ] Test disaster recovery
- [ ] Train staff on security protocols

---

## Testing Strategy

### Unit Tests (Future)

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

### Integration Tests

```bash
# Install Playwright
npm install --save-dev @playwright/test

# Run E2E tests
npx playwright test
```

### Load Testing

```bash
# Install Artillery
npm install --save-dev artillery

# Run load tests
artillery run load-test.yml
```

---

## Monitoring & Observability

### Recommended Tools

1. **Sentry** - Error tracking
2. **LogRocket** - Session replay
3. **Vercel Analytics** - Performance metrics
4. **Supabase Dashboard** - Database monitoring
5. **Stripe Dashboard** - Payment monitoring

### Key Metrics to Track

- **Performance**: Page load time, API response time
- **Reliability**: Uptime, error rate
- **Business**: Conversion rate, booking completion rate
- **User Experience**: Time to book, satisfaction scores

---

## Scaling Strategy

### What Breaks First

1. **Dispatch matching** during surge (100+ concurrent bookings)
   - Solution: Move to dedicated service, horizontal scaling

2. **Real-time tracking** WebSocket connections (1000+ active rides)
   - Solution: Redis pub/sub, connection pooling

3. **RAG queries** under load
   - Solution: Cache common queries, read replicas

4. **Payment processing** rate limits
   - Solution: Batch processing for corporate invoices

### Architecture Evolution

- **Phase 1 (MVP)**: Next.js monolith with Route Handlers
- **Phase 2 (V1)**: Extract AI services to separate container
- **Phase 3 (Scale)**: Microservices for Booking, Dispatch, Payment
- **Phase 4 (Enterprise)**: Kubernetes with service mesh

---

## Roadmap

### MVP (Weeks 1-8) ✅
- [x] Database schema and migrations
- [x] Authentication system
- [x] Landing page with tier selection
- [x] Dashboard skeleton
- [ ] Ride booking flow
- [ ] Payment integration
- [ ] Admin portal basics

### V1 (Months 3-6)
- [ ] AI agents (LangGraph)
- [ ] RAG knowledge base
- [ ] Partner marketplace
- [ ] Corporate/EA tools
- [ ] Multi-city expansion (NYC, LA, SF, Miami)

### V2 (Year 1+)
- [ ] Mobile apps (React Native)
- [ ] International expansion
- [ ] White-label platform
- [ ] Advanced analytics
- [ ] Predictive AI features

---

## Contributing

This is a private, proprietary codebase. Internal development guidelines:

1. **Branch Strategy**: `main` → `develop` → feature branches
2. **Code Reviews**: Required for all changes
3. **Testing**: Unit tests required for business logic
4. **Documentation**: Update README for major features
5. **Security**: Never commit secrets or PII

---

## Support & Documentation

### Technical Support
- Email: dev@apexconcierge.com
- Slack: #engineering (internal)

### Additional Documentation
- API Documentation: `/docs/api.md`
- Database Schema: `/docs/schema.md`
- Security Guide: `/docs/security.md`
- Deployment Guide: `/docs/deployment.md`

---

## License

Proprietary and Confidential. All rights reserved.

Copyright © 2024 APEX Concierge Inc.

---

## Acknowledgments

Built with:
- Next.js 13+ (App Router)
- Supabase (Database + Auth)
- Tailwind CSS (Styling)
- shadcn/ui (Component Library)
- TypeScript (Type Safety)

---

**Ready to elevate luxury mobility. Deploy anywhere, run everywhere.**
