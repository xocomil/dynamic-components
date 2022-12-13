export const ComponentTypes = Object.freeze({
  string: 'string',
  checkbox: 'checkbox',
} as const);

export type ComponentTypes = typeof ComponentTypes[keyof typeof ComponentTypes];
