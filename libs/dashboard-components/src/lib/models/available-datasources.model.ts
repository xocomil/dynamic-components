export const AvailableDataSources = {
  hoursWorked: 'hoursWorked',
  salesByPerson: 'salesByPerson',
  valueOverTime: 'valueOverTime',
} as const;

export type AvailableDataSources = keyof typeof AvailableDataSources;
