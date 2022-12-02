export const ComponentTypes = Object.freeze({
  string: 'string',
} as const);

export type ComponentTypes = typeof ComponentTypes[keyof typeof ComponentTypes];
