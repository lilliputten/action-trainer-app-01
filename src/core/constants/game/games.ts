import { SxProps } from '@mui/material';

import { percent, px } from 'src/core/helpers/styles';
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
  borderWidth: px(10),
};

const defaultAnswerSx: SxProps = {
  // borderRadius: '4vmax',
  borderRadius: percent(20),
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

const thirdGameLeftButtonSx = {
  ...defaultAnswerSx,
  top: percent(77.5),
  height: percent(14),
  left: percent(7.5),
  width: percent(41),
};

const thirdGameRightButtonSx = {
  ...defaultRightAnswerSx,
  //
  top: percent(77.5),
  height: percent(14),
  left: percent(51.2),
  width: percent(41),
};

/* // XXX: Conversion patterns:
 *
 * // Urls:
 *
 * '<,'>s/^.*r\.mp.*\n//
 * '<,'>s/\(.*\.mp4\)\n\(.*\.jpg\)/{\rvideoUrl: 'PATH\/\1',\r// finalSplashUrl: 'PATH\/\2',\r},/
 * '<,'>s/PATH/\/videos\/1c\/natasha/
 * '<,'>s/PATH/\/videos\/1c\/irina/
 *
 * // Answer patterns:
 *
 * '<,'>s/\s*\(\S.\+\)/{ text: '\1', buttonSx: { ...defaultAnswerSx } },/ | '<,'>s/isCorrect: true, text: '/isCorrect: true, text: '/
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
            // finalSplashUrl: '/videos/1c/natasha/1c-1r.jpg',
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
            // finalSplashUrl: '/videos/1c/natasha/1c-2r.jpg',
            finalComment:
              'Если давление выше 140/90, нужно вызывать скорую. Иначе такое состояние  негативно скажется на беременности.',
            answers: [
              {
                text: 'Сказать врачу на плановом приеме',
                buttonSx: {
                  ...defaultAnswerSx,
                  left: percent(3.5),
                  width: percent(46.2),
                  top: percent(72),
                  height: percent(24),
                  // borderRadius: percent(20),
                },
              },
              {
                isCorrect: true,
                text: 'Вызвать скорую',
                buttonSx: {
                  ...defaultRightAnswerSx,
                  left: percent(50.2),
                  width: percent(46.2),
                  top: percent(72),
                  height: percent(24),
                },
              },
            ],
          },
          {
            videoUrl: '/videos/1c/natasha/1c-3.mp4',
            // finalSplashUrl: '/videos/1c/natasha/1c-3r.jpg',
            finalComment:
              'Так как после приема пищи давление можно измерять только через 1-2 часа, по утрам первым делом лучше измерить давление. Чтобы не забыть об этом и сэкономить время, положите тонометр рядом с кроватью. Так вы сможете измерять давление сразу после пробуждения.',
            answers: [
              {
                text: 'Поесть',
                buttonSx: {
                  ...defaultAnswerSx,
                  left: percent(11),
                  width: percent(28.7),
                },
              },
              {
                isCorrect: true,
                text: 'Измерить давление',
                buttonSx: {
                  ...defaultRightAnswerSx,
                  left: percent(47),
                  width: percent(42),
                },
              },
            ],
          },
          {
            videoUrl: '/videos/1c/natasha/1c-4.mp4',
            // finalSplashUrl: '/videos/1c/natasha/1c-4r.jpg',
            finalComment: 'Перед измерением давления убирайте одежду с выбранной руки.',
            answers: [
              {
                text: 'Да, можно мерить давление',
                buttonSx: { ...defaultAnswerSx, left: percent(5.5), width: percent(53) },
              },
              {
                isCorrect: true,
                text: 'Нет, есть ошибка',
                buttonSx: { ...defaultAnswerSx, left: percent(60.5), width: percent(36) },
              },
            ],
          },
          {
            videoUrl: '/videos/1c/natasha/1c-5.mp4',
            // finalSplashUrl: '/videos/1c/natasha/1c-5r.jpg',
            finalComment:
              'При беременности нормальным считается давление до 130/85 мм рт. ст. Это стандартная норма, но у вас может быть другая. Проконсультируйтесь с врачом. Даже незначительное повышение относительно вашего обычного показателя на 10 мм рт. ст. требует внимания.',
            answers: [
              {
                isCorrect: true,
                text: 'Давление в норме',
                buttonSx: {
                  ...defaultAnswerSx,
                  borderRadius: '2vmax',
                  top: percent(73),
                  height: percent(22),
                  left: percent(0),
                  width: percent(20.6),
                },
              },
              {
                text: 'Это нормальное высокое давление',
                buttonSx: {
                  ...defaultAnswerSx,
                  borderRadius: '2vmax',
                  top: percent(73),
                  height: percent(22),
                  left: percent(20.3),
                  width: percent(35),
                },
              },
              {
                text: 'Это высокое артериальное давление',
                buttonSx: {
                  ...defaultAnswerSx,
                  borderRadius: '2vmax',
                  top: percent(73),
                  height: percent(22),
                  left: percent(54.9),
                  width: percent(45),
                },
              },
            ],
          },
        ],
      },
      {
        id: EScenarioType.Irina,
        selectButtonSx: { ...defaultGameScenarioButtonSx, left: percent(50.7) },
        screens: [
          {
            videoUrl: '/videos/1c/irina/1c-6.mp4',
            finalComment:
              'Повышение давления относительно обычного показателя даже на 10 мм рт. ст. требует внимания. Надо сообщить об этом врачу. Нужно ли это сделать срочно или ждет до планового визита, разберем на последнем уроке курса.',
            answers: [
              {
                text: 'Ирина права',
                buttonSx: {
                  ...defaultAnswerSx,
                  left: percent(6.5),
                  width: percent(42.5),
                },
              },
              {
                isCorrect: true,
                text: 'Ирина не права',
                buttonSx: {
                  ...defaultAnswerSx,
                  left: percent(50.7),
                  width: percent(42.5),
                },
              },
            ],
          },
          {
            videoUrl: '/videos/1c/irina/1c-7.mp4',
            finalComment:
              'Во время беременности пульс в норме увеличивается, однако он не должен превышать 100 ударов в минуту в состоянии покоя. Если пульс превышает этот показатель, нужно обратиться к врачу для дополнительного обследования.',
            answers: [
              {
                text: 'ЧСС в норме',
                buttonSx: {
                  ...defaultAnswerSx,
                  top: percent(73),
                  height: percent(22),
                  left: percent(0.5),
                  width: percent(28.5),
                },
              },
              {
                isCorrect: true,
                text: 'Пульс слишком частый',
                buttonSx: {
                  ...defaultAnswerSx,
                  top: percent(73),
                  height: percent(22),
                  left: percent(29.2),
                  width: percent(35),
                },
              },
              {
                text: 'Пульс редкий',
                buttonSx: {
                  ...defaultAnswerSx,
                  top: percent(73),
                  height: percent(22),
                  left: percent(64.5),
                  width: percent(35),
                },
              },
            ],
          },
          {
            videoUrl: '/videos/1c/irina/1c-8.mp4',
            finalComment:
              'У Ирины повышенное давление относительно ее обычного показателя 100/60, а также 01.06.2024 высокий пульс вечером. Нужно обсудить с врачом',
            answers: [
              {
                text: 'Показатели в норме',
                buttonSx: {
                  ...defaultAnswerSx,
                  left: percent(2),
                  width: percent(41.5),
                },
              },
              {
                isCorrect: true,
                text: 'Есть отклонение от нормы',
                buttonSx: {
                  ...defaultAnswerSx,
                  left: percent(47),
                  width: percent(50.5),
                },
              },
            ],
          },
          {
            videoUrl: '/videos/1c/irina/1c-9.mp4',
            finalComment:
              'В норме давление в течение дня может колебаться существенно. Оно зависит от физической активности. Целесообразно измерять давление два раза в день: утром и вечером. В это время организм находится в состоянии покоя.',
            answers: [
              {
                text: 'Да, это целесообразно',
                buttonSx: {
                  ...defaultAnswerSx,
                  left: percent(3.5),
                  width: percent(44.5),
                },
              },
              {
                isCorrect: true,
                text: 'Нет, это не имеет смысла',
                buttonSx: { ...defaultAnswerSx, left: percent(48.5), width: percent(48) },
              },
            ],
          },
          {
            videoUrl: '/videos/1c/irina/1c-10.mp4',
            finalComment:
              'Легкая отечность ног это частое явление при беременности. Оно не требует срочной медицинской помощи, но врачу на приеме сказать нужно.',
            answers: [
              {
                text: 'Да, нужно срочно вызывать врача',
                buttonSx: {
                  ...defaultAnswerSx,
                  top: percent(73.5),
                  height: percent(22),
                  left: percent(3.5),
                  width: percent(45.5),
                },
              },
              {
                isCorrect: true,
                text: 'Нет, скорая не нужна',
                buttonSx: {
                  ...defaultAnswerSx,
                  top: percent(73.5),
                  height: percent(22),
                  left: percent(50.5),
                  width: percent(45.5),
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: EGameType.Third,
    startVideoUrl: '/videos/3c/3c-0-start.mp4',
    scenarios: [
      {
        id: EScenarioType.Natasha,
        selectButtonSx: { ...defaultGameScenarioButtonSx },
        screens: [
          // Сюжет, если выбрали Наташу
          {
            // 1. Наташа (покраснела) говорит: «Ой, температура повысилась.» Показывает градусник: на нем 37,6. Дальше думает: “Не страшно… Бывает.”
            videoUrl: '/videos/3c/natasha/3c-natasha-1.mp4',
            answers: [
              {
                isCorrect: true,
                text: 'Опасно',
                buttonSx: {
                  ...thirdGameLeftButtonSx,
                },
              },
              {
                text: 'Не опасно',
                buttonSx: {
                  ...thirdGameRightButtonSx,
                },
              },
            ],
            finalComment: 'Тревожный сигнал, если температура выше 37,5°С.',
          },
          {
            // 2. Несчастная Наташа говорит: «Токсикоз... Тошнит. Позавтракала, а на обед только бутерброд съела. Хорошо, хоть голова не кружится. К семинару могу подготовиться.»
            videoUrl: '/videos/3c/natasha/3c-natasha-2.mp4',
            answers: [
              {
                text: 'Опасно',
                buttonSx: {
                  ...thirdGameLeftButtonSx,
                },
              },
              {
                isCorrect: true,
                text: 'Не опасно',
                buttonSx: {
                  ...thirdGameRightButtonSx,
                },
              },
            ],
            finalComment:
              'Если в течение дня вы можете есть и пить, пусть чуть меньше нормы, это не повод беспокоиться. Тем более, если вас не рвет постоянно и нет синдромов обезвоживания.',
          },
          {
            // 3. Еще более несчастная Наташа: «Ну это кошмар какой-то. Постоянно рвет сегодня весь день. Сегодня не ела. И даже пить уже не могу. Голова кружится и во рту все пересохло.»
            videoUrl: '/videos/3c/natasha/3c-natasha-3.mp4',
            answers: [
              {
                isCorrect: true,
                text: 'Опасно',
                buttonSx: {
                  ...thirdGameLeftButtonSx,
                },
              },
              {
                text: 'Не опасно',
                buttonSx: {
                  ...thirdGameRightButtonSx,
                },
              },
            ],
            finalComment:
              'Опасно, когда вы не можете есть и пить в течение целого дня. И появляются симптомы обезвоживания: жажда, сухость кожи и слизистых, слабость, головокружение. Также тревожный симптом, если вы теряете более 5% массы тела за один-два дня.',
          },
          {
            // 4. Озадаченная Наташа: «Ой, что-то месячные начались. Говорят, если маленький срок, бывает такое.»
            videoUrl: '/videos/3c/natasha/3c-natasha-4.mp4',
            answers: [
              {
                isCorrect: true,
                text: 'Опасно',
                buttonSx: {
                  ...thirdGameLeftButtonSx,
                },
              },
              {
                text: 'Не опасно',
                buttonSx: {
                  ...thirdGameRightButtonSx,
                },
              },
            ],
            finalComment:
              'Кровянистые выделения из половых путей любой интенсивности это тревожный симптом. Может быть угроза выкидыша.',
          },
          {
            // 5. Наташа страдает от боли: «Ну что так спина разболелась? В пояснице, и как будто заболит сильно, а потом отпустит. Никогда такого не было. Пойду полежу»
            videoUrl: '/videos/3c/natasha/3c-natasha-5.mp4',
            answers: [
              {
                isCorrect: true,
                text: 'Опасно',
                buttonSx: {
                  ...thirdGameLeftButtonSx,
                },
              },
              {
                text: 'Не опасно',
                buttonSx: {
                  ...thirdGameRightButtonSx,
                },
              },
            ],
            finalComment:
              'Сильные схваткообразные боли внизу живота или в области поясницы повод вызвать скорую.',
          },
        ],
      },
      {
        id: EScenarioType.Irina,
        selectButtonSx: { ...defaultGameScenarioButtonSx, left: percent(50.7) },
        screens: [
          // Сюжет, если выбрали Ирину
          {
            // 1.  Ирина озадачена: «Обычно у меня давление 100/60. А сейчас 120/65.»
            videoUrl: '/videos/3c/irina/3c-irina-1.mp4',
            answers: [
              {
                isCorrect: true,
                text: 'Опасно',
                buttonSx: {
                  ...thirdGameLeftButtonSx,
                },
              },
              {
                text: 'Не опасно',
                buttonSx: {
                  ...thirdGameRightButtonSx,
                },
              },
            ],
            finalComment:
              'Повышение давления даже больше чем на 10 мм рт. ст. по сравнению с обычным во время беременности тревожный сигнал. Нужно экстренно связаться с врачом или вызвать скорую.',
          },
          {
            // 2. Ирина расстроена: «Что-то цвет мочи сегодня другой, темный. И больно было в туалет ходить.»
            videoUrl: '/videos/3c/irina/3c-irina-2.mp4',
            answers: [
              {
                isCorrect: true,
                text: 'Опасно',
                buttonSx: {
                  ...thirdGameLeftButtonSx,
                },
              },
              {
                text: 'Не опасно',
                buttonSx: {
                  ...thirdGameRightButtonSx,
                },
              },
            ],
            finalComment:
              'Болезненное мочеиспускание и изменение цвета мочи на темный, примесь крови опасный симптом.',
          },
          {
            // 3. Ирина страдает от боли: «Спина болит. Может, это грыжа опять, а может и нет. Но болит как обычно – тянет немного, боль одинаковая все время.»
            videoUrl: '/videos/3c/irina/3c-irina-3.mp4',
            answers: [
              {
                text: 'Опасно',
                buttonSx: {
                  ...thirdGameLeftButtonSx,
                },
              },
              {
                isCorrect: true,
                text: 'Не опасно',
                buttonSx: {
                  ...thirdGameRightButtonSx,
                },
              },
            ],
            finalComment:
              'Опасны сильные схваткообразные боли внизу живота или в области поясницы. В случае Ирины это не опасно, но обязательно нужно сказать врачу на плановом приеме.',
          },
          {
            // 4. Ирина озадаченно: «Ой, как я сильно отекла сегодня. Никогда такого не было. Становится хуже, и правая нога явно больше левой.»
            videoUrl: '/videos/3c/irina/3c-irina-4.mp4',
            answers: [
              {
                isCorrect: true,
                text: 'Опасно',
                buttonSx: {
                  ...thirdGameLeftButtonSx,
                },
              },
              {
                text: 'Не опасно',
                buttonSx: {
                  ...thirdGameRightButtonSx,
                },
              },
            ],
            finalComment:
              'Выраженные отеки ног, пальцев рук. Особенно – если они появились резко, нарастают, а также есть выраженная асимметрия в расположении отеков это опасно. Надо или звонить врачу или вызывать скорую.',
          },
          {
            // 5. Ирина в расслабленном состоянии: «Голова кружится и как будто «мушки» поплыли.»
            videoUrl: '/videos/3c/irina/3c-irina-5.mp4',
            answers: [
              {
                isCorrect: true,
                text: 'Опасно',
                buttonSx: {
                  ...thirdGameLeftButtonSx,
                },
              },
              {
                text: 'Не опасно',
                buttonSx: {
                  ...thirdGameRightButtonSx,
                },
              },
            ],
            finalComment:
              'Головная боль, головокружение, нечеткое зрение, появление «мушек» перед глазами – это тревожные симптомы.',
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
