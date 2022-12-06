import { z } from 'zod';

export const formValidator = z.object({
  inputs: z.array(
    z.object({
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
    })
  ),
});

type ParsedFormData = z.infer<typeof formValidator>;
export type FormSettings = ParsedFormData['inputs'][0];
