# Higher-order Observables

- **Definition:**
  - An observable that emits other observables (streams of streams).
  - Commonly used with operators like `switchMap`, `mergeMap`, `concatMap`, and `exhaustMap`.

- **Use case:**
  - Handling user actions that trigger async operations (e.g., HTTP requests on search input).

**Sample Code:**
```typescript
import { fromEvent } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Example: Each keyup emits a new HTTP observable
const searchInput$ = fromEvent(document, 'keyup');
const result$ = searchInput$.pipe(
  switchMap(event => http.get('/api/search?q=' + event.target.value))
);
result$.subscribe(data => {
  // Handle search results
});
```

// Here, switchMap receives an observable from http.get for each keyup event, and flattens it into a single output stream.
