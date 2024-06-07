import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Box, ButtonBase, Stack } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

import { isDev } from 'src/core/constants/config';
import { showError } from 'src/ui/Basic';
import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';
import { useScreenData } from 'src/core/hooks/routes';
import { px } from 'src/core/helpers/styles';
import { getVideoSizeByRef } from 'src/core/helpers/video';
import { useContainerSize } from 'src/ui/hooks';
import { animationTime, effectTime } from 'src/core/assets/scss';
import { getNextScreenRoute } from 'src/core/helpers/routes';

import styles from './GameScreenPage.module.scss';

// const doDebug = isDev && false;
const testingAnswerLayouts = isDev && false;

export function GameScreenPage() {
  // Eg page url: /game/first/irina/1
  const navigate = useNavigate();
  // Get game data...
  const {
    // prettier-ignore
    gameId,
    scenarioId,
    screenNo,
    // gameData,
    scenarioData,
    screenData,
  } = useScreenData();
  /** Get screen data... */
  const {
    // prettier-ignore
    videoUrl,
    // finalSplashUrl,
    answers,
    finalComment,
  } = screenData;
  const answersCount = Array.isArray(answers) ? answers.length : 0;
  const hasAnswers = !!answersCount;
  const screensCount = scenarioData.screens.length;
  const isLastScreen = screenNo === screensCount;
  // Initialize video ref (to update geometry)...
  const {
    ref: refVideo,
    width: videoContainerWidth,
    height: videoContainerHeight,
  } = useContainerSize<HTMLVideoElement>();
  const refBox = React.useRef<HTMLDivElement>(null);
  const updateBoxGeometry = React.useCallback(() => {
    const box = refBox.current;
    if (box) {
      const { width, height } = getVideoSizeByRef(refVideo);
      /* console.log('[updateBoxGeometry]', {
       *   width,
       *   height,
       *   box,
       * });
       */
      if (width && height) {
        box.style.width = px(width);
        box.style.height = px(height);
      }
    }
  }, [refVideo, refBox]);
  React.useEffect(updateBoxGeometry, [
    videoContainerWidth,
    videoContainerHeight,
    refVideo,
    updateBoxGeometry,
  ]);
  /** Video has already played */
  const [videoComplete, setVideoComplete] = React.useState(false);
  /** After video effect has finished */
  const [videoEffectComplete, setVideoEffectComplete] = React.useState(false);
  const [isCanPlay, setCanPlay] = React.useState(false);
  const [isActive, setActive] = React.useState(false);
  const [isFinished, setFinished] = React.useState(false);
  /** Answer */
  const [answerIdx, setAnswerNo] = React.useState<number | undefined>();
  const isAnswered = videoComplete && (!hasAnswers || answerIdx !== undefined);
  // Update all inital states...
  React.useEffect(() => {
    console.log('[GameScreenPage] init active', {
      gameId,
      scenarioId,
      screenNo,
    });
    setVideoComplete(false);
    setVideoEffectComplete(false);
    setActive(false);
    setAnswerNo(undefined);
    setFinished(false);
  }, [gameId, scenarioId, screenNo]);
  const enableCanPlay = React.useCallback(() => setCanPlay(true), []);
  // Start video handler...
  const startVideoPlay = React.useCallback(() => {
    const video = refVideo.current;
    if (video) {
      /* console.log('[GameScreenPage] startVideoPlay', {
       *   video,
       *   testingAnswerLayouts,
       * });
       */
      if (!testingAnswerLayouts) {
        video.play();
      }
      updateBoxGeometry();
    }
  }, [refVideo, updateBoxGeometry]);
  // Start and initialize video with a delay...
  React.useEffect(() => {
    /* console.log('[GameScreenPage] Start and initialize video with a delay', {
     *   isActive,
     *   refVideo,
     *   startVideoPlay,
     *   gameId,
     *   scenarioId,
     *   screenNo,
     * });
     */
    setTimeout(() => {
      setActive(true);
    }, animationTime);
    if (isCanPlay) {
      setTimeout(startVideoPlay, effectTime);
    }
  }, [refVideo, startVideoPlay, gameId, scenarioId, screenNo, isCanPlay, isActive]);
  // Set -can play- status...
  React.useEffect(() => {
    const video = refVideo.current;
    /* console.log('[GameScreenPage] Set -can play- status 2', {
     *   video,
     *   refVideo,
     * });
     */
    if (video) {
      video.addEventListener('canplay', enableCanPlay);
      return () => {
        video?.removeEventListener('canplay', enableCanPlay);
      };
    }
  }, [refVideo, enableCanPlay]);
  const handleVideoEnd = React.useCallback(() => {
    setVideoComplete(true);
    setTimeout(() => {
      setVideoEffectComplete(true);
    }, effectTime);
  }, []);
  const handleVideoError = React.useCallback((error: unknown) => {
    // eslint-disable-next-line no-console
    console.error('[GameScreenPage:handleVideoError]', {
      error,
    });
    showError('Ошибка показа видео');
  }, []);
  /** Final action */
  const handleUserChoice = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const answerIdx = Number(event.currentTarget.id);
      setAnswerNo(answerIdx);
    },
    [],
  );
  const handleFinished = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    // TODO: Check for the last screen?
    const nextScreenRoute = isLastScreen
      ? // TODO: Use final screen
        `/game/${gameId}/finished`
      : getNextScreenRoute(gameId, scenarioId, screenNo, true);
    /* console.log('[GameScreenPage:handleUserChoice]', {
     *   answerIdx,
     *   nextScreenRoute,
     * });
     */
    setAnswerNo(answerIdx);
    setFinished(true);
    // TODO: Store an answer to the store for further analization?
    setTimeout(() => {
      navigate(nextScreenRoute);
    }, effectTime);
  }, [navigate, answerIdx, gameId, scenarioId, screenNo, isLastScreen]);
  // Generate action buttons using `handleUserChoice`
  const answerButtons = React.useMemo(() => {
    return answers?.map((item, idx) => {
      const { text, isCorrect, buttonSx } = item;
      const key = ['answer-button', scenarioId, idx].join('-');
      const isSelected = answerIdx === idx;
      return (
        <ButtonBase
          key={key}
          id={String(idx)}
          className={classNames(
            styles.button,
            isSelected && styles.selected,
            isAnswered && isCorrect && styles.correct,
          )}
          onClick={handleUserChoice}
          sx={buttonSx}
          title={text}
        ></ButtonBase>
      );
    });
  }, [answerIdx, answers, handleUserChoice, scenarioId, isAnswered]);
  /* React.useEffect(() => {
   *   // const video = refVideo.current;
   *   console.log('[GameScreenPage:DEBUG]', {
   *     isCanPlay,
   *     isActive,
   *     isAnswered,
   *     isFinished,
   *     answerIdx,
   *     // refVideo,
   *   });
   * }, [
   *   // prettier-ignore
   *   isCanPlay,
   *   isActive,
   *   isAnswered,
   *   isFinished,
   *   answerIdx,
   *   // refVideo,
   * ]);
   */
  const finalButtonText = isLastScreen ? 'Завершить' : 'Дальше';
  return (
    <ScreenWrapper
      className={classNames(
        styles.root,
        videoComplete && styles.videoComplete,
        videoEffectComplete && styles.videoEffectComplete,
        isFinished && styles.finished,
        isAnswered && styles.answered,
        isActive && !isFinished && styles.active,
      )}
    >
      <video
        key={['video', gameId, scenarioId, screenNo].join('-')}
        src={videoUrl}
        className={styles.video}
        preload="auto"
        onEnded={handleVideoEnd}
        onError={handleVideoError}
        ref={refVideo}
        // controls
        // autoPlay
        muted
      ></video>
      <Box className={classNames(styles.overContainer)}>
        <Box
          key={['overBox', gameId, scenarioId, screenNo].join('-')}
          ref={refBox}
          className={classNames(styles.overBox)}
        >
          <Box className={classNames(styles.overButtons)}>
            {/* Answer buttons */}
            {answerButtons}
          </Box>
          <Stack
            className={classNames(styles.overFinalComment)}
            sx={{
              width: '90%',
            }}
          >
            {isAnswered && (
              <>
                <Box
                  // prettier-ignore
                  className={classNames(styles.finalComment)}
                  sx={{
                    fontSize: '3vmin',
                    textAlign: 'center',
                    lineHeight: 1.4,
                  }}
                >
                  {finalComment}
                </Box>
                <ButtonBase
                  className={classNames(styles.finalButton)}
                  title={finalButtonText}
                  onClick={handleFinished}
                >
                  {finalButtonText}
                  <PlayArrow />
                </ButtonBase>
              </>
            )}
          </Stack>
          {/* */}
        </Box>
      </Box>
      <Box className={classNames(styles.curtain)}></Box>
    </ScreenWrapper>
  );
}
