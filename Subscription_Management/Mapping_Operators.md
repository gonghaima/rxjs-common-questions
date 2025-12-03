# Mapping Operators

- **map:** Transforms each value emitted by the source observable.
  - _Use case:_ Format API response data before displaying in UI.

```typescript
source$.pipe(map((x) => x * 2));
```

- **switchMap:** Cancels previous inner observable when a new value arrives, switches to the latest.
  - _Use case:_ Search-as-you-type: only process the latest search term, cancel previous HTTP requests.

```typescript
search$.pipe(switchMap((term) => http.get(`/api?q=${term}`)));
```

- **mergeMap:** Handles multiple inner observables in parallel, merges all results.
  - _Use case:_ Save multiple form sections in parallel, or process multiple uploads at once.

```typescript
ids$.pipe(mergeMap((id) => http.get(`/api/item/${id}`)));
```

- **concatMap:** Queues inner observables, runs them one after another in order.
  - _Use case:_ Submit a queue of form entries one by one, ensuring order.

```typescript
forms$.pipe(concatMap((form) => http.post('/api/submit', form)));
```

- **exhaustMap:** Ignores new values until the current inner observable completes.
  - _Use case:_ Prevent multiple login requests from rapid button clicks; only process one at a time.

```typescript
loginClicks$.pipe(exhaustMap(() => http.post('/api/login')));
```
