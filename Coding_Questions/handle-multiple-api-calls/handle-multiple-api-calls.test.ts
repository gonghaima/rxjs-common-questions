import { 
  fetchDataParallel, 
  fetchDataSequential, 
  fetchDataRace,
  fetchDataParallelWithTimeout,
  fetchUserData,
  fetchUserPosts,
  fetchUserSettings
} from './handle-multiple-api-calls';

describe('Handle Multiple API Calls', () => {
  
  describe('fetchDataParallel', () => {
    it('should fetch all data in parallel and combine results', (done) => {
      fetchDataParallel(1).subscribe({
        next: (result) => {
          expect(result.user).toBeDefined();
          expect(result.posts).toBeDefined();
          expect(result.settings).toBeDefined();
          expect(result.user.id).toBe(1);
          expect(result.posts.length).toBe(2);
          expect(result.settings.theme).toBe('dark');
          done();
        }
      });
    });

    it('should handle errors in parallel execution', (done) => {
      fetchDataParallel(999).subscribe({
        next: (result) => {
          expect(result.error).toContain('Parallel fetch failed');
          done();
        }
      });
    });
  });

  describe('fetchDataSequential', () => {
    it('should fetch data sequentially and combine results', (done) => {
      fetchDataSequential(2).subscribe({
        next: (result) => {
          expect(result.user).toBeDefined();
          expect(result.posts).toBeDefined();
          expect(result.settings).toBeDefined();
          expect(result.user.id).toBe(2);
          expect(result.posts.length).toBe(2);
          done();
        }
      });
    });

    it('should handle errors in sequential execution', (done) => {
      fetchDataSequential(999).subscribe({
        next: (result) => {
          expect(result.error).toContain('Sequential fetch failed');
          done();
        }
      });
    });
  });

  describe('fetchDataRace', () => {
    it('should return result from fastest API', (done) => {
      fetchDataRace(3).subscribe({
        next: (result) => {
          expect(result.type).toBeDefined();
          expect(result.data).toBeDefined();
          expect(['user', 'posts', 'settings']).toContain(result.type);
          done();
        }
      });
    });
  });

  describe('fetchDataParallelWithTimeout', () => {
    it('should complete within timeout', (done) => {
      fetchDataParallelWithTimeout(4).subscribe({
        next: (result) => {
          if (result.error) {
            expect(result.error).toContain('timed out');
          } else {
            expect(result.user).toBeDefined();
            expect(result.posts).toBeDefined();
            expect(result.settings).toBeDefined();
          }
          done();
        }
      });
    });
  });

  describe('Mock APIs', () => {
    it('should return user data', (done) => {
      fetchUserData(5).subscribe({
        next: (user) => {
          expect(user.id).toBe(5);
          expect(user.name).toBe('User 5');
          done();
        }
      });
    });

    it('should return user posts', (done) => {
      fetchUserPosts(6).subscribe({
        next: (posts) => {
          expect(posts.length).toBe(2);
          expect(posts[0].title).toContain('User 6');
          done();
        }
      });
    });

    it('should return user settings', (done) => {
      fetchUserSettings(7).subscribe({
        next: (settings) => {
          expect(settings.theme).toBe('dark');
          expect(settings.notifications).toBe(true);
          done();
        }
      });
    });
  });
});