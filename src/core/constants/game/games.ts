import { SxProps } from '@mui/material';

import { percent } from 'src/core/helpers/styles';
import { EGameType, EScenarioType, TGame } from 'src/core/types';

const defaultGameScenarioButtonSx: SxProps = {
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

/* // XXX: Conversion patterns:
 * '<,'>s/^.*r\.mp.*\n//
 * '<,'>s/\(.*\.mp4\)\n\(.*\.jpg\)/{\rvideoUrl: 'PATH\/\1',\rfinalSplashUrl: 'PATH\/\2',\r},/
 * '<,'>s/PATH/\/videos\/1c\/natasha/
 * '<,'>s/PATH/\/videos\/1c\/irina/
 */

export const gamesList: TGame[] = [
  {
    id: EGameType.First,
    startVideoUrl: '/videos/1c/1c-0-start.mp4',
    scenarios: [
      {
        id: EScenarioType.Natasha,
        selectButtonSx: { ...defaultGameScenarioButtonSx },
        screens: [
          {
            videoUrl: '/videos/1c/natasha/1c-1.mp4',
            finalSplashUrl: '/videos/1c/natasha/1c-1r.jpg',
          },
          {
            videoUrl: '/videos/1c/natasha/1c-2.mp4',
            finalSplashUrl: '/videos/1c/natasha/1c-2r.jpg',
          },
          {
            videoUrl: '/videos/1c/natasha/1c-3.mp4',
            finalSplashUrl: '/videos/1c/natasha/1c-3r.jpg',
          },
          {
            videoUrl: '/videos/1c/natasha/1c-4.mp4',
            finalSplashUrl: '/videos/1c/natasha/1c-4r.jpg',
          },
          {
            videoUrl: '/videos/1c/natasha/1c-5.mp4',
            finalSplashUrl: '/videos/1c/natasha/1c-5r.jpg',
          },
        ],
      },
      {
        id: EScenarioType.Irina,
        selectButtonSx: { ...defaultGameScenarioButtonSx, left: percent(50.7) },
        screens: [
          {
            videoUrl: '/videos/1c/irina/1c-10.mp4',
            finalSplashUrl: '/videos/1c/irina/1c-10r.jpg',
          },
          {
            videoUrl: '/videos/1c/irina/1c-6.mp4',
            finalSplashUrl: '/videos/1c/irina/1c-6r.jpg',
          },
          {
            videoUrl: '/videos/1c/irina/1c-7.mp4',
            finalSplashUrl: '/videos/1c/irina/1c-7r.jpg',
          },
          {
            videoUrl: '/videos/1c/irina/1c-8.mp4',
            finalSplashUrl: '/videos/1c/irina/1c-8r.jpg',
          },
          {
            videoUrl: '/videos/1c/irina/1c-9.mp4',
            finalSplashUrl: '/videos/1c/irina/1c-9r.jpg',
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
