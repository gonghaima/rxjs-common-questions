import { getUserProfile, fetchUserProfile } from './cancel-previous-requests';
import { Subject } from 'rxjs';

describe('getUserProfile', () => {
  let userClick$: Subject<number>;

  beforeEach(() => {
    userClick$ = new Subject<number>();
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should cancel previous requests and only emit the latest', (done) => {
    const results: any[] = [];
    
    getUserProfile(userClick$).subscribe({
      next: (profile) => results.push(profile),
      complete: () => {
        // Should only get User 3 since it's the fastest and latest
        expect(results).toHaveLength(1);
        expect(results[0].id).toBe(3);
        expect(results[0].name).toBe('User 3');
        done();
      }
    });

    // Rapid clicks: User 1 (slow), User 2 (medium), User 3 (fast)
    userClick$.next(1); // 1000ms delay
    userClick$.next(2); // 500ms delay  
    userClick$.next(3); // 200ms delay

    setTimeout(() => {
      userClick$.complete();
    }, 1200);
  });

  it('should handle single request normally', (done) => {
    const results: any[] = [];
    
    getUserProfile(userClick$).subscribe({
      next: (profile) => results.push(profile),
      complete: () => {
        expect(results).toHaveLength(1);
        expect(results[0].id).toBe(2);
        done();
      }
    });

    userClick$.next(2);
    setTimeout(() => userClick$.complete(), 600);
  });

  it('should handle errors gracefully', (done) => {
    const results: any[] = [];
    
    getUserProfile(userClick$).subscribe({
      next: (profile) => results.push(profile),
      complete: () => {
        expect(results).toHaveLength(1);
        expect(results[0].id).toBe(-1);
        expect(results[0].name).toBe('Error');
        done();
      }
    });

    userClick$.next(999); // This triggers an error
    setTimeout(() => userClick$.complete(), 300);
  });

  it('should cancel slower requests when faster ones come later', (done) => {
    const results: any[] = [];
    
    getUserProfile(userClick$).subscribe({
      next: (profile) => results.push(profile),
      complete: () => {
        // Should get both User 3 and User 2 since User 3 completes first
        expect(results).toHaveLength(1);
        expect(results[0].id).toBe(2); // User 2 should be the final result
        done();
      }
    });

    userClick$.next(1); // 1000ms delay
    setTimeout(() => userClick$.next(3), 50); // 200ms delay, starts after 50ms
    setTimeout(() => userClick$.next(2), 100); // 500ms delay, starts after 100ms

    setTimeout(() => userClick$.complete(), 800);
  });
});