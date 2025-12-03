# Timing Operators

- **debounceTime:** Waits for a pause in events before emitting the latest value.

```typescript
searchInput$.pipe(debounceTime(300)); // Emits after 300ms of no input
```

- **throttleTime:** Emits the first value, then ignores subsequent values for a set time window.

```typescript
clicks$.pipe(throttleTime(1000)); // Emits at most once per second
```

**Tip:**

- Use `debounceTime` for search-as-you-type or auto-save features.
- Use `throttleTime` for rate-limiting actions like button clicks or scroll events.
