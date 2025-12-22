import { Observable, Subject } from 'rxjs';
import { exhaustMap, catchError, of } from 'rxjs';

// Simulated login API call
export function loginApiCall(credentials: { username: string; password: string }): Observable<string> {
  return new Observable(observer => {
    setTimeout(() => {
      if (credentials.username === 'error') {
        observer.error('Login failed');
      } else {
        observer.next(`Login successful for ${credentials.username}`);
        observer.complete();
      }
    }, 2000);
  });
}

// Main function to handle login button clicks with duplicate prevention
export function preventDuplicateLogin(
  clicks$: Observable<{ username: string; password: string }>
): Observable<string> {
  return clicks$.pipe(
    exhaustMap(credentials =>
      loginApiCall(credentials).pipe(
        catchError(err => of(`Error: ${err}`))
      )
    )
  );
}