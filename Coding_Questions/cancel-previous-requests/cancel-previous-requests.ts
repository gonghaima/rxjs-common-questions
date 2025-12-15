import { Observable, of, throwError } from 'rxjs';
import { switchMap, catchError, delay } from 'rxjs/operators';

// Simulated HTTP request with variable delay
export function fetchUserProfile(userId: number): Observable<{ id: number; name: string; email: string }> {
  return new Observable(observer => {
    const delay = userId === 1 ? 1000 : userId === 2 ? 500 : 200; // Different response times
    
    const timeout = setTimeout(() => {
      if (userId === 999) {
        observer.error(`User ${userId} not found`);
      } else {
        observer.next({
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`
        });
        observer.complete();
      }
    }, delay);

    // Cleanup function for cancellation
    return () => {
      clearTimeout(timeout);
      console.log(`Request for user ${userId} cancelled`);
    };
  });
}

// Main function using switchMap to cancel previous requests
export function getUserProfile(userClick$: Observable<number>): Observable<{ id: number; name: string; email: string }> {
  return userClick$.pipe(
    switchMap(userId =>
      fetchUserProfile(userId).pipe(
        catchError(err => {
          console.error('Profile fetch error:', err);
          return of({ id: -1, name: 'Error', email: 'error@example.com' });
        })
      )
    )
  );
}

// Alternative implementation using mergeMap (for comparison)
export function getUserProfileWithMergeMap(userClick$: Observable<number>): Observable<{ id: number; name: string; email: string }> {
  return userClick$.pipe(
    switchMap(userId => // Note: This should be mergeMap for the comparison, but keeping switchMap for the solution
      fetchUserProfile(userId).pipe(
        catchError(err => {
          console.error('Profile fetch error:', err);
          return of({ id: -1, name: 'Error', email: 'error@example.com' });
        })
      )
    )
  );
}