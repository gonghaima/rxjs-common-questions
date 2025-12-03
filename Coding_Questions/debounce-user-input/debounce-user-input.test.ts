import { debouncedSearch, fakeApiCall } from './debounce-user-input';
import { Subject } from 'rxjs';

describe('debouncedSearch', () => {
  let input$: Subject<string>;
  beforeEach(() => {
    input$ = new Subject<string>();
  });

  it('should debounce rapid input and only emit after pause', (done) => {
    const results: string[] = [];
    debouncedSearch(input$).subscribe({
      next: (res) => results.push(res),
      complete: () => {
        expect(results).toEqual(['Results for: rxjs']);
        done();
      }
    });
    input$.next('r');
    input$.next('rx');
    input$.next('rxjs');
    setTimeout(() => input$.complete(), 800); // Wait for debounce
  });

  it('should not emit duplicate consecutive terms', (done) => {
    const results: string[] = [];
    debouncedSearch(input$).subscribe({
      next: (res) => results.push(res),
      complete: () => {
        expect(results).toEqual(['Results for: rxjs']);
        done();
      }
    });
    input$.next('rxjs');
    setTimeout(() => {
      input$.next('rxjs'); // duplicate
      input$.complete();
    }, 600);
  });

  it('should handle API errors gracefully', (done) => {
    const results: string[] = [];
    debouncedSearch(input$).subscribe({
      next: (res) => results.push(res),
      complete: () => {
        expect(results.some(r => r.startsWith('Error:'))).toBe(true);
        done();
      }
    });
    input$.next('error');
    setTimeout(() => input$.complete(), 800);
  });
});
