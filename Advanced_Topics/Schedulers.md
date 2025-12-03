# Schedulers

- **Definition:**

  - Schedulers in RxJS control when and how tasks are executed (concurrency and execution context). They let you decide if work happens synchronously, asynchronously, or on a specific schedule.

- **Common Schedulers:**
  - `asyncScheduler`: Schedules tasks asynchronously (e.g., using setTimeout). Useful for non-blocking UI updates and deferring work to the next event loop tick.
  - `queueScheduler`: Schedules tasks synchronously in a queue. Ensures tasks run in order, one after another, before yielding back to the event loop.

**Execution Sequence Explanation:**

- With `queueScheduler`, all emissions are processed immediately and in order before any other asynchronous code runs.
- With `asyncScheduler`, emissions are scheduled to run asynchronously, so the code continues executing and the emissions are processed later (after the current call stack is cleared).

**Sample Code:**

```typescript
import { of, asyncScheduler, queueScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

console.log('Start');

of('A', 'B', 'C')
  .pipe(observeOn(asyncScheduler))
  .subscribe((value) => {
    console.log('Async:', value);
  });

of('X', 'Y', 'Z')
  .pipe(observeOn(queueScheduler))
  .subscribe((value) => {
    console.log('Queue:', value);
  });

console.log('End');
```

**Expected Output:**

```
Start
Queue: X
Queue: Y
Queue: Z
End
Async: A
Async: B
Async: C
```

- The queue emissions happen immediately after 'Start', before 'End'.
- The async emissions happen after 'End', because they're scheduled asynchronously.

**Why Use Schedulers?**

- Optimize performance and responsiveness
- Control timing and order of execution
- Avoid blocking the UI thread
- Useful for testing, animation, and integrating with other async APIs
