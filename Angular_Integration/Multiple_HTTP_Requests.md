# Multiple HTTP Requests

- **forkJoin:** Run requests in parallel, emit when all complete (like Promise.all).
  - *Use case:* Fetch user profile and orders together, only when both are done.
  - *Behavior:* Only emits once, when all inner observables complete. If any observable never completes, forkJoin will never emit.
```typescript
import { forkJoin } from 'rxjs';

forkJoin([
  http.get('/api/user'),
  http.get('/api/orders')
]).subscribe(([user, orders]) => {
  // Both requests done, show dashboard
});
```

- **combineLatest:** Combine latest values from multiple observables, emit whenever any changes (after all have emitted at least once).
  - *Use case:* React to changes in user and settings, update UI whenever either changes.
  - *Behavior:* Emits every time any inner observable emits, after all have emitted at least once. Useful for live data streams.
```typescript
import { combineLatest } from 'rxjs';

combineLatest([
  http.get('/api/user'),
  settings$.pipe(startWith({ theme: 'light' }))
]).subscribe(([user, settings]) => {
  // Update UI with latest user or settings
});
```

- **concat:** Run requests one after another, in order.
```typescript
import { concat } from 'rxjs';

concat(
  http.get('/api/step1'),
  http.get('/api/step2')
).subscribe(result => {
  // Each result as it completes, in order
});
```

- **merge:** Run requests in parallel, emit results as they arrive.
```typescript
import { merge } from 'rxjs';

merge(
  http.get('/api/a'),
  http.get('/api/b')
).subscribe(result => {
  // Each result as soon as it arrives
});
```
