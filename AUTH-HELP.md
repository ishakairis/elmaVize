# GitHub Authentication Help

## You Got a Connection Error - Here's the Fix

### Method 1: Personal Access Token (Easiest)

**Step 1: Create Token**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: `elmaVize-deployment`
4. Expiration: Your choice (90 days recommended)
5. Check: ✅ **repo** (all repo permissions)
6. Click "Generate token"
7. COPY THE TOKEN (starts with ghp_...)

**Step 2: Configure Git with Token**

Replace YOUR_TOKEN with your actual token:

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/ishakairis/elmaVize.git
```

**Step 3: Push**

```bash
git push -u origin main
```

---

### Method 2: Use SSH Instead (Alternative)

If you prefer SSH keys:

**Step 1: Check for existing SSH key**
```bash
ls ~/.ssh
```

**Step 2: Generate new SSH key (if needed)**
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

**Step 3: Copy SSH public key**
```bash
cat ~/.ssh/id_ed25519.pub
```

**Step 4: Add to GitHub**
1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Paste your public key
4. Save

**Step 5: Change remote to SSH**
```bash
git remote set-url origin git@github.com:ishakairis/elmaVize.git
git push -u origin main
```

---

### Method 3: Credential Helper Manual Setup

```bash
git config --global credential.helper manager-core
git push -u origin main
```

Then enter:
- Username: ishakairis
- Password: YOUR_PERSONAL_ACCESS_TOKEN (not your GitHub password)

---

## Quick Reference

**Current remote:** https://github.com/ishakairis/elmaVize.git

**Your username:** ishakairis

**What went wrong:** Git Credential Manager's OAuth callback server failed to start

**Recommended fix:** Use Method 1 (Personal Access Token in URL)

