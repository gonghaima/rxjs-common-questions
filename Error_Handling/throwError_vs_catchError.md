# throwError vs catchError

- **throwError:** Creates an observable that immediately emits an error.

  - _Use case:_ Simulate an error for testing, or propagate an error in a custom operator.

  ```typescript
  import { throwError } from 'rxjs';

  throwError(() => new Error('Something went wrong'));
  ```

- **catchError:** Handles or recovers from errors in the observable stream.

  - _Use case:_ Show a fallback value, log the error, or retry the operation.

  ```typescript
  import { catchError, of } from 'rxjs';

  http.get('/api/data').pipe(
    catchError((error) => {
      console.error(error);
      return of([]); // Return empty array on error
    })
  );
  ```
