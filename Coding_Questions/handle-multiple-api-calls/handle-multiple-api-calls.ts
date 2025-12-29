import { Observable, forkJoin, race, of, throwError } from 'rxjs';
import { concatMap, map, catchError, timeout } from 'rxjs/operators';

// Mock API functions
export function fetchUserData(userId: number): Observable<{id: number, name: string}> {
  return new Observable(observer => {
    setTimeout(() => {
      if (userId === 999) {
        observer.error('User not found');
      } else {
        observer.next({id: userId, name: `User ${userId}`});
        observer.complete();
      }
    }, Math.random() * 1000 + 500);
  });
}

export function fetchUserPosts(userId: number): Observable<{title: string, content: string}[]> {
  return new Observable(observer => {
    setTimeout(() => {
      observer.next([
        {title: `Post 1 by User ${userId}`, content: 'Content 1'},
        {title: `Post 2 by User ${userId}`, content: 'Content 2'}
      ]);
      observer.complete();
    }, Math.random() * 800 + 300);
  });
}

export function fetchUserSettings(userId: number): Observable<{theme: string, notifications: boolean}> {
  return new Observable(observer => {
    setTimeout(() => {
      observer.next({theme: 'dark', notifications: true});
      observer.complete();
    }, Math.random() * 600 + 200);
  });
}

// Parallel execution - all APIs called simultaneously
export function fetchDataParallel(userId: number): Observable<any> {
  return forkJoin({
    user: fetchUserData(userId),
    posts: fetchUserPosts(userId),
    settings: fetchUserSettings(userId)
  }).pipe(
    catchError(err => of({error: `Parallel fetch failed: ${err}`}))
  );
}

// Sequential execution - APIs called one after another
export function fetchDataSequential(userId: number): Observable<any> {
  return fetchUserData(userId).pipe(
    concatMap(user => 
      fetchUserPosts(userId).pipe(
        concatMap(posts =>
          fetchUserSettings(userId).pipe(
            map(settings => ({user, posts, settings}))
          )
        )
      )
    ),
    catchError(err => of({error: `Sequential fetch failed: ${err}`}))
  );
}

// Race condition - first API to respond wins
export function fetchDataRace(userId: number): Observable<any> {
  return race(
    fetchUserData(userId).pipe(map(data => ({type: 'user', data}))),
    fetchUserPosts(userId).pipe(map(data => ({type: 'posts', data}))),
    fetchUserSettings(userId).pipe(map(data => ({type: 'settings', data})))
  ).pipe(
    catchError(err => of({error: `Race fetch failed: ${err}`}))
  );
}

// Bonus: With timeout mechanism
export function fetchDataParallelWithTimeout(userId: number): Observable<any> {
  return forkJoin({
    user: fetchUserData(userId),
    posts: fetchUserPosts(userId),
    settings: fetchUserSettings(userId)
  }).pipe(
    timeout(5000),
    catchError(err => of({error: `Fetch failed or timed out: ${err}`}))
  );
}