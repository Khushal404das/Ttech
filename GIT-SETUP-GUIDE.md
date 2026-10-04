# GitHub Setup & Push Guide - Ttech SOLUTIONS

## Your GitHub Repository
**URL:** https://github.com/Khushal404das/Ttech

---

## Prerequisites

You need Git installed on your computer.

### Install Git (if not installed)

**Download:** https://git-scm.com/downloads

1. Download Git for Windows
2. Run the installer
3. Use default settings
4. After installation, restart your terminal/PowerShell

**Verify Installation:**
```powershell
git --version
```

---

## Step-by-Step: Push Code to GitHub

### Step 1: Initialize Git (if needed)

Open PowerShell in your project folder and run:

```powershell
cd "c:\Users\Roshan\Downloads\Ttech-main (1)\Ttech-main"
git init
```

### Step 2: Configure Git (First Time Only)

```powershell
# Set your name
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"
```

### Step 3: Check What Will Be Committed

```powershell
git status
```

This shows all files that will be added. Review the list.

### Step 4: Add All Files

```powershell
git add .
```

**Note:** `.gitignore` ensures these won't be added:
- node_modules/
- dist/
- .env files (except .env.example)
- Log files

### Step 5: Create First Commit

```powershell
git commit -m "Initial commit: Production-ready Ttech SOLUTIONS website with SEO optimization"
```

### Step 6: Connect to GitHub Repository

```powershell
git remote add origin https://github.com/Khushal404das/Ttech.git
```

### Step 7: Check Current Branch

```powershell
git branch
```

If it shows `master`, rename to `main`:

```powershell
git branch -M main
```

### Step 8: Push to GitHub

**First time push:**
```powershell
git push -u origin main
```

**You'll be prompted to authenticate:**
- Use your GitHub username
- For password: Use a **Personal Access Token** (not your GitHub password)

---

## Creating GitHub Personal Access Token

Since GitHub no longer accepts passwords for Git operations, you need a token:

1. **Go to:** https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Note:** "Git push access for Ttech project"
4. **Expiration:** Choose duration (90 days or longer)
5. **Scopes:** Check these boxes:
   - ✅ `repo` (all sub-options)
   - ✅ `workflow`
6. Click **"Generate token"**
7. **IMPORTANT:** Copy the token immediately (you can't see it again!)
8. Save it securely (password manager recommended)

**Use this token as your password when Git asks for authentication.**

---

## Alternative: GitHub Desktop (Easier)

If you prefer a GUI:

1. **Download GitHub Desktop:** https://desktop.github.com/
2. **Install and sign in** with your GitHub account
3. **Add repository:**
   - File → Add Local Repository
   - Browse to: `c:\Users\Roshan\Downloads\Ttech-main (1)\Ttech-main`
4. **Publish repository:**
   - Click "Publish repository"
   - Select: `Khushal404das/Ttech`
   - Uncheck "Keep this code private" (or keep checked if private)
   - Click "Publish repository"

**Done!** Much easier with GitHub Desktop.

---

## Verify Upload

After pushing, visit:
**https://github.com/Khushal404das/Ttech**

You should see all your files!

---

## Making Updates Later

When you make changes to your code:

```powershell
# Check what changed
git status

# Add changed files
git add .

# Commit changes
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

---

## Important Notes

### What Gets Pushed ✅
- All source code (`src/` folder)
- Public assets (`public/` folder)
- Configuration files
- Documentation (README.md, etc.)
- Package files (package.json)

### What Gets Ignored ❌
- `node_modules/` (too large, not needed)
- `dist/` (build output, regenerated each time)
- `.env` files (contain secrets)
- Log files

### Before Pushing

**IMPORTANT:** Check that no sensitive data is in your code:
- API keys
- Passwords
- Firebase private keys
- Personal information

**If found:** Remove them before committing!

---

## Troubleshooting

### Error: "Remote already exists"

```powershell
# Remove old remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/Khushal404das/Ttech.git
```

### Error: "Authentication failed"

- Make sure you're using a **Personal Access Token** (not password)
- Token must have `repo` scope
- Check token hasn't expired

### Error: "Permission denied"

- Verify you own the repository `Khushal404das/Ttech`
- Check you're logged in to the correct GitHub account

### Error: "Repository not found"

- Verify repository exists: https://github.com/Khushal404das/Ttech
- Check repository name spelling
- Ensure repository is not deleted

---

## Quick Command Reference

```powershell
# Initialize Git
git init

# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Your message here"

# Add remote
git remote add origin https://github.com/Khushal404das/Ttech.git

# Rename branch to main
git branch -M main

# Push
git push -u origin main

# Future pushes
git push
```

---

## Repository Structure After Push

```
Khushal404das/Ttech/
├── .gitignore
├── README.md
├── DEPLOYMENT.md
├── PRODUCTION-CHECKLIST.md
├── GIT-SETUP-GUIDE.md
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.svg
│   └── og-image.svg
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── utils/
│   └── ...
└── ... (other config files)
```

**Note:** `node_modules/` and `dist/` won't be pushed (they're in .gitignore)

---

## After Successful Push

1. ✅ Visit your repository on GitHub
2. ✅ Verify all files are there
3. ✅ Update repository description on GitHub
4. ✅ Add topics/tags to help discoverability
5. ✅ Consider making it public (if you want to showcase)

---

## Next Steps After Upload

### Enable GitHub Pages (Optional)

To host your site directly on GitHub:

1. Go to repository **Settings**
2. Click **Pages** in sidebar
3. Under **Source**, select: `main` branch
4. Select folder: `/ (root)` or `/docs`
5. Click **Save**

**Note:** You'll need to adjust build output or use GitHub Actions for auto-deploy.

### Set Up GitHub Actions (Optional)

For automatic deployment on every push:

Create `.github/workflows/deploy.yml` (see DEPLOYMENT.md for example)

---

## Need Help?

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/
- **GitHub Desktop:** https://docs.github.com/en/desktop

---

**Ready to push your code? Follow the steps above!** 🚀
