# Mapping Operators

- **map:** Transforms each value emitted by the source observable (e.g., convert API response to model).
```typescript
source$.pipe(map(value => value * 2));
```
- **switchMap:** Cancels previous inner observable when a new value arrives, switches to the latest (e.g., search-as-you-type, only latest request matters).
switchMap = "Cancel old, switch to new stream."
```typescript
searchInput$.pipe(switchMap(term => http.get(`/api?q=${term}`)));
```
- **mergeMap:** Subscribes to multiple inner observables in parallel, all results are merged (e.g., fire off multiple save requests at once).
```typescript
ids$.pipe(mergeMap(id => http.get(`/api/item/${id}`)));
```
- **concatMap:** Queues inner observables, runs them one after another in order (e.g., process form submissions sequentially).
```typescript
forms$.pipe(concatMap(form => http.post('/api/submit', form)));
```
- **exhaustMap:** Ignores new values until the current inner observable completes (e.g., ignore button clicks while a login request is in progress).
```typescript
loginClicks$.pipe(exhaustMap(() => http.post('/api/login')));
```

**Quick Tip:**
- Use real-world scenarios (API calls, user input) to explain these in interviews.
