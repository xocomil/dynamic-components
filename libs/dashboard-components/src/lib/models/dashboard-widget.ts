import { z } from 'zod';
import { AvailableDataSources } from './available-datasources.model';
import { ChartType } from './chart-type.model';

export const dashboardWidgetParser = z.object({
  id: z.string(),
  title: z.string(),
  subTitle: z.optional(z.string()),
  chartType: z
    .union([z.literal('line'), z.literal('bar'), z.literal('pie')])
    .or(
      z
        .string()
        .optional()
        .transform(() => 'line' as const satisfies ChartType)
    ),
  dataSource: z
    .union([
      z.literal('hoursWorked'),
      z.literal('salesByPerson'),
      z.literal('valueOverTime'),
    ])
    .or(
      z
        .string()
        .optional()
        .transform(() => 'hoursWorked' as const satisfies AvailableDataSources)
    ),

  version: z.optional(z.string()),
});

export type DashboardWidget = z.infer<typeof dashboardWidgetParser>;
