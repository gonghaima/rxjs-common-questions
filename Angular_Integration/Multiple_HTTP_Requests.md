# Multiple HTTP Requests

- **forkJoin:** Run requests in parallel, emit when all complete (like Promise.all).
```typescript
import { forkJoin } from 'rxjs';

forkJoin([
  http.get('/api/user'),
  http.get('/api/orders')
]).subscribe(([user, orders]) => {
  // Both requests done
});
```

- **combineLatest:** Combine latest values from multiple observables, emit whenever any changes (after all have emitted at least once).
```typescript
import { combineLatest } from 'rxjs';

combineLatest([
  http.get('/api/user'),
  http.get('/api/settings')
]).subscribe(([user, settings]) => {
  // React to latest user or settings
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
