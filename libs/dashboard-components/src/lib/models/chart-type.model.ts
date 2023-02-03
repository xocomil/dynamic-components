export const ChartType = {
  line: 'line',
  pie: 'pie',
  bar: 'bar',
} as const;

export type ChartType = keyof typeof ChartType;

export const ChartTypeOptions = [
  { description: 'Line', value: ChartType.line },
  { description: 'Pie', value: ChartType.pie },
  { description: 'Bar', value: ChartType.bar },
] as const;
