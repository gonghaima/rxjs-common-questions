# throwError vs catchError

- **throwError:** Creates an observable that immediately emits an error.
  - *Use case:* Simulate an error for testing, or propagate an error in a custom operator.
  ```typescript
  import { throwError } from 'rxjs';

  throwError(() => new Error('Something went wrong'));
  ```

- **catchError:** Handles or recovers from errors in the observable stream.
  - *Use case:* Show a fallback value, log the error, or retry the operation.
  ```typescript
  import { catchError, of } from 'rxjs';

  http.get('/api/data').pipe(
    catchError(error => {
      console.error(error);
      return of([]); // Return empty array on error
    })
  );
  ```
