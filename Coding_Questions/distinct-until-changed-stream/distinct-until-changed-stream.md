# RxJS Coding Question: Distinct Until Changed Stream

## Problem

Create a function `distinctUntilChangedStream` that takes an observable stream of values and returns a new observable that emits only when the current value is different from the previous value. Use the RxJS `distinctUntilChanged` operator.

### Requirements
- The function should be implemented in TypeScript.
- The function signature should be:
  ```ts
  function distinctUntilChangedStream<T>(input$: Observable<T>): Observable<T>
  ```
- The returned observable should emit the first value and then only emit subsequent values if they are different from the previous emitted value.
- Use RxJS operators only.

### Example

Given the following input stream:

```
input$: --1--1--2--2--3--1--|
```

The output should be:

```
output$: --1-----2-----3--1--|
```

### Hints
- Use the `distinctUntilChanged` operator from RxJS.
- You may use any type for the values (numbers, strings, objects, etc.).

---

Implement the solution in `distinct-until-changed-stream.ts` and write tests in `distinct-until-changed-stream.test.ts`.
