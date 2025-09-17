## Коміти, гілки та PR-процес

**Перед будь-якою роботою — онови `main`:**
```bash
git checkout main
git pull origin main

## Працюй у фіче-гілках (не в main):

git checkout -b feat/auth-register   # або fix/login-null, docs/api, chore/ci

## Створи PR у main:

git add -A
git commit -m "feat(auth): implement register endpoint"
git push -u origin feat/auth-register
# далі — Pull Request → target: main

## Якщо main оновився під час роботи — підтяни зміни:

git fetch origin
git rebase origin/main          # або: git pull --rebase origin main
# виріши конфлікти → продовж rebase
git push --force-with-lease     # акуратно онови PR
