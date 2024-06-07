import { SxProps } from '@mui/material';

import { EGameType, EScenarioType } from 'src/core/types/game';

export interface TScreen {
  videoUrl: string;
  finalSplashUrl: string;
}

export interface TScenario {
  id: EScenarioType;
  name?: string;
  selectButtonSx?: SxProps;
  screens: TScreen[];
}

export type TGame = {
  id: EGameType;
  name?: string;
  startVideoUrl: string;
  scenarios: TScenario[];
};
