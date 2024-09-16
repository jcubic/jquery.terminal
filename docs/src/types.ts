export type StringSet<C extends string, V extends string = C> =
  '' | (C extends string ? `${C}${StringSet<Exclude<V, C>>}` : never)

export type FormatStyle = StringSet<'g' | 'b' | 'i' | 'u' | 's' | 'o' | 'r'>;
