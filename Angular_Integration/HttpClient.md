# Angular Integration: HttpClient

- **Every HTTP request returns an Observable:**

  - Angular's HttpClient methods (get, post, etc.) always return observables, allowing you to handle async data streams easily.

- **Composable with operators (map, catchError):**
  - You can use RxJS operators to transform, handle errors, and manage responses.

**Sample Code:**

```typescript
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

constructor(private http: HttpClient) {}

getData() {
  return this.http.get('/api/data').pipe(
    map((res: any) => res.items), // Transform response
    catchError(() => of([]))      // Handle errors, return empty array
  );
}
```

// Usage in component template:
// <div \*ngIf="getData() | async as items">{{ items | json }}</div>
