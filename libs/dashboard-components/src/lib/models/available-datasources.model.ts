export const AvailableDataSources = {
  hoursWorked: 'hoursWorked',
  salesByPerson: 'salesByPerson',
  valueOverTime: 'valueOverTime',
} as const;

export type AvailableDataSources = keyof typeof AvailableDataSources;

export const AvailableDataSourcesOptions = [
  { description: 'Hours Worked', value: AvailableDataSources.hoursWorked },
  { description: 'Sales By Person', value: AvailableDataSources.salesByPerson },
  { description: 'Value Over Time', value: AvailableDataSources.valueOverTime },
] as const;
