# RxJS Coding Question: Retry Failed Requests

## Problem Statement

You are building a data synchronization feature that needs to handle unreliable network conditions. When an API request fails, it should automatically retry up to 3 times with exponential backoff (delays of 1s, 2s, 4s). If all retries fail, it should return a user-friendly error message.

Additionally, implement a function that can retry multiple failed requests from a queue, but only process one retry at a time to avoid overwhelming the server.

## Requirements
- Implement automatic retry with exponential backoff for failed requests
- Maximum of 3 retry attempts
- Handle both network errors and HTTP error responses
- Process retry queue sequentially (one at a time)
- Return meaningful error messages after all retries are exhausted

## Example Scenarios
- Request fails → retry after 1s → fails → retry after 2s → fails → retry after 4s → return error
- Multiple failed requests in queue → process retries one by one, not in parallel

---

**Bonus:** How would you implement a circuit breaker pattern to temporarily stop retrying when the server is consistently failing?