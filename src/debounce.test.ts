import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce';

describe('debounce()', () => {
  beforeEach(() => {
    // switch to fake timers so we can control setTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('delays invocation until after the wait period', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    // not called immediately
    expect(fn).not.toHaveBeenCalled();

    // advance just shy of wait
    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    // advance to complete wait
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets the timer if called again before wait is over', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(50);

    debounced();
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes the latest arguments through to the original function', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1, 'a');
    debounced(2, 'b');
    vi.advanceTimersByTime(100);

    // should only be called once, with the last args
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2, 'b');
  });

  it('preserves the original `this` context', () => {
    const ctx = { x: 123 };

    function original(this: typeof ctx) {
      // if this !== ctx, this assertion will fail
      expect(this).toBe(ctx);
    }

    const debounced = debounce(original, 100);
    debounced.call(ctx);
    vi.advanceTimersByTime(100);
  });
});
