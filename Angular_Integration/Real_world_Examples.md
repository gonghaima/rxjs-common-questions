# Real-world Examples

- **switchMap: Cancel previous search**
  - Only the latest search request is processed; previous ones are canceled.
  ```typescript
  searchInput$.pipe(
    debounceTime(300),
    switchMap(term => http.get('/api/search?q=' + term))
  ).subscribe(results => {
    // Show latest search results
  });
  ```

- **mergeMap: Parallel background saves**
  - Multiple save requests can run in parallel; all are processed.
  ```typescript
  saveClicks$.pipe(
    mergeMap(data => http.post('/api/save', data))
  ).subscribe(response => {
    // Handle each save response
  });
  ```

- **concatMap: Queue form submissions**
  - Form submissions are queued and processed one after another, in order.
  ```typescript
  formSubmits$.pipe(
    concatMap(form => http.post('/api/submit', form))
  ).subscribe(response => {
    // Handle each submission in order
  });
  ```

- **exhaustMap: Ignore clicks until login completes**
  - Ignores new login clicks while a login request is in progress.
  ```typescript
  loginClicks$.pipe(
    exhaustMap(() => http.post('/api/login'))
  ).subscribe(response => {
    // Handle login response
  });
  ```
