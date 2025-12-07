# RxJS Coding Question: Buffer Click Events

## Problem

Write a function `bufferClickEvents(click$: Observable<Event>): Observable<Event[]>` that takes an Observable of click events and returns an Observable that emits an array of click events every 1 second. Each emitted array should contain all click events that occurred during that 1 second window. If no clicks occurred during a window, emit an empty array.

### Example

If 3 clicks happen within the first second, and 2 clicks in the next second, the output should be:

```
[[click1, click2, click3], [click4, click5], ...]
```

Use RxJS operators only.

---

- Implement your solution in `buffer-click-events.ts`.
- Write tests in `buffer-click-events.test.ts`.
