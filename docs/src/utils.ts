export function omap<T extends unknown, U extends unknown>(object: Record<string, T>, callback: (value: T) => U) {
  const entries = Object.entries(object).map(([key, value]) => {
    return [key, callback(value)];
  });
  return Object.fromEntries(entries);
}
