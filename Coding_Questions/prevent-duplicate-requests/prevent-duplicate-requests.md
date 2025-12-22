# RxJS Coding Question: Prevent Duplicate Requests

## Problem Statement

You are building a login form where users can click a "Login" button. However, you want to prevent multiple simultaneous login requests if the user clicks the button multiple times before the first request completes. Only the first click should trigger a request, and subsequent clicks should be ignored until the current request finishes.

Write an RxJS code snippet that implements this behavior using appropriate RxJS operators.

## Requirements
- Use RxJS operators to handle button click events
- Prevent duplicate requests while one is already in progress
- Allow new requests only after the current one completes (success or error)
- Simulate the login API call with a function (e.g., `loginApiCall(credentials)`)

## Example
- User clicks login button 3 times rapidly → Only 1 API call is made
- After the first request completes, user can click again → New request is allowed

---

**Bonus:** How would you provide user feedback (like disabling the button) during the request?