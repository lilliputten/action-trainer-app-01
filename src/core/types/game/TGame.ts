import { SxProps } from '@mui/material';

import { EGameType, EScenarioType } from 'src/core/types/game';

export type TScreen = unknown;

export interface TScenario {
  id: EScenarioType;
  name?: string;
  selectButtonSx?: SxProps;
  screens: TScreen[];
}

export type TGame = {
  id: EGameType;
  name?: string;
  scenarios: TScenario[];
};
