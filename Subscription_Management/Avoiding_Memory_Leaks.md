# Avoiding Memory Leaks

- **Use async pipe in templates**

  - Angular automatically unsubscribes when the component is destroyed.

  ```html
  <div *ngIf="data$ | async as data">{{ data }}</div>
  ```

- **Use takeUntil pattern**

  - Unsubscribe when a notifier emits (e.g., on component destroy).

  ```typescript
  private destroy$ = new Subject<void>();
  ngOnInit() {
    source$.pipe(takeUntil(this.destroy$)).subscribe();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ```

- **Use Subscription.unsubscribe()**

  - Manually unsubscribe in ngOnDestroy.

  ```typescript
  private sub: Subscription;
  ngOnInit() {
    this.sub = source$.subscribe();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ```

- **Use AutoUnsubscribe decorator**
  - Use a library/decorator to auto-unsubscribe all subscriptions.
  ```typescript
  @AutoUnsubscribe()
  export class MyComponent {
    sub = source$.subscribe();
  }
  ```
