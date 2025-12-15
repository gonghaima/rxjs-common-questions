# RxJS Coding Question: Cancel Previous Requests

## Problem Statement

You are building a user profile page where users can quickly switch between different user IDs to view their profiles. Each time a user clicks on a different user ID, an HTTP request is made to fetch that user's data. However, if the user clicks rapidly on multiple user IDs, you want to cancel any pending requests and only show the data for the most recently requested user.

Write an RxJS code snippet that implements this behavior using appropriate operators to ensure that only the latest request's response is displayed, and all previous pending requests are cancelled.

## Requirements
- Use RxJS operators to handle rapid user clicks on different user IDs
- Cancel previous HTTP requests when a new request is initiated
- Only emit the response from the most recent request
- Simulate HTTP requests with a function that returns an Observable with different response times

## Example
- User clicks: UserID 1 → UserID 2 → UserID 3 rapidly
- Only UserID 3's data should be displayed, even if UserID 1 or 2 responses arrive later
- Previous requests for UserID 1 and 2 should be cancelled

## Test Scenarios
1. Rapid clicks should cancel previous requests
2. Slower requests should not interfere with faster ones
3. Error handling should work for cancelled and failed requests

---

**Bonus:** Compare this implementation with mergeMap - what would be the difference in behavior?