import { Observable, combineLatest } from 'rxjs';

export function combineLatestStreams(
  stream1$: Observable<any>,
  stream2$: Observable<any>
): Observable<[any, any]> {
  // Your implementation here
  return combineLatest([stream1$, stream2$]);
}
