# RxJS Coding Question: Merge vs Concat Requests

## Problem Statement

You need to process a list of user IDs and fetch their profile data from an API. Implement two different approaches:

1. **Parallel Processing**: Fetch all profiles simultaneously (merge strategy)
2. **Sequential Processing**: Fetch profiles one after another (concat strategy)

Both approaches should handle errors gracefully and return the results in a structured format.

## Requirements
- Implement `fetchProfilesParallel(userIds: number[])` using merge strategy
- Implement `fetchProfilesSequential(userIds: number[])` using concat strategy  
- Handle API errors without breaking the entire stream
- Return results as `{ userId: number, data?: any, error?: string }[]`

## Example
```typescript
const userIds = [1, 2, 3];
// Parallel: All requests start immediately
// Sequential: Request 2 starts only after request 1 completes
```

---

**Bonus:** Which approach would you choose for a bulk email sending feature and why?