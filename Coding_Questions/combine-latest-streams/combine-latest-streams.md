
# Combine Latest Streams

## Problem

You have two streams of data, `stream1$` and `stream2$`. You need to create a new stream that emits an array containing the latest values from each stream, but only when either of the source streams emits a new value.

## Acceptance Criteria

- You must use the `combineLatest` operator from RxJS.
- The resulting stream should emit an array of the latest values from `stream1$` and `stream2$`.
- The combined stream should only start emitting after both source streams have emitted at least one value.

## Function Signature

```typescript
import { Observable } from 'rxjs';

export function combineLatestStreams(
  stream1$: Observable<any>,
  stream2$: Observable<any>
): Observable<[any, any]> {
  // Your implementation here
}
```
