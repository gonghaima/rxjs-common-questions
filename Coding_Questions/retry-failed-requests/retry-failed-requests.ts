import { Observable, of, timer, EMPTY, concat } from 'rxjs';
import { retry, mergeMap, take, delay, catchError, concatMap } from 'rxjs/operators';

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Simulated API call that can fail
export function unreliableApiCall(id: string): Observable<ApiResponse> {
  return new Observable(observer => {
    setTimeout(() => {
      const random = Math.random();
      if (id === 'always-fail' || random < 0.7) {
        observer.error(`Network error for request ${id}`);
      } else {
        observer.next({ success: true, data: `Data for ${id}` });
        observer.complete();
      }
    }, 100);
  });
}

// Retry with exponential backoff
export function retryWithBackoff<T>(source$: Observable<T>): Observable<T> {
  return source$.pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => timer(Math.pow(2, retryCount - 1) * 1000)
    }),
    catchError(error => 
      of({ success: false, error: `Request failed after 3 retries: ${error}` } as any)
    )
  );
}

// Process retry queue sequentially
export function processRetryQueue(requestIds: string[]): Observable<ApiResponse> {
  return concat(
    ...requestIds.map(id =>
      retryWithBackoff(unreliableApiCall(id))
    )
  );
}

// Alternative implementation using concatMap
export function processRetryQueueAlt(requestIds: string[]): Observable<ApiResponse> {
  return of(...requestIds).pipe(
    concatMap(id => retryWithBackoff(unreliableApiCall(id)))
  );
}