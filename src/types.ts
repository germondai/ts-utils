/** Flatten intersections for readable hover types */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

/** Recursive Partial — makes all properties optional at every depth */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

/** Recursive Required — makes all properties required at every depth */
export type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K]
}

/** Recursive Readonly — makes all properties readonly at every depth */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

/** Makes a type nullable */
export type Nullable<T> = T | null

/** Makes a type nullable or undefined */
export type Maybe<T> = T | null | undefined

/** Recursively removes null and undefined from all properties */
export type NonNullableDeep<T> = {
  [K in keyof T]: T[K] extends object
    ? NonNullableDeep<NonNullable<T[K]>>
    : NonNullable<T[K]>
}

/** Omit that enforces K extends keyof T */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>

/** Extract that enforces U extends T */
export type StrictExtract<T, U extends T> = Extract<T, U>

/** Get the union of all property value types */
export type ValueOf<T> = T[keyof T]

/** Typed Object.entries return type */
export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

/** Convert a union type to an intersection type */
export type UnionToIntersection<U> = (
  U extends any ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never

/** Require at least one of the specified keys */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Omit<
  T,
  Keys
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

/** Require exactly one of the specified keys */
export type RequireExactlyOne<T, Keys extends keyof T = keyof T> = Omit<
  T,
  Keys
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

/** Remove readonly from all properties */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

/** Make specific keys optional */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/** Make specific keys required */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
