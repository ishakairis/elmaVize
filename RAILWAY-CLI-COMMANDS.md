# Railway CLI Commands (Windows PowerShell Fix)

## Issue
PowerShell blocks Railway CLI scripts by default.

## Solution
Use `npx` instead of `railway` for all commands.

---

## Commands to Run:

### 1. Login (should already be done)
```bash
npx @railway/cli login
```

### 2. Link Your Project
```bash
npx @railway/cli link
```
Select your `elmaVize` project from the list.

### 3. Push Database Schema
```bash
npx @railway/cli run npm run db:push
```

### 4. Seed Database with Sample Data
```bash
npx @railway/cli run npm run db:seed
```

### 5. Open Your Project in Browser
```bash
npx @railway/cli open
```

---

## Quick Reference

Replace `railway` with `npx @railway/cli` in all commands:

| Original Command | Windows PowerShell Command |
|-----------------|----------------------------|
| `railway login` | `npx @railway/cli login` |
| `railway link` | `npx @railway/cli link` |
| `railway run <cmd>` | `npx @railway/cli run <cmd>` |
| `railway open` | `npx @railway/cli open` |
| `railway logs` | `npx @railway/cli logs` |
| `railway status` | `npx @railway/cli status` |

---

## After Database Setup

Get your live URL:
1. Go to Railway Dashboard: https://railway.app
2. Click on your project
3. Click on your web service
4. Go to "Settings" → "Domains"
5. Your site URL: `https://your-app.up.railway.app`





