# RxJS Coding Question: Parallel vs Sequential HTTP Requests

## Problem Statement

You are building a data dashboard that needs to fetch user information from multiple endpoints. You have an array of user IDs and need to implement three different strategies for making HTTP requests:

1. **Parallel Requests**: All requests execute simultaneously and you collect all results
2. **Sequential Requests**: Requests execute one after another in order
3. **Latest Only**: Cancel previous requests when a new batch starts (useful for search scenarios)

Write RxJS functions that implement each strategy using appropriate operators.

## Requirements

- Implement `fetchUsersParallel(userIds: number[]): Observable<User[]>`
- Implement `fetchUsersSequential(userIds: number[]): Observable<User[]>`
- Implement `fetchUsersLatestOnly(userIds$: Observable<number[]>): Observable<User[]>`
- Use appropriate RxJS operators: `mergeMap`, `concatMap`, `switchMap`, `forkJoin`
- Handle errors gracefully (continue processing other requests if one fails)

## Example Usage

```typescript
const userIds = [1, 2, 3, 4, 5];

// Parallel: All requests start immediately
fetchUsersParallel(userIds).subscribe(users => console.log('Parallel:', users));

// Sequential: Request for user 2 starts only after user 1 completes
fetchUsersSequential(userIds).subscribe(users => console.log('Sequential:', users));

// Latest only: Cancel previous batch if new userIds arrive
const userIds$ = new BehaviorSubject([1, 2, 3]);
fetchUsersLatestOnly(userIds$).subscribe(users => console.log('Latest:', users));
```

## Expected Behavior

- **Parallel**: Fastest execution, requests may complete out of order
- **Sequential**: Slower but maintains order, good for rate-limited APIs
- **Latest Only**: Cancels previous requests, prevents stale data

---

**Bonus:** How would you implement a hybrid approach that processes requests in batches of 3 simultaneously?