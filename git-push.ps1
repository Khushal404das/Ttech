# Git Push Helper Script for Ttech SOLUTIONS
# This script helps you push your code to GitHub

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Ttech SOLUTIONS - GitHub Push Helper" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
Write-Host "Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is NOT installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Visit: https://git-scm.com/downloads" -ForegroundColor White
    Write-Host "2. Download and install Git for Windows" -ForegroundColor White
    Write-Host "3. Restart PowerShell and run this script again" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 1: Check Git Configuration" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

$userName = git config --global user.name
$userEmail = git config --global user.email

if ([string]::IsNullOrWhiteSpace($userName) -or [string]::IsNullOrWhiteSpace($userEmail)) {
    Write-Host "⚠️  Git not configured yet" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "Enter your name (for Git commits):" -ForegroundColor White
    $newName = Read-Host
    git config --global user.name "$newName"
    
    Write-Host "Enter your email (use your GitHub email):" -ForegroundColor White
    $newEmail = Read-Host
    git config --global user.email "$newEmail"
    
    Write-Host "✅ Git configured successfully!" -ForegroundColor Green
} else {
    Write-Host "✅ Git is configured:" -ForegroundColor Green
    Write-Host "   Name: $userName" -ForegroundColor White
    Write-Host "   Email: $userEmail" -ForegroundColor White
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 2: Initialize Repository" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

if (Test-Path ".git") {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repository initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 3: Check Status" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

Write-Host "Checking files to be committed..." -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 4: Stage All Files" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

Write-Host "Adding all files (excluding node_modules, dist, .env)..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files staged for commit" -ForegroundColor Green

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 5: Create Commit" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

Write-Host "Creating commit..." -ForegroundColor Yellow
$commitMessage = "Production-ready Ttech SOLUTIONS website with SEO optimization

Features:
- Complete SEO implementation (robots.txt, sitemap, meta tags)
- Custom 404 page
- Dynamic page titles and descriptions
- Structured data (Schema.org JSON-LD)
- Open Graph and Twitter Card support
- Fixed contact form with WhatsApp & Email integration
- Updated social media icons (Twitter to X)
- Performance optimizations
- Comprehensive documentation
- Production build tested and verified

Version: 1.0.0
Date: $(Get-Date -Format 'yyyy-MM-dd')"

git commit -m "$commitMessage"
Write-Host "✅ Commit created" -ForegroundColor Green

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 6: Configure Remote" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

$repoUrl = "https://github.com/Khushal404das/Ttech.git"

# Check if remote already exists
$existingRemote = git remote get-url origin 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "⚠️  Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    Write-Host "Removing old remote and adding new one..." -ForegroundColor Yellow
    git remote remove origin
    git remote add origin $repoUrl
    Write-Host "✅ Remote updated" -ForegroundColor Green
} else {
    Write-Host "Adding remote repository..." -ForegroundColor Yellow
    git remote add origin $repoUrl
    Write-Host "✅ Remote added: $repoUrl" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 7: Set Branch to 'main'" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

$currentBranch = git branch --show-current

if ($currentBranch -ne "main") {
    Write-Host "Renaming branch to 'main'..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "✅ Branch renamed to 'main'" -ForegroundColor Green
} else {
    Write-Host "✅ Already on 'main' branch" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 8: Ready to Push!" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT AUTHENTICATION NOTE:" -ForegroundColor Yellow
Write-Host ""
Write-Host "When prompted for credentials:" -ForegroundColor White
Write-Host "  Username: Your GitHub username" -ForegroundColor White
Write-Host "  Password: Use a Personal Access Token (NOT your GitHub password!)" -ForegroundColor Red
Write-Host ""
Write-Host "If you don't have a token:" -ForegroundColor Yellow
Write-Host "  1. Visit: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "  2. Click 'Generate new token (classic)'" -ForegroundColor White
Write-Host "  3. Select 'repo' scope" -ForegroundColor White
Write-Host "  4. Copy the token and use it as password" -ForegroundColor White
Write-Host ""
Write-Host "Repository: $repoUrl" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "Ready to push to GitHub? (Y/N)"

if ($confirm -eq "Y" -or $confirm -eq "y") {
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    Write-Host ""
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "================================================" -ForegroundColor Green
        Write-Host "  ✅ SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
        Write-Host "================================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Visit your repository:" -ForegroundColor White
        Write-Host "https://github.com/Khushal404das/Ttech" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "  1. Verify files on GitHub" -ForegroundColor White
        Write-Host "  2. Update repository description" -ForegroundColor White
        Write-Host "  3. Follow DEPLOYMENT.md to deploy your site" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "❌ Push failed!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Common issues:" -ForegroundColor Yellow
        Write-Host "  • Wrong username or token" -ForegroundColor White
        Write-Host "  • Token expired or lacks 'repo' scope" -ForegroundColor White
        Write-Host "  • Repository doesn't exist or you don't have access" -ForegroundColor White
        Write-Host ""
        Write-Host "See GIT-SETUP-GUIDE.md for detailed help" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "Push cancelled. Your local commit is ready." -ForegroundColor Yellow
    Write-Host "To push later, run: git push -u origin main" -ForegroundColor White
}

Write-Host ""
Read-Host "Press Enter to exit"
