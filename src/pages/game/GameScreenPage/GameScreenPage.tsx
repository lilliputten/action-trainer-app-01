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
import { Box } from '@mui/material';

export function GameScreenPage() {
  // Eg page url: /game/first/irina/1
  const navigate = useNavigate();
  // Get game data...
  const {
    // prettier-ignore
    gameId,
    scenarioId,
    screenId,
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
  const [hasChosen, setChosen] = React.useState(false);
  const [hasFinished, setFinished] = React.useState(false);
  const handleUserChoice = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const actionId = event.currentTarget.id as EScenarioType;
      const nextScreenRoute = getGameRoute(gameId, scenarioId, screenId, true);
      console.log('[GameScreenPage:handleUserChoice]', {
        actionId,
        nextScreenRoute,
      });
      setChosen(true);
      // setTimeout(() => {
      //   navigate(nextScreenRoute);
      // }, effectTime);
    },
    [gameId, scenarioId, screenId],
  );
  /** Has all screen activities finished? */
  const {
    // prettier-ignore
    videoUrl,
    finalSplashUrl,
  } = screenData;
  // TODO: Generate action buttons using `handleUserChoice`
  return (
    <ScreenWrapper
      className={classNames(
        styles.root,
        videoComplete && styles.videoComplete,
        videoEffectComplete && styles.videoEffectComplete,
        hasFinished && styles.finished,
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
        <h1>Screen page</h1>
        <p>
          Game: <u>{gameId}</u>
        </p>
        <p>
          Scenario: <u>{scenarioId}</u>
        </p>
        <p>
          Screen: <u>{screenId}</u>
        </p>
      </Box>
    </ScreenWrapper>
  );
}
