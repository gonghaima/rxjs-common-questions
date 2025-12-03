import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

// Simulated API call function
export function fakeApiCall(term: string): Observable<string> {
  return new Observable(observer => {
    setTimeout(() => {
      if (term === 'error') {
        observer.error('API error for term: ' + term);
      } else {
        observer.next('Results for: ' + term);
        observer.complete();
      }
    }, 300);
  });
}

// Main function to handle debounced user input
export function debouncedSearch(input$: Observable<string>): Observable<string> {
  return input$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(term =>
      fakeApiCall(term).pipe(
        catchError(err => {
          return new Observable<string>(observer => {
            observer.next('Error: ' + err);
            observer.complete();
          });
        })
      )
    )
  );
}
