# Side Effects vs Transformation

- **tap:** Performs side effects for notifications from the source observable, but does not modify the stream.
```typescript
source$.pipe(
  tap(value => console.log('Side effect:', value))
);
```
- **map:** Transforms each value emitted by the source observable.
```typescript
source$.pipe(
  map(value => value * 2)
);
```

**Tip:**
- Use `tap` for logging, debugging, or triggering actions without changing the data.
- Use `map` to transform or shape the data in the stream.
