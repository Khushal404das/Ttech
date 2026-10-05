# 🚀 Quick Guide: Push to GitHub

## Your Repository
**https://github.com/Khushal404das/Ttech**

---

## ⚡ Quick Method (Automated Script)

### Option 1: Run the PowerShell Script

1. **Open PowerShell** in this project folder
2. **Run the helper script:**
   ```powershell
   .\git-push.ps1
   ```
3. **Follow the prompts** - the script will:
   - Check if Git is installed
   - Configure Git if needed
   - Initialize repository
   - Stage all files
   - Create commit
   - Connect to GitHub
   - Push your code

**If script blocked:** Run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🖥️ Manual Method (If Script Doesn't Work)

### Step 1: Install Git (if needed)
Download from: https://git-scm.com/downloads

### Step 2: Open PowerShell in project folder
```powershell
cd "c:\Users\Roshan\Downloads\Ttech-main (1)\Ttech-main"
```

### Step 3: Run these commands one by one:

```powershell
# Initialize Git (if not done)
git init

# Configure Git (first time only - use your details)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Stage all files
git add .

# Create commit
git commit -m "Initial commit: Production-ready Ttech SOLUTIONS website"

# Connect to GitHub
git remote add origin https://github.com/Khushal404das/Ttech.git

# Set branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**When prompted for password:** Use a **Personal Access Token** (see below)

---

## 🔑 GitHub Personal Access Token

GitHub doesn't accept regular passwords anymore. You need a token:

### Get Your Token:
1. Go to: **https://github.com/settings/tokens**
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: "Ttech Project Push"
4. Set expiration: 90 days or more
5. **Check:** `repo` (all sub-options)
6. Click: **"Generate token"**
7. **COPY THE TOKEN** (you can't see it again!)
8. **Use this token as your password** when Git asks

### Save Your Token:
- Save it in a password manager
- Or write it down securely
- You'll need it every time you push

---

## 📱 Easiest Method: GitHub Desktop

Don't want to use command line? Use the GUI:

1. **Download:** https://desktop.github.com/
2. **Install & Sign in** with your GitHub account
3. **Add this repository:**
   - File → Add Local Repository
   - Browse to project folder
4. **Publish:**
   - Click "Publish repository"
   - It will connect to: `Khushal404das/Ttech`
   - Click "Publish"

**Done!** Much easier with GitHub Desktop.

---

## ✅ Verify Upload

After pushing, check:
**https://github.com/Khushal404das/Ttech**

You should see:
- All source files
- README.md
- Documentation files
- public/ folder assets
- src/ folder with components

**NOT uploaded (and that's correct):**
- node_modules/ (too large)
- dist/ (build output)
- .env files (secrets)

---

## 🔄 Updating Later

When you make changes:

```powershell
git add .
git commit -m "Description of changes"
git push
```

---

## ❌ Troubleshooting

### "Git not recognized"
→ Install Git from https://git-scm.com/downloads

### "Authentication failed"
→ Use Personal Access Token (not password)

### "Repository not found"
→ Check repo exists: https://github.com/Khushal404das/Ttech

### "Remote already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/Khushal404das/Ttech.git
```

### "Permission denied"
→ Make sure you're logged into the correct GitHub account

---

## 📚 Full Documentation

For detailed instructions, see:
- **GIT-SETUP-GUIDE.md** - Complete step-by-step guide
- **DEPLOYMENT.md** - How to deploy after upload

---

## 🆘 Need Help?

1. **Check:** GIT-SETUP-GUIDE.md (in this folder)
2. **GitHub Help:** https://docs.github.com/en/get-started
3. **Git Tutorial:** https://git-scm.com/doc

---

**Ready? Choose your preferred method above and push your code!** 🚀

**Recommended:** Try the **automated script** first (Option 1), or use **GitHub Desktop** if you prefer a GUI.
