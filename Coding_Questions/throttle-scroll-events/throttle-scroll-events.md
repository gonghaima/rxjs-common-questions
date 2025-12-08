# throttle-scroll-events

**Problem:**
Create an RxJS function that listens to scroll events on a given DOM element and emits the current scroll position, but throttles the emissions so that they occur at most once every 200 milliseconds. The function should return an Observable that emits objects of the form `{ scrollTop: number, scrollLeft: number }`.

**Requirements:**
- Use RxJS operators to throttle the scroll events.
- The Observable should complete when the element is removed from the DOM.
- Write a test file to verify the throttling behavior and completion.

**Example Usage:**
```ts
const scroll$ = throttleScrollEvents(someElement);
scroll$.subscribe(pos => {
  console.log(pos.scrollTop, pos.scrollLeft);
});
```
