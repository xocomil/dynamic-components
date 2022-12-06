import { z } from 'zod';

const textbox = z.object({
  inputType: z.literal('string'),
  formId: z.string(),
  required: z
    .boolean()
    .optional()
    .transform((value) => value ?? false),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  placeholder: z.string().min(3),
  label: z.string().min(3),
});

const checkbox = z.object({
  inputType: z.literal('checkbox'),
  formId: z.string(),
  label: z.string(),
});

export const formValidator = z.object({
  inputs: z.array(z.discriminatedUnion('inputType', [textbox, checkbox])),
});

type ParsedFormData = z.infer<typeof formValidator>;
export type FormSettings = ParsedFormData['inputs'][0];

export type TextboxSettings = z.infer<typeof textbox>;
export type CheckboxSettings = z.infer<typeof checkbox>;
