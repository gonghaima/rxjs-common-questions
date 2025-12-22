import { preventDuplicateLogin, loginApiCall } from './prevent-duplicate-requests';
import { Subject } from 'rxjs';

describe('preventDuplicateLogin', () => {
  let clicks$: Subject<{ username: string; password: string }>;
  
  beforeEach(() => {
    clicks$ = new Subject();
  });

  it('should ignore duplicate clicks while request is in progress', (done) => {
    const results: string[] = [];
    const credentials = { username: 'testuser', password: 'password' };
    
    preventDuplicateLogin(clicks$).subscribe({
      next: (res) => results.push(res),
      complete: () => {
        expect(results).toEqual(['Login successful for testuser']);
        done();
      }
    });

    // Simulate rapid clicks
    clicks$.next(credentials);
    clicks$.next(credentials);
    clicks$.next(credentials);
    
    setTimeout(() => clicks$.complete(), 3000);
  });

  it('should allow new request after previous one completes', (done) => {
    const results: string[] = [];
    const credentials1 = { username: 'user1', password: 'pass1' };
    const credentials2 = { username: 'user2', password: 'pass2' };
    
    preventDuplicateLogin(clicks$).subscribe({
      next: (res) => results.push(res),
      complete: () => {
        expect(results).toEqual([
          'Login successful for user1',
          'Login successful for user2'
        ]);
        done();
      }
    });

    clicks$.next(credentials1);
    
    // Wait for first request to complete, then send second
    setTimeout(() => {
      clicks$.next(credentials2);
      setTimeout(() => clicks$.complete(), 3000);
    }, 2500);
  }, 10000);

  it('should handle API errors and allow subsequent requests', (done) => {
    const results: string[] = [];
    const errorCredentials = { username: 'error', password: 'password' };
    const validCredentials = { username: 'validuser', password: 'password' };
    
    preventDuplicateLogin(clicks$).subscribe({
      next: (res) => results.push(res),
      complete: () => {
        expect(results).toEqual([
          'Error: Login failed',
          'Login successful for validuser'
        ]);
        done();
      }
    });

    clicks$.next(errorCredentials);
    
    setTimeout(() => {
      clicks$.next(validCredentials);
      setTimeout(() => clicks$.complete(), 3000);
    }, 2500);
  }, 10000);
});