export enum EScenarioType {
  N = 'N',
  I = 'I',
}
export const scenarioTypes = [
  // prettier-ignore
  EScenarioType.N,
  EScenarioType.I,
] as const;
export const defaultScenarioType = scenarioTypes[0];
