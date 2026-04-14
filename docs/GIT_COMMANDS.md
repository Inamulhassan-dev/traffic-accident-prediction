# 🚀 Git Commands Guide

## Quick Reference for Pushing Updates to GitHub

### 📋 First Time Setup (Already Done ✓)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Inamulhassan-dev/traffic-accident-prediction.git
git push -u origin main
```

---

## 🔄 Pushing Updates (Use These Commands)

### 1️⃣ Check Status
```bash
git status
```
Shows which files have been modified.

### 2️⃣ Add Changes
```bash
# Add all changes
git add .

# Or add specific files
git add filename.txt
```

### 3️⃣ Commit Changes
```bash
git commit -m "Your descriptive message here"
```

**Good commit messages:**
- ✅ "Add new feature: Driver risk profiling"
- ✅ "Fix: Backend API endpoint error"
- ✅ "Update: Improve UI responsiveness"
- ✅ "Docs: Update README with new features"

### 4️⃣ Push to GitHub
```bash
git push origin main
```

---

## 📦 Complete Update Workflow

```bash
# 1. Check what changed
git status

# 2. Add all changes
git add .

# 3. Commit with message
git commit -m "Update: Your changes description"

# 4. Push to GitHub
git push origin main
```

---

## 🌿 Working with Branches

### Create New Branch
```bash
git checkout -b feature/new-feature
```

### Switch Branch
```bash
git checkout main
git checkout feature/new-feature
```

### Merge Branch
```bash
git checkout main
git merge feature/new-feature
```

### Delete Branch
```bash
git branch -d feature/new-feature
```

---

## 🔍 Useful Commands

### View Commit History
```bash
git log
git log --oneline
git log --graph --oneline --all
```

### View Changes
```bash
# See what changed
git diff

# See changes in staged files
git diff --staged
```

### Undo Changes
```bash
# Undo changes in working directory
git checkout -- filename.txt

# Unstage file
git reset HEAD filename.txt

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Pull Latest Changes
```bash
git pull origin main
```

---

## 🆘 Common Issues & Solutions

### Issue: "Your branch is behind"
```bash
git pull origin main
git push origin main
```

### Issue: Merge Conflicts
```bash
# 1. Pull latest changes
git pull origin main

# 2. Fix conflicts in files
# (Edit files manually)

# 3. Add resolved files
git add .

# 4. Commit merge
git commit -m "Resolve merge conflicts"

# 5. Push
git push origin main
```

### Issue: "Remote origin already exists"
```bash
git remote set-url origin https://github.com/Inamulhassan-dev/traffic-accident-prediction.git
```

### Issue: Need to force push (use carefully!)
```bash
git push -u origin main --force
```

---

## 📝 .gitignore

Already configured to ignore:
- `node_modules/`
- `venv/`
- `__pycache__/`
- `.env` files
- Log files
- Build folders

---

## 🔗 Repository Information

**Repository URL:**
```
https://github.com/Inamulhassan-dev/traffic-accident-prediction.git
```

**Clone Command:**
```bash
git clone https://github.com/Inamulhassan-dev/traffic-accident-prediction.git
```

---

## 💡 Best Practices

1. ✅ **Commit Often** - Make small, frequent commits
2. ✅ **Write Clear Messages** - Describe what and why
3. ✅ **Pull Before Push** - Always pull latest changes first
4. ✅ **Test Before Commit** - Ensure code works
5. ✅ **Use Branches** - For new features or experiments
6. ✅ **Review Changes** - Use `git diff` before committing

---

## 🎯 Quick Commands Cheat Sheet

| Command | Description |
|---------|-------------|
| `git status` | Check status |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Commit changes |
| `git push origin main` | Push to GitHub |
| `git pull origin main` | Pull from GitHub |
| `git log --oneline` | View commit history |
| `git diff` | View changes |
| `git branch` | List branches |
| `git checkout -b name` | Create new branch |

---

## 📞 Need Help?

- 📖 [Git Documentation](https://git-scm.com/doc)
- 🎓 [GitHub Guides](https://guides.github.com/)
- 💬 [Stack Overflow](https://stackoverflow.com/questions/tagged/git)

---

**Made with ❤️ for version control**
