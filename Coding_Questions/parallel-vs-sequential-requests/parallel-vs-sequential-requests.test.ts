import { fetchUsersParallel, fetchUsersSequential, fetchUsersLatestOnly, User } from './parallel-vs-sequential-requests';
import { BehaviorSubject } from 'rxjs';

describe('Parallel vs Sequential Requests', () => {
  
  describe('fetchUsersParallel', () => {
    it('should fetch all users in parallel', (done) => {
      const userIds = [1, 2, 3];
      const startTime = Date.now();
      
      fetchUsersParallel(userIds).subscribe({
        next: (users) => {
          const duration = Date.now() - startTime;
          expect(users).toHaveLength(3);
          expect(users.map(u => u.id)).toEqual([1, 2, 3]);
          expect(duration).toBeLessThan(400); // Should be faster than sequential
          done();
        }
      });
    });

    it('should handle errors gracefully in parallel', (done) => {
      const userIds = [1, 999, 3]; // 999 will error
      
      fetchUsersParallel(userIds).subscribe({
        next: (users) => {
          expect(users).toHaveLength(3);
          expect(users[1].name).toContain('Error loading');
          done();
        }
      });
    });
  });

  describe('fetchUsersSequential', () => {
    it('should fetch users one after another', (done) => {
      const userIds = [1, 2, 3];
      const results: User[] = [];
      
      fetchUsersSequential(userIds).subscribe({
        next: (users) => {
          expect(users).toHaveLength(3);
          expect(users.map(u => u.id)).toEqual([1, 2, 3]);
          done();
        }
      });
    });

    it('should maintain order in sequential processing', (done) => {
      const userIds = [3, 1, 2];
      
      fetchUsersSequential(userIds).subscribe({
        next: (users) => {
          expect(users.map(u => u.id)).toEqual([3, 1, 2]); // Same order as input
          done();
        }
      });
    });
  });

  describe('fetchUsersLatestOnly', () => {
    it('should cancel previous requests when new batch arrives', (done) => {
      const userIds$ = new BehaviorSubject([1, 2, 3]);
      const results: User[][] = [];
      
      fetchUsersLatestOnly(userIds$).subscribe({
        next: (users) => results.push(users)
      });

      // Quickly emit new batch to test cancellation
      setTimeout(() => userIds$.next([4, 5]), 50);
      
      setTimeout(() => {
        expect(results).toHaveLength(1);
        expect(results[0].map(u => u.id)).toEqual([4, 5]);
        done();
      }, 500);
    });
  });
});