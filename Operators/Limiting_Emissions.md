# Limiting Emissions

- **take:** Take a specific number of emissions, then complete.

```typescript
source$.pipe(take(3)); // Takes the first 3 values
```

- **takeUntil:** Take values until another observable emits, then complete.

```typescript
source$.pipe(takeUntil(stop$)); // Takes values until stop$ emits
```

- **first:** Take only the first emission, then complete.

```typescript
source$.pipe(first()); // Takes the first value only
```

**Tip:**

- Use these operators to control how many values you process, avoid memory leaks, or stop streams based on conditions.
