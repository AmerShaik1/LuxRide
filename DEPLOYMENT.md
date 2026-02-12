# APEX Concierge - Deployment Guide

Complete deployment instructions for running APEX Concierge in VS Code, on your own servers, or any cloud platform.

---

## Table of Contents

1. [Local Development in VS Code](#1-local-development-in-vs-code)
2. [Supabase Setup](#2-supabase-setup)
3. [Environment Configuration](#3-environment-configuration)
4. [Deploy to Vercel](#4-deploy-to-vercel)
5. [Deploy to AWS](#5-deploy-to-aws)
6. [Deploy to Your Own Server](#6-deploy-to-your-own-server)
7. [Deploy with Docker](#7-deploy-with-docker)
8. [CI/CD Setup](#8-cicd-setup)
9. [Post-Deployment Checklist](#9-post-deployment-checklist)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Local Development in VS Code

### Prerequisites

- **Node.js 18+** (Download from [nodejs.org](https://nodejs.org/))
- **npm** (comes with Node.js)
- **VS Code** (Download from [code.visualstudio.com](https://code.visualstudio.com/))
- **Git** (for version control)

### Step 1: Open Project in VS Code

```bash
# Navigate to the project directory
cd /path/to/apex-concierge

# Open in VS Code
code .
```

### Step 2: Install Dependencies

Open VS Code's integrated terminal (`` Ctrl+` `` or `Cmd+` `) and run:

```bash
npm install
```

This will install all required packages defined in `package.json`.

### Step 3: Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials (see [Section 2](#2-supabase-setup)).

### Step 4: Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Step 5: VS Code Recommended Extensions

Install these extensions for the best development experience:

- **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- **Prettier - Code formatter** (esbenp.prettier-vscode)
- **ESLint** (dbaeumer.vscode-eslint)
- **TypeScript Vue Plugin (Volar)** (Vue.volar)

### Step 6: TypeScript Checking

Run type checking manually:

```bash
npm run typecheck
```

Or enable VS Code's built-in TypeScript checking (should be automatic).

---

## 2. Supabase Setup

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com/)
2. Sign up or log in
3. Click "New Project"
4. Choose organization, project name, database password, and region (US East for low latency)
5. Wait 2-3 minutes for project provisioning

### Get API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (safe to expose in frontend)
   - **service_role** key (NEVER expose in frontend, server-side only)

### Run Database Migrations

The database schema has already been applied via the Supabase dashboard during project creation. However, if you need to apply it manually:

1. Go to **SQL Editor** in Supabase dashboard
2. Copy the contents of the migration file (already applied)
3. Or use Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Check migration status
supabase db remote ls
```

### Verify Tables

Go to **Table Editor** in Supabase dashboard and verify these tables exist:
- users
- profiles
- memberships
- bookings
- rides
- payments
- concierge_requests
- partners
- and more (20+ tables total)

---

## 3. Environment Configuration

### Required Variables

Edit `.env.local`:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Optional Variables (for Full Functionality)

```env
# Stripe (Payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Mapbox (Maps)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...

# OpenAI (AI Agents)
OPENAI_API_KEY=sk-...

# Twilio (SMS Notifications)
TWILIO_ACCOUNT_SID=ACxxxx...
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid (Email)
SENDGRID_API_KEY=SG.xxxx...
SENDGRID_FROM_EMAIL=noreply@apexconcierge.com

# Redis (Caching & Queues - Optional)
REDIS_URL=redis://localhost:6379
```

### Production Variables

For production, also set:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 4. Deploy to Vercel

Vercel is the recommended platform for Next.js applications (fastest and easiest).

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com/)
2. Sign up / Log in
3. Click "Add New..." → "Project"
4. Import your Git repository (GitHub, GitLab, or Bitbucket)
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or leave blank)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Add environment variables (from `.env.local`)
7. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy from project directory
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? apex-concierge
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### Set Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add all variables from `.env.local`
4. For each variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co`
   - Environment: Production (and optionally Preview, Development)
5. Click "Save"
6. Redeploy to apply changes

### Custom Domain

1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `apexconcierge.com`)
3. Follow DNS configuration instructions
4. Vercel automatically provisions SSL certificate

---

## 5. Deploy to AWS

### Architecture

- **Compute**: AWS Amplify or EC2 + ECS
- **Database**: Use Supabase (hosted PostgreSQL)
- **Storage**: S3 for file uploads
- **CDN**: CloudFront for static assets

### Option A: AWS Amplify (Easiest)

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `.next`
5. Add environment variables
6. Deploy

### Option B: EC2 + Docker (Advanced)

```bash
# Launch EC2 instance (Ubuntu 22.04, t3.medium)
# SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Clone your repository
git clone https://github.com/yourusername/apex-concierge.git
cd apex-concierge

# Create .env.local with production values
nano .env.local

# Build Docker image
docker build -t apex-concierge .

# Run container
docker run -d -p 80:3000 --env-file .env.local --name apex apex-concierge

# Setup Nginx reverse proxy (optional)
sudo apt install nginx
# Configure nginx to proxy to localhost:3000
```

### Option C: ECS (Elastic Container Service)

1. Create ECR repository
2. Build and push Docker image:

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_URL

docker build -t apex-concierge .
docker tag apex-concierge:latest YOUR_ECR_URL/apex-concierge:latest
docker push YOUR_ECR_URL/apex-concierge:latest
```

3. Create ECS cluster
4. Define task definition with environment variables
5. Create service with Application Load Balancer
6. Configure auto-scaling

---

## 6. Deploy to Your Own Server

### Prerequisites

- Ubuntu 22.04 or Debian 11
- Root or sudo access
- Domain pointed to server IP

### Step 1: Install Node.js

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 2: Clone Repository

```bash
# Install Git if not present
sudo apt install git -y

# Clone your repository
cd /var/www
sudo mkdir apex-concierge
sudo chown $USER:$USER apex-concierge
git clone https://github.com/yourusername/apex-concierge.git apex-concierge
cd apex-concierge
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Environment Variables

```bash
# Create production .env.local
nano .env.local
# Paste your production environment variables
# Save: Ctrl+O, Enter, Ctrl+X
```

### Step 5: Build Application

```bash
npm run build
```

### Step 6: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application
pm2 start npm --name "apex-concierge" -- start

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command it outputs
```

### Step 7: Install Nginx (Reverse Proxy)

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/apex-concierge

# Paste this configuration:
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/apex-concierge /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 8: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts (enter email, agree to TOS, redirect HTTP to HTTPS: Yes)

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 9: Setup Firewall

```bash
# Configure UFW
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

### Step 10: Monitoring

```bash
# View application logs
pm2 logs apex-concierge

# Monitor process
pm2 monit

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 7. Deploy with Docker

### Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Use official Node.js image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Create .dockerignore

Create `.dockerignore`:

```
node_modules
.next
.git
.env.local
npm-debug.log
README.md
.vscode
```

### Build and Run Locally

```bash
# Build image
docker build -t apex-concierge .

# Run container
docker run -p 3000:3000 --env-file .env.local apex-concierge

# Access at http://localhost:3000
```

### Docker Compose (with Redis)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    restart: unless-stopped

volumes:
  redis-data:
```

Run with:

```bash
docker-compose up -d
```

### Push to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag apex-concierge yourusername/apex-concierge:latest

# Push to Docker Hub
docker push yourusername/apex-concierge:latest
```

---

## 8. CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Add Secrets to GitHub

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `VERCEL_TOKEN` (from Vercel account settings)
   - `VERCEL_ORG_ID` (from Vercel project settings)
   - `VERCEL_PROJECT_ID` (from Vercel project settings)

### GitLab CI/CD

Create `.gitlab-ci.yml`:

```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next/
      - node_modules/
  only:
    - main

test:
  stage: test
  image: node:18
  script:
    - npm test
  only:
    - main

deploy:
  stage: deploy
  image: node:18
  script:
    - npm install -g vercel
    - vercel --token $VERCEL_TOKEN --prod
  only:
    - main
  environment:
    name: production
    url: https://apexconcierge.com
```

---

## 9. Post-Deployment Checklist

### Security

- [ ] Rotate all API keys and secrets
- [ ] Enable Supabase RLS on all tables (already enabled)
- [ ] Configure CORS properly in Next.js middleware
- [ ] Setup rate limiting (Vercel has built-in)
- [ ] Enable HTTPS/SSL (automatic on Vercel)
- [ ] Configure Content Security Policy (CSP) headers
- [ ] Setup monitoring (Sentry, LogRocket)
- [ ] Perform security audit / penetration test
- [ ] Test backup/restore procedures
- [ ] Document incident response plan

### Performance

- [ ] Enable Vercel Analytics
- [ ] Setup custom domain
- [ ] Configure CDN (automatic on Vercel)
- [ ] Optimize images (use Next.js Image component)
- [ ] Enable gzip/brotli compression (automatic on Vercel)
- [ ] Setup database connection pooling (Supabase has built-in)
- [ ] Monitor application performance (Vercel Speed Insights)

### Monitoring

- [ ] Setup error tracking (Sentry)
- [ ] Configure uptime monitoring (UptimeRobot, Pingdom)
- [ ] Setup log aggregation
- [ ] Create alerts for critical errors
- [ ] Monitor database performance (Supabase dashboard)
- [ ] Setup APM (Application Performance Monitoring)

### Business

- [ ] Test user registration flow
- [ ] Test ride booking flow (when implemented)
- [ ] Test payment processing (Stripe test mode first)
- [ ] Verify email notifications work
- [ ] Test all membership tiers
- [ ] Create test accounts for each role
- [ ] Document admin procedures

---

## 10. Troubleshooting

### Build Errors

**Error**: `Module not found: Can't resolve '@/lib/auth/context'`

**Solution**: Ensure `lib/auth/context.tsx` exists and tsconfig paths are correct:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Error**: `Supabase client error`

**Solution**: Check environment variables are set correctly in `.env.local` and deployed environment.

### Runtime Errors

**Error**: `Failed to fetch user details`

**Solution**:
1. Check Supabase project is active
2. Verify API keys are correct
3. Check RLS policies allow the query
4. Check network connectivity

**Error**: `CORS error when calling API`

**Solution**: Configure CORS in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        ],
      },
    ];
  },
};
```

### Database Issues

**Error**: `relation "users" does not exist`

**Solution**: Run database migrations in Supabase SQL Editor.

**Error**: `RLS policy prevents access`

**Solution**: Review RLS policies in Supabase dashboard, ensure user has appropriate role.

### Performance Issues

**Slow page loads**:
1. Enable Vercel Analytics to identify bottlenecks
2. Check database query performance
3. Optimize images (use Next.js Image component)
4. Enable caching where appropriate

**High database load**:
1. Review slow queries in Supabase dashboard
2. Add database indexes (already added in schema)
3. Implement caching layer (Redis)
4. Consider read replicas for scaling

### Deployment Issues

**Vercel deployment fails**:
1. Check build logs for errors
2. Verify all environment variables are set
3. Test build locally: `npm run build`
4. Check for missing dependencies in package.json

**Server deployment fails**:
1. Check Node.js version (must be 18+)
2. Verify .env.local has all required variables
3. Check PM2 logs: `pm2 logs`
4. Verify Nginx configuration: `sudo nginx -t`

---

## Support

For technical issues:
- Check the [README.md](README.md) for project overview
- Review [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Check GitHub Issues for known problems
- Contact: dev@apexconcierge.com

---

**Your application is now ready to deploy anywhere!**

This codebase is 100% portable - you own all the source code and can deploy it to any platform: Vercel, AWS, Google Cloud, Azure, your own servers, or even a Raspberry Pi. No vendor lock-in. No platform dependencies.

Just choose your preferred deployment method from this guide and you're ready to go.
