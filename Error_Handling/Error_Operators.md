# Error Operators

- **catchError:** Handle or recover from errors in the observable stream.
  - *Use case:* Show a fallback value or error message when an HTTP request fails.
  ```typescript
  http.get('/api/data').pipe(
    catchError(() => of([])) // Return empty array on error
  );
  ```

- **retry:** Automatically retry the source observable a specified number of times on error.
  - *Use case:* Retry a failed HTTP request up to 3 times before failing.
  ```typescript
  http.get('/api/data').pipe(
    retry(3)
  );
  ```

- **retryWhen:** Retry the source observable based on a custom condition or delay.
  - *Use case:* Retry with a delay after an error, e.g., exponential backoff.
  ```typescript
  http.get('/api/data').pipe(
    retryWhen(errors => errors.pipe(delay(1000)))
  );
  ```
