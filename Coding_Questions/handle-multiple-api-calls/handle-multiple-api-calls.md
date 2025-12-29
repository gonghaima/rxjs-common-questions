# RxJS Coding Question: Handle Multiple API Calls

## Problem Statement

You are building a dashboard that needs to fetch data from multiple APIs. Implement three different strategies for handling multiple API calls using RxJS operators:

1. **Parallel Execution**: All API calls should execute simultaneously and wait for all to complete
2. **Sequential Execution**: API calls should execute one after another in order
3. **Race Condition**: Take the result from whichever API responds first and cancel the others

## Requirements

- Implement `fetchDataParallel()` using `forkJoin` to wait for all APIs
- Implement `fetchDataSequential()` using `concatMap` to execute in sequence  
- Implement `fetchDataRace()` using `race` to get the fastest response
- Handle errors appropriately in each strategy
- Use the provided mock API functions

## Mock APIs
```typescript
fetchUserData(userId: number): Observable<{id: number, name: string}>
fetchUserPosts(userId: number): Observable<{title: string, content: string}[]>
fetchUserSettings(userId: number): Observable<{theme: string, notifications: boolean}>
```

## Expected Behavior

- **Parallel**: Returns combined data from all three APIs when all complete
- **Sequential**: Calls APIs in order, returns final combined result
- **Race**: Returns data from whichever API responds first

---

**Bonus:** How would you implement a timeout mechanism that cancels all requests after 5 seconds?