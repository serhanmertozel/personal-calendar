# Personal Calendar — Roadmap

A Google Calendar-style weekly planner with small, colorful, checkable task boxes.

## Design decisions

These shape everything below. If any feels wrong, say so before we start building.

1. **Tasks are day-level, not time-slot events.** A task belongs to a *date*, not to "14:00–15:00".
   "dm 3 videos" is a goal for the day, and dragging a task across many days only makes sense for
   day-level items. This means **no hour grid at first** — each day is a column that stacks its task
   boxes. We can add an hour grid later if you want timed events too.
2. **Task box width fits its text.** Achieved with CSS `width: fit-content`, not a percentage width.
3. **State lives in a service, using Angular signals.** Components stay dumb; one `TaskService` owns
   the task list. This is the modern Angular way and it makes the later backend swap easy.
4. **Persistence is `localStorage` first.** A Spring backend comes much later; when it does, only the
   service changes, not the components.

## Data model

The one type everything else is built on:

```ts
export interface Task {
  id: string;        // unique, e.g. crypto.randomUUID()
  title: string;     // "dm 3 videos"
  date: string;      // "2026-08-23" — ISO date, no time
  done: boolean;
  color: string;     // hex or a palette key
}
```

## Milestones

Each milestone is one branch, one pull request, and one new Angular concept.

| #   | Milestone            | Branch                    | What you learn                                          |
| --- | -------------------- | ------------------------- | ------------------------------------------------------- |
| M0  | Git & GitHub set up  | `main`                    | init, staging, commit, remote, push                     |
| M1  | Task model           | `feature/task-model`      | TypeScript interfaces, project file layout              |
| M2  | Week grid skeleton   | `feature/week-grid`       | `ng generate`, templates, `@for`, CSS Grid              |
| M3  | Week navigation      | `feature/week-nav`        | `signal()`, `computed()`, `(click)` binding, date math  |
| M4  | Task service         | `feature/task-service`    | `@Injectable`, `inject()`, DI, immutable state updates  |
| M5  | Task boxes render    | `feature/task-boxes`      | child components, `input()` signals, `fit-content`      |
| M6  | Click a day to add   | `feature/add-task`        | `@if`, two-way binding, keyboard events                 |
| M7  | Mark done (checkbox) | `feature/toggle-done`     | `output()`, child→parent events, `[class.x]` binding    |
| M8  | Colors               | `feature/task-colors`     | `[style.backgroundColor]`, palette constants            |
| M9  | Drag across days     | `feature/drag-add`        | mouse events, drag state machine, directives            |
| M10 | Drag to delete       | `feature/drag-delete`     | refactoring shared logic                                |
| M11 | Persistence          | `feature/persistence`     | `effect()`, JSON serialization, app init                |
| M12 | Month view           | `feature/month-view`      | routing between views — enables whole-month dragging    |
| M13 | Tests & polish       | `feature/tests`           | Vitest, `TestBed`, testing signals                      |
| —   | Spring backend       | later                     | *not now — explicitly deferred*                         |

### Note on "add a task to the whole month"

The week view only shows 7 days, so dragging there covers at most a week. That is why **M12 (month
view)** exists: dragging across a month grid is where the "3 videos every day this month" gesture
really lives. M9 builds the drag mechanic on 7 days first because it is simpler to get right, then
M12 reuses it on a bigger grid.

## Progress

- [x] M0 · Git & GitHub
- [x] M1 · Task model
- [x] M2 · Week grid
- [ ] M3 · Week navigation
- [ ] M4 · Task service
- [ ] M5 · Task boxes
- [ ] M6 · Add task
- [ ] M7 · Mark done
- [ ] M8 · Colors
- [ ] M9 · Drag to add
- [ ] M10 · Drag to delete
- [ ] M11 · Persistence
- [ ] M12 · Month view
- [ ] M13 · Tests & polish
