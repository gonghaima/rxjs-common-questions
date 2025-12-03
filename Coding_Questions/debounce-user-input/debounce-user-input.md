# RxJS Coding Question: Debounce User Input

## Problem Statement

You are building a search feature for a web application using RxJS. The search input should trigger an API call only when the user stops typing for at least 500 milliseconds. If the user continues typing, the API call should be delayed until they pause. Additionally, if the user enters the same search term consecutively, the API should not be called again.

Write an RxJS code snippet (in TypeScript or JavaScript) that implements this behavior using appropriate RxJS operators.

## Requirements
- Use RxJS operators to debounce the input stream.
- Prevent duplicate consecutive API calls for the same search term.
- Simulate the API call with a function (e.g., `fakeApiCall(term)`).

## Example
- User types: "r", "rx", "rxjs" quickly → Only one API call for "rxjs" after 500ms pause.
- User types: "rxjs", then pauses, then types "rxjs" again → Only one API call for "rxjs".

---

**Bonus:** How would you handle errors from the API call in this stream?
