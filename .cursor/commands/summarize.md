# /summarize

Distill the current chat into a compact, paste-ready handoff so it can be continued in a fresh chat without losing meaning or context.

## Steps

1. **Summarize the dialogue** briefly.
2. **Write a one-line chat label** (see «Метка чата» below) — for the user to rename or recognize the chat in Cursor when the auto title is wrong.
3. **Extract structured blocks** (in Russian, since the user reads them):
   - Обсуждаемые вопросы (topics under discussion)
   - Цель (the goal)
   - Принятые решения (decisions made)
   - Важные ограничения (important constraints)
   - TODO (open tasks, in order)
   - Неясные моменты (unresolved / unclear points)
4. **Show the draft to the user for approval.** Let them correct or add before finalizing.
5. **Output the final handoff text** — a self-contained block the user can paste into a new chat with zero loss of meaning. Reference the relevant `docs/` files by path instead of repeating their content (the docs are the source of truth).

## Output format

Always put the chat label **first**, on its own, outside the main block — easy to copy into the chat title field.

```
**Метка чата:** <одна короткая фраза>
```

Then the handoff block:

```
# Контекст для нового чата

## Цель
<one or two sentences>

## Принятые решения
- ...

## Важные ограничения
- ...

## TODO (по порядку)
1. ...

## Неясные моменты
- ...

## Где искать детали
- <docs/... files relevant to this work>
```

## Метка чата (one-line label)

Purpose: help the user recognize this conversation later («А, понял, было такое») — **not** a filename, not a summary of decisions.

Rules:

- **One phrase only** (roughly 3–12 words). No bullet lists, no punctuation at the end unless needed for clarity.
- **Topic, not outcome** — what the chat was *about* (e.g. «Форма обратной связи на главной»), not every fix made.
- **Plain Russian**, no jargon unless it was the subject of the chat.
- **Skip details** — no file paths, no percentages, no commit hashes, no «сделали X и Y».
- If the chat wandered, pick the **main** thread the user cared about.

Good examples:

- Форма обратной связи на главной
- Миграция шапки с Tilda
- Документация по калькулятору

Bad examples:

- Обновили home.css v8 и badge +20% у телефона на mobile flex legal
- summarize.md и Makefile serve build

## Rules

- Keep the handoff compact. The point is to shrink context, not reproduce it.
- Do not invent decisions that were not actually made. If something is unclear, put it under "Неясные моменты".
- Prefer pointing to `docs/` and `.cursor/rules/` files over copying their text.
- Russian output for «Метка чата» and the handoff block (matches the user's preference).
