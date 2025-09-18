Рекомендований флоу (щоб було безпечно)

Не коміть прямо в swagger_docs. Працюй у фіче-гілці й роби PR у swagger_docs.

Онови інтеграційну гілку:

git fetch origin
git checkout swagger_docs
git pull --ff-only


Від неї створи фічу:

git checkout -b feat/your-change


Зміни → коміти:

git add -A
git commit -m "feat: your change"


Перед пушем підтяни свіжу swagger_docs і перебейзься:

git fetch origin
git rebase origin/swagger_docs
# (якщо є конфлікти — вирішуєш, git add ..., git rebase --continue)


Запуш і створи PR в swagger_docs:

git push -u origin feat/your-change


PR: base = swagger_docs, compare = feat/your-change.
