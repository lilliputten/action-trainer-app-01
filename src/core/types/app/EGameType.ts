export enum EGameType {
  First = 'first',
}
export const gameTypes = [
  // prettier-ignore
  EGameType.First,
] as const;
// export type EGameType = (typeof games)[number];
export const defaultGameType = gameTypes[0];
