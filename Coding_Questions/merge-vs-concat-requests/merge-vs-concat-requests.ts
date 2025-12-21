import { Observable, of, from } from 'rxjs';
import { mergeMap, concatMap, catchError, map } from 'rxjs/operators';

export interface ProfileResult {
  userId: number;
  data?: any;
  error?: string;
}

// Simulated API call
export function fetchProfile(userId: number): Observable<any> {
  return new Observable(observer => {
    setTimeout(() => {
      if (userId === 999) {
        observer.error(`Profile ${userId} not found`);
      } else {
        observer.next({ id: userId, name: `User ${userId}` });
        observer.complete();
      }
    }, Math.random() * 1000);
  });
}

// Parallel processing using mergeMap
export function fetchProfilesParallel(userIds: number[]): Observable<ProfileResult[]> {
  return from(userIds).pipe(
    mergeMap(userId =>
      fetchProfile(userId).pipe(
        map(data => ({ userId, data })),
        catchError(error => of({ userId, error: error.toString() }))
      )
    ),
    // Collect all results
    map((result, index) => {
      const results: ProfileResult[] = [];
      results[index] = result;
      return results;
    })
  );
}

// Sequential processing using concatMap
export function fetchProfilesSequential(userIds: number[]): Observable<ProfileResult[]> {
  return from(userIds).pipe(
    concatMap(userId =>
      fetchProfile(userId).pipe(
        map(data => ({ userId, data })),
        catchError(error => of({ userId, error: error.toString() }))
      )
    ),
    // Collect all results
    map((result, index) => {
      const results: ProfileResult[] = [];
      results[index] = result;
      return results;
    })
  );
}