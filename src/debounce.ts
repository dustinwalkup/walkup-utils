/**
 * Creates a debounced version of the provided function, delaying its invocation
 * until after a specified `wait` time has elapsed since the last call.
 *
 * @template F - The signature of the function to debounce.
 *
 * @param fn
 *   The function to debounce. It may return any type, but the debounced wrapper
 *   always returns void.
 *
 * @param wait
 *   Number of milliseconds to wait after the last invocation before calling `fn`.
 *
 * @returns
 *   A function that, when called, resets its timer and invokes `fn` only once,
 *   `wait` ms after the final call. The debounced function accepts the same
 *   parameters as `fn`, and preserves its `this` context.
 *
 * @example
 * // Log the final window size 200 ms after resizing stops:
 * window.addEventListener(
 *   "resize",
 *   debounce(function () {
 *     console.log(`Size: ${this.innerWidth}×${this.innerHeight}`);
 *   }, 200)
 * );
 */
export function debounce<F extends (...args: unknown[]) => unknown>(
  fn: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, wait);
  };
}
