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

const defaultAnswerSx: SxProps = {
  borderRadius: '4vmax',
  // borderWidth: '1vmax',
  top: percent(76),
  height: percent(16),
  left: percent(1),
  width: percent(48),
};

const defaultRightAnswerSx: SxProps = {
  ...defaultAnswerSx,
  left: percent(51),
};

/* // XXX: Conversion patterns:
 *
 * // Urls:
 *
 * '<,'>s/^.*r\.mp.*\n//
 * '<,'>s/\(.*\.mp4\)\n\(.*\.jpg\)/{\rvideoUrl: 'PATH\/\1',\rfinalSplashUrl: 'PATH\/\2',\r},/
 * '<,'>s/PATH/\/videos\/1c\/natasha/
 * '<,'>s/PATH/\/videos\/1c\/irina/
 *
 * // Answer patterns:
 *
 * '<,'>s/\s*\(\S.\+\)/{ text: '\1', buttonSx: { ...defaultAnswerSx } },/ | '<,'>s/text: '+/isCorrect: true, text: '/
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
            answers: [
              {
                isCorrect: true,
                text: 'Повышенное давление',
                buttonSx: {
                  ...defaultAnswerSx,
                  left: percent(0.2),
                  width: percent(46.2),
                },
              },
              {
                text: 'Это норма для беременных',
                buttonSx: {
                  ...defaultRightAnswerSx,
                  left: percent(45.7),
                  width: percent(53.5),
                },
              },
            ],
            finalComment:
              'Это типичные проявления повышенного давления. А еще иногда артериальное давление повышается, а головной боли нет. Это очень опасно. Важно мерить его регулярно.',
          },
          {
            videoUrl: '/videos/1c/natasha/1c-2.mp4',
            finalSplashUrl: '/videos/1c/natasha/1c-2r.jpg',
            answers: [
              { text: 'Сказать врачу на плановом приеме', buttonSx: { ...defaultAnswerSx } },
              { isCorrect: true, text: 'Вызвать скорую', buttonSx: { ...defaultAnswerSx } },
            ],
          },
          {
            videoUrl: '/videos/1c/natasha/1c-3.mp4',
            finalSplashUrl: '/videos/1c/natasha/1c-3r.jpg',
            answers: [
              { text: 'Поесть', buttonSx: { ...defaultAnswerSx } },
              { isCorrect: true, text: 'Измерить давление', buttonSx: { ...defaultAnswerSx } },
            ],
          },
          {
            videoUrl: '/videos/1c/natasha/1c-4.mp4',
            finalSplashUrl: '/videos/1c/natasha/1c-4r.jpg',
            answers: [
              { text: 'Да, можно мерить давление', buttonSx: { ...defaultAnswerSx } },
              { isCorrect: true, text: 'Нет, есть ошибка', buttonSx: { ...defaultAnswerSx } },
            ],
          },
          {
            videoUrl: '/videos/1c/natasha/1c-5.mp4',
            finalSplashUrl: '/videos/1c/natasha/1c-5r.jpg',
            answers: [
              { isCorrect: true, text: 'Давление в норме', buttonSx: { ...defaultAnswerSx } },
              { text: 'Это нормальное высокое давление', buttonSx: { ...defaultAnswerSx } },
              { text: 'Это высокое артериальное давление', buttonSx: { ...defaultAnswerSx } },
            ],
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
            answers: [
              { text: 'Ирина права', buttonSx: { ...defaultAnswerSx } },
              { isCorrect: true, text: ' Ирина не права', buttonSx: { ...defaultAnswerSx } },
            ],
          },
          {
            videoUrl: '/videos/1c/irina/1c-6.mp4',
            finalSplashUrl: '/videos/1c/irina/1c-6r.jpg',
            answers: [
              { isCorrect: true, text: 'Пульс слишком частый', buttonSx: { ...defaultAnswerSx } },
              { text: 'Пульс редкий', buttonSx: { ...defaultAnswerSx } },
            ],
          },
          {
            videoUrl: '/videos/1c/irina/1c-7.mp4',
            finalSplashUrl: '/videos/1c/irina/1c-7r.jpg',
            answers: [
              { text: 'Показатели в норме', buttonSx: { ...defaultAnswerSx } },
              {
                isCorrect: true,
                text: 'Есть отклонение от нормы',
                buttonSx: { ...defaultAnswerSx },
              },
            ],
          },
          {
            videoUrl: '/videos/1c/irina/1c-8.mp4',
            finalSplashUrl: '/videos/1c/irina/1c-8r.jpg',
            answers: [
              { text: 'Да, это целесообразно', buttonSx: { ...defaultAnswerSx } },
              {
                isCorrect: true,
                text: 'Нет, это не имеет смысла',
                buttonSx: { ...defaultAnswerSx },
              },
            ],
          },
          {
            videoUrl: '/videos/1c/irina/1c-9.mp4',
            finalSplashUrl: '/videos/1c/irina/1c-9r.jpg',
            answers: [
              { text: 'Да, нужно срочно вызывать врача', buttonSx: { ...defaultAnswerSx } },
              { isCorrect: true, text: 'Нет, скорая не нужна', buttonSx: { ...defaultAnswerSx } },
            ],
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
