# Sharing Operators

- **shareReplay:**

  - Caches previous emissions and replays them to new subscribers.
  - _Use case:_ Cache HTTP responses so late subscribers get the last value without refetching.

  ```typescript
  const data$ = http.get('/api/data').pipe(
    shareReplay(1) // Cache the latest emission
  );
  data$.subscribe(); // First subscriber triggers HTTP request
  data$.subscribe(); // Second subscriber gets cached value
  ```

- **share:**
  - Shares a single subscription among all subscribers, but does not cache previous emissions.
  - _Use case:_ Share a live stream (e.g., WebSocket) so all subscribers get the same data, but late subscribers only get new emissions.
  ```typescript
  const live$ = webSocket('ws://example.com').pipe(share());
  live$.subscribe(); // All subscribers share the same execution
  ```
