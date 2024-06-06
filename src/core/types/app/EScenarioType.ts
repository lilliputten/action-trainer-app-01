export enum EScenarioType {
  Natasha = 'natasha',
  Irina = 'irina',
}
export const scenarioTypes = [
  // prettier-ignore
  EScenarioType.Natasha,
  EScenarioType.Irina,
] as const;
export const defaultScenarioType = scenarioTypes[0];
