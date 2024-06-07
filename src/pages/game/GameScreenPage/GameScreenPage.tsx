import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';
import { TScreenParamsResult, useScreenData, useScreenParams } from 'src/core/hooks/routes';

import { px } from 'src/core/helpers/styles';
import { getVideoSizeByRef } from 'src/core/helpers/video';
import { useContainerSize } from 'src/ui/hooks';
import { gamesHash } from 'src/core/constants/game/games';

import styles from './GameScreenPage.module.scss';
import { animationTime, effectTime } from 'src/core/assets/scss';
import { getGameRoute } from 'src/core/helpers/routes';
import { EScenarioType } from 'src/core/types';
import { Box, ButtonBase } from '@mui/material';

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
    // scenarioData,
    screenData,
  } = useScreenData();
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
  const [isActive, setActive] = React.useState(false);
  // Start video handler...
  const startVideoPlay = React.useCallback(() => {
    const video = refVideo.current;
    if (video) {
      refVideo.current?.play();
      updateBoxGeometry();
    }
  }, [refVideo, updateBoxGeometry]);
  // Start and initialize video with a delay...
  React.useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, animationTime);
    const video = refVideo.current;
    if (video && startVideoPlay) {
      video.addEventListener('canplay', () => {
        setTimeout(startVideoPlay, effectTime);
      });
      return () => {
        video?.removeEventListener('canplay', startVideoPlay);
      };
    }
  }, [refVideo, startVideoPlay]);
  /** Video has already played */
  const [videoComplete, setVideoComplete] = React.useState(false);
  /** After video effect has finished */
  const [videoEffectComplete, setVideoEffectComplete] = React.useState(false);
  // const [scenario, setScenario] = React.useState<EScenarioType | undefined>();
  const handleVideoEnd = React.useCallback(() => {
    setVideoComplete(true);
    setTimeout(() => {
      setVideoEffectComplete(true);
    }, effectTime);
  }, []);
  /** Final action */
  const [hasFinished, setFinished] = React.useState(false);
  /** Answer */
  const [answerNo, setAnswerNo] = React.useState<number | undefined>();
  const isAnswered = answerNo !== undefined;
  const handleUserChoice = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const answerNo = Number(event.currentTarget.id);
      // TODO: Check for the last screen?
      const nextScreenRoute = getGameRoute(gameId, scenarioId, screenNo, true);
      console.log('[GameScreenPage:handleUserChoice]', {
        answerNo,
        nextScreenRoute,
      });
      setAnswerNo(answerNo);
      // TODO: Store an answer to the store for further analization?
      // setTimeout(() => {
      //   navigate(nextScreenRoute);
      // }, effectTime);
    },
    [gameId, scenarioId, screenNo],
  );
  /** Has all screen activities finished? */
  const {
    // prettier-ignore
    videoUrl,
    // finalSplashUrl,
    answers,
  } = screenData;
  // Generate action buttons using `handleUserChoice`
  const answerButtons = React.useMemo(() => {
    return answers.map((item, no) => {
      const { text, isCorrect, buttonSx } = item;
      const key = ['answer-button', scenarioId, no].join('-');
      const isSelected = answerNo === no;
      return (
        <ButtonBase
          key={key}
          id={String(no)}
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
  }, [answerNo, answers, handleUserChoice, scenarioId, isAnswered]);
  return (
    <ScreenWrapper
      className={classNames(
        styles.root,
        videoComplete && styles.videoComplete,
        videoEffectComplete && styles.videoEffectComplete,
        hasFinished && styles.finished,
        isAnswered && styles.answered,
        isActive && !hasFinished && styles.active,
      )}
    >
      <video
        src={videoUrl}
        className={styles.video}
        preload="auto"
        onEnded={handleVideoEnd}
        ref={refVideo}
        // controls
        // autoPlay
        muted
      ></video>
      <Box className={classNames(styles.overContainer)}>
        <Box ref={refBox} className={classNames(styles.overBox)}>
          {/* Answer buttons */}
          {answerButtons}
        </Box>
      </Box>
    </ScreenWrapper>
  );
}
