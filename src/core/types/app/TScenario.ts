export enum EScenario {
  N = 'N',
  I = 'I',
}
export const scenarios = [
  // prettier-ignore
  EScenario.N,
  EScenario.I,
] as const;
export type TScenario = (typeof scenarios)[number];
