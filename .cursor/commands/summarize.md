# /summarize

Distill the current chat into a compact, paste-ready handoff so it can be continued in a fresh chat without losing meaning or context.

## Steps

1. **Summarize the dialogue** briefly.
2. **Extract structured blocks** (in Russian, since the user reads them):
   - Обсуждаемые вопросы (topics under discussion)
   - Цель (the goal)
   - Принятые решения (decisions made)
   - Важные ограничения (important constraints)
   - TODO (open tasks, in order)
   - Неясные моменты (unresolved / unclear points)
3. **Show the draft to the user for approval.** Let them correct or add before finalizing.
4. **Output the final handoff text** — a self-contained block the user can paste into a new chat with zero loss of meaning. Reference the relevant `docs/` files by path instead of repeating their content (the docs are the source of truth).

## Output format

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

## Rules

- Keep it compact. The point is to shrink context, not reproduce it.
- Do not invent decisions that were not actually made. If something is unclear, put it under "Неясные моменты".
- Prefer pointing to `docs/` and `.cursor/rules/` files over copying their text.
- Russian output (matches the user's preference).
