import { throttleScrollEvents } from './throttle-scroll-events';
import { Subscription } from 'rxjs';

describe('throttleScrollEvents', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    element.style.height = '100px';
    element.style.width = '100px';
    element.style.overflow = 'scroll';
    element.innerHTML = '<div style="height:1000px;width:1000px"></div>';
    document.body.appendChild(element);
  });

  afterEach(() => {
    if (element && document.body.contains(element)) {
      document.body.removeChild(element);
    }
  });

  it('should emit scroll positions at most once every 200ms', (done) => {
    const positions: any[] = [];
    const sub = throttleScrollEvents(element).subscribe(pos => {
      positions.push(pos);
    });
    // Simulate rapid scroll events
    for (let i = 0; i < 5; i++) {
      element.scrollTop = i * 10;
      element.dispatchEvent(new Event('scroll'));
    }
    setTimeout(() => {
      expect(positions.length).toBeLessThanOrEqual(2); // Should throttle
      sub.unsubscribe();
      done();
    }, 250);
  });

  it('should complete when element is removed from DOM', (done) => {
    const sub = throttleScrollEvents(element).subscribe({
      complete: () => {
        done();
      }
    });
    // Remove element and clear it from afterEach to avoid double removal
    document.body.removeChild(element);
    element = null as any;
  });
});
