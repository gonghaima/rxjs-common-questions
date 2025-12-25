import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { distinctUntilChangedStream } from './distinct-until-changed-stream';

describe('distinctUntilChangedStream', () => {
  it('should emit only when value changes (numbers)', (done) => {
    const input$ = of(1, 1, 2, 2, 3, 1);
    const result: number[] = [];
    distinctUntilChangedStream(input$)
      .pipe(toArray())
      .subscribe({
        next: (values) => result.push(...values),
        complete: () => {
          expect(result).toEqual([1, 2, 3, 1]);
          done();
        },
      });
  });

  it('should emit only when value changes (strings)', (done) => {
    const input$ = of('a', 'a', 'b', 'b', 'a', 'c', 'c');
    const result: string[] = [];
    distinctUntilChangedStream(input$)
      .pipe(toArray())
      .subscribe({
        next: (values) => result.push(...values),
        complete: () => {
          expect(result).toEqual(['a', 'b', 'a', 'c']);
          done();
        },
      });
  });

  it('should work with empty input', (done) => {
    const input$ = of();
    const result: any[] = [];
    distinctUntilChangedStream(input$)
      .pipe(toArray())
      .subscribe({
        next: (values) => result.push(...values),
        complete: () => {
          expect(result).toEqual([]);
          done();
        },
      });
  });

  it('should work with objects using reference equality', (done) => {
    const a = { x: 1 };
    const b = { x: 1 };
    const input$ = of(a, a, b, b, a);
    const result: object[] = [];
    distinctUntilChangedStream(input$)
      .pipe(toArray())
      .subscribe({
        next: (values) => result.push(...values),
        complete: () => {
          expect(result).toEqual([a, b, a]);
          done();
        },
      });
  });
});
