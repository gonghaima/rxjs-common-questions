# Consequences of Not Unsubscribing

- **Memory leaks:**
  - Subscriptions remain active after a component is destroyed, causing unused resources to accumulate and slow down the app over time.
  ```typescript
  // Example: Not unsubscribing
  ngOnInit() {
    source$.subscribe(); // Never unsubscribed
  }
  // When component is destroyed, subscription stays alive
  ```

- **Multiple unintended executions:**
  - Old subscriptions can trigger multiple times, leading to duplicate API calls, event handlers, or unexpected behavior when the component is recreated.
  ```typescript
  // Example: Multiple subscriptions
  ngOnInit() {
    source$.subscribe(data => {
      // This may run multiple times if not unsubscribed
      apiCall(data);
    });
  }
  // Each time component is recreated, a new subscription is added
  ```

**Tip:**
- Always unsubscribe from observables in Angular to keep your app efficient and bug-free.
