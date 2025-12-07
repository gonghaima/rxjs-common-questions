import { bufferClickEvents } from './buffer-click-events';
import { Subject } from 'rxjs';

jest.useFakeTimers();

describe('bufferClickEvents', () => {
  it('should buffer click events and emit them every 1 second', () => {
    const click$ = new Subject<string>();
    const result: string[][] = [];
    bufferClickEvents(click$).subscribe(arr => result.push(arr));

    click$.next('click1');
    click$.next('click2');
    jest.advanceTimersByTime(1000);
    click$.next('click3');
    jest.advanceTimersByTime(1000);
    click$.next('click4');
    click$.next('click5');
    jest.advanceTimersByTime(1000);

    expect(result).toEqual([
      ['click1', 'click2'],
      ['click3'],
      ['click4', 'click5']
    ]);
  });

  it('should emit empty array if no clicks in a window', () => {
    const click$ = new Subject<string>();
    const result: string[][] = [];
    bufferClickEvents(click$).subscribe(arr => result.push(arr));

    jest.advanceTimersByTime(1000);
    click$.next('click1');
    jest.advanceTimersByTime(1000);

    expect(result).toEqual([
      [],
      ['click1']
    ]);
  });
});
