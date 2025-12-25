import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export function distinctUntilChangedStream<T>(input$: Observable<T>): Observable<T> {
  return input$.pipe(distinctUntilChanged());
}
