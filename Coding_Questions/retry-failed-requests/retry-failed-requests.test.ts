import { of, Observable } from 'rxjs';
import { retryWithBackoff, processRetryQueue, unreliableApiCall } from './retry-failed-requests';

describe('Retry Failed Requests', () => {
  it('should retry and eventually fail after 3 attempts', (done) => {
    const failingRequest$ = new Observable(observer => {
      observer.error('Network error');
    });
    
    retryWithBackoff(failingRequest$).subscribe({
      next: (result: any) => {
        expect(result.success).toBe(false);
        expect(result.error).toContain('failed after 3 retries');
        done();
      }
    });
  }, 15000);

  it('should process retry queue sequentially', (done) => {
    jest.spyOn(Math, 'random').mockReturnValue(0.8); // Force success
    
    const requestIds = ['req1', 'req2'];
    const results: any[] = [];
    
    processRetryQueue(requestIds).subscribe({
      next: (result) => results.push(result),
      complete: () => {
        expect(results).toHaveLength(2);
        expect(results.every(r => r.success)).toBe(true);
        done();
      }
    });
  }, 10000);

  it('should handle always failing requests', (done) => {
    retryWithBackoff(unreliableApiCall('always-fail')).subscribe({
      next: (result: any) => {
        expect(result.success).toBe(false);
        expect(result.error).toContain('failed after 3 retries');
        done();
      }
    });
  }, 15000);

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
