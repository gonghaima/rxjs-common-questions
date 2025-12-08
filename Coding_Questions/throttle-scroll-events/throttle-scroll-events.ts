import { Observable, fromEvent, interval } from 'rxjs';
import { throttleTime, map, filter, takeUntil } from 'rxjs/operators';

/**
 * Emits the scroll position of the element at most once every 200ms.
 * Completes when the element is removed from the DOM.
 */
export function throttleScrollEvents(element: HTMLElement): Observable<{ scrollTop: number; scrollLeft: number }> {
  const scroll$ = fromEvent(element, 'scroll').pipe(
    throttleTime(200),
    map(() => ({
      scrollTop: element.scrollTop,
      scrollLeft: element.scrollLeft,
    }))
  );

  // Observable that emits once when the element is removed from the DOM
  const removed$ = interval(500).pipe(
    filter(() => !document.body.contains(element)),
    // Only emit the first time the element is removed
    takeUntil(scroll$),
  );

  return scroll$.pipe(
    takeUntil(removed$)
  );
}
