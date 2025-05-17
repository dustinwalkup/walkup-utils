/**
 * A successful result wrapping the resolved data
 */
export type Success<T> = {
  data: T;
  error: null;
};

/**
 * A failure result wrapping the caught error
 */
export type Failure<E> = {
  data: null;
  error: E;
};

/**
 * The discriminated union Result<T,E>
 * – either a Success<T> or a Failure<E> (defaults to Error)
 */
export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Wraps any promise and returns a Result<T,E> instead of throwing.
 * @param promise A Promise that resolves to T
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
