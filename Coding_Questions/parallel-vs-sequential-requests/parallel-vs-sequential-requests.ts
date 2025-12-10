import { Observable, from, of, forkJoin } from 'rxjs';
import { mergeMap, concatMap, switchMap, catchError, toArray } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
}

// Simulated API call
export function fetchUser(id: number): Observable<User> {
  return new Observable(observer => {
    setTimeout(() => {
      if (id === 999) {
        observer.error(`User ${id} not found`);
      } else {
        observer.next({ id, name: `User ${id}` });
        observer.complete();
      }
    }, Math.random() * 200 + 100);
  });
}

// Parallel: All requests execute simultaneously
export function fetchUsersParallel(userIds: number[]): Observable<User[]> {
  return forkJoin(
    userIds.map(id => 
      fetchUser(id).pipe(
        catchError(() => of({ id, name: `Error loading user ${id}` }))
      )
    )
  );
}

// Sequential: Requests execute one after another
export function fetchUsersSequential(userIds: number[]): Observable<User[]> {
  return from(userIds).pipe(
    concatMap(id => 
      fetchUser(id).pipe(
        catchError(() => of({ id, name: `Error loading user ${id}` }))
      )
    ),
    toArray()
  );
}

// Latest only: Cancel previous batch when new one arrives
export function fetchUsersLatestOnly(userIds$: Observable<number[]>): Observable<User[]> {
  return userIds$.pipe(
    switchMap(userIds => fetchUsersParallel(userIds))
  );
}
