import { SxProps } from '@mui/material';

import { vw } from 'src/core/helpers/styles';
import { EGameType, EScenarioType, TGame } from 'src/core/types';

const firstGameDefaultButtonSx: SxProps = {
  left: vw(4),
  top: vw(10),
  width: vw(45.5),
  height: vw(46),
};

export const gamesList: TGame[] = [
  {
    id: EGameType.First,
    scenarios: [
      {
        id: EScenarioType.Natasha,
        selectButtonSx: { ...firstGameDefaultButtonSx },
        screens: [
          {
            // ...
          },
        ],
      },
      {
        id: EScenarioType.Irina,
        selectButtonSx: { ...firstGameDefaultButtonSx, left: vw(50.5) },
        screens: [
          {
            // ...
          },
        ],
      },
    ],
  },
];

export const gamesHash = gamesList.reduce(
  (hash, game) => {
    hash[game.id] = game;
    return hash;
  },
  {} as Record<EGameType, TGame>,
);
