import { combineLatestStreams } from './combine-latest-streams';
import { Subject } from 'rxjs';

describe('combineLatestStreams', () => {
  it('should combine the latest values from two streams', (done) => {
    const stream1$ = new Subject<number>();
    const stream2$ = new Subject<string>();
    const results: [number, string][] = [];

    combineLatestStreams(stream1$, stream2$).subscribe({
      next: (value) => results.push(value),
      complete: () => {
        expect(results).toEqual([
          [1, 'A'],
          [2, 'A'],
          [2, 'B'],
          [3, 'B'],
          [3, 'C'],
        ]);
        done();
      },
    });

    stream1$.next(1);
    setTimeout(() => stream2$.next('A'), 10);
    setTimeout(() => stream1$.next(2), 20);
    setTimeout(() => stream2$.next('B'), 30);
    setTimeout(() => stream1$.next(3), 40);
    setTimeout(() => stream2$.next('C'), 50);
    setTimeout(() => {
      stream1$.complete();
      stream2$.complete();
    }, 60);
  });

  it('should not emit if one stream is empty', (done) => {
    const stream1$ = new Subject<number>();
    const stream2$ = new Subject<string>();
    const results: [number, string][] = [];

    combineLatestStreams(stream1$, stream2$).subscribe({
      next: (value) => results.push(value),
      complete: () => {
        expect(results).toEqual([]);
        done();
      },
    });

    stream1$.next(1);
    stream1$.next(2);
    stream1$.complete();
    stream2$.complete();
  });

  it('should handle both streams being empty', (done) => {
    const stream1$ = new Subject<number>();
    const stream2$ = new Subject<string>();
    const results: [number, string][] = [];

    combineLatestStreams(stream1$, stream2$).subscribe({
      next: (value) => results.push(value),
      complete: () => {
        expect(results).toEqual([]);
        done();
      },
    });

    stream1$.complete();
    stream2$.complete();
  });

  it('should handle one stream completing after the other', (done) => {
    const stream1$ = new Subject<number>();
    const stream2$ = new Subject<string>();
    const results: [number, string][] = [];

    combineLatestStreams(stream1$, stream2$).subscribe({
      next: (value) => results.push(value),
      complete: () => {
        expect(results).toEqual([
          [1, 'A'],
          [2, 'A'],
          [2, 'B'],
          [2, 'C'],
        ]);
        done();
      },
    });

    stream1$.next(1);
    setTimeout(() => stream2$.next('A'), 10);
    setTimeout(() => stream1$.next(2), 20);
    setTimeout(() => stream1$.complete(), 25);
    setTimeout(() => stream2$.next('B'), 30);
    setTimeout(() => stream2$.next('C'), 40);
    setTimeout(() => stream2$.complete(), 50);
  });
});