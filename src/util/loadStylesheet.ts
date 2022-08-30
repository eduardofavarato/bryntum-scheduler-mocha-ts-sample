export function loadStylesheet<T = unknown>(func: () => T): T {
  return func();
}
