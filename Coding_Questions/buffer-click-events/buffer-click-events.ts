import { Observable } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

/**
 * Buffers click events and emits them as an array every 1 second.
 * @param click$ Observable of click events
 * @returns Observable emitting arrays of click events every 1 second
 */
export function bufferClickEvents<T>(click$: Observable<T>): Observable<T[]> {
  return click$.pipe(
    bufferTime(1000)
  );
}
