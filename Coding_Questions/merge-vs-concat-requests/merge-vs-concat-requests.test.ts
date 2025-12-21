import { fetchProfilesParallel, fetchProfilesSequential, ProfileResult } from './merge-vs-concat-requests';

describe('Profile Fetching', () => {
  it('should fetch profiles in parallel', (done) => {
    const userIds = [1, 2, 3];
    const results: ProfileResult[] = [];
    
    fetchProfilesParallel(userIds).subscribe({
      next: (result) => results.push(...result),
      complete: () => {
        expect(results).toHaveLength(3);
        expect(results.every(r => r.data)).toBe(true);
        done();
      }
    });
  });

  it('should fetch profiles sequentially', (done) => {
    const userIds = [1, 2, 3];
    const results: ProfileResult[] = [];
    
    fetchProfilesSequential(userIds).subscribe({
      next: (result) => results.push(...result),
      complete: () => {
        expect(results).toHaveLength(3);
        expect(results.every(r => r.data)).toBe(true);
        done();
      }
    });
  });

  it('should handle errors in parallel processing', (done) => {
    const userIds = [1, 999, 3];
    const results: ProfileResult[] = [];
    
    fetchProfilesParallel(userIds).subscribe({
      next: (result) => results.push(...result),
      complete: () => {
        expect(results).toHaveLength(3);
        expect(results.find(r => r.userId === 999)?.error).toBeDefined();
        done();
      }
    });
  });

  it('should handle errors in sequential processing', (done) => {
    const userIds = [1, 999, 3];
    const results: ProfileResult[] = [];
    
    fetchProfilesSequential(userIds).subscribe({
      next: (result) => results.push(...result),
      complete: () => {
        expect(results).toHaveLength(3);
        expect(results.find(r => r.userId === 999)?.error).toBeDefined();
        done();
      }
    });
  });
});