import { SxProps } from '@mui/material';

import { percent } from 'src/core/helpers/styles';
import { EGameType, EScenarioType, TGame } from 'src/core/types';

const firstGameDefaultButtonSx: SxProps = {
  /* // UNUSED: Relative, based on screen width
   * left: vw(4),
   * top: vw(10),
   * width: vw(45.5),
   * height: vw(46),
   */
  left: percent(4.5),
  top: percent(18),
  width: percent(44.5),
  height: percent(80.5),
  borderRadius: percent(12),
  borderWidth: percent(5),
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
        selectButtonSx: { ...firstGameDefaultButtonSx, left: percent(50.7) },
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
