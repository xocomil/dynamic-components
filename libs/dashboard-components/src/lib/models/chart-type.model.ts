export const ChartType = {
  line: 'line',
  pie: 'pie',
  bar: 'bar',
} as const;

export type ChartType = keyof typeof ChartType;
