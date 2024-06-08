import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Box, ButtonBase } from '@mui/material';
import classNames from 'classnames';

import { EGameType, EScenarioType, defaultGameType, scenarioNames } from 'src/core/types';

import { isDev } from 'src/core/constants/config';
import { px } from 'src/core/helpers/styles';
import { animationTime, effectTime } from 'src/core/assets/scss';
import { getGameRoute } from 'src/core/helpers/routes';
import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';
import { gamesHash } from 'src/core/constants/game/games';
import { useContainerSize } from 'src/ui/hooks';
import { getVideoSizeByRef } from 'src/core/helpers/video';
import { useScreenParams } from 'src/core/hooks/routes';

import styles from './SelectGameScenario.module.scss';
import { showError } from 'src/ui/Basic';

const doDebug = isDev && false;

interface TSelectGameScenarioProps {
  gameId: EGameType;
}

export const SelectGameScenario: React.FC<TSelectGameScenarioProps> = observer((props) => {
  const { gameId } = props;
  const navigate = useNavigate();
  const {
    ref: refVideo,
    width: videoContainerWidth,
    height: videoContainerHeight,
  } = useContainerSize<HTMLVideoElement>();
  const buttonBorderWidth = videoContainerWidth && videoContainerWidth / 80;
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
  // TODO: Check `started` state if not in dev mode?
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
  const [videoComplete, setVideoComplete] = React.useState(false);
  const [videoEffectComplete, setVideoEffectComplete] = React.useState(false);
  const [scenario, setScenario] = React.useState<EScenarioType | undefined>();
  const handleVideoEnd = React.useCallback(() => {
    setVideoComplete(true);
    setTimeout(() => {
      setVideoEffectComplete(true);
    }, effectTime);
  }, []);
  const handleScenarioSelect = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const scenario = event.currentTarget.id as EScenarioType;
      setScenario(scenario);
      const nextScreenRoute = getGameRoute(gameId, scenario, 1, true);
      setTimeout(() => {
        navigate(nextScreenRoute);
      }, effectTime);
    },
    [navigate, gameId],
  );
  /** Has all screen activities finished? */
  const isFinished = !!scenario;
  // Get game data...
  const gameData = gamesHash[gameId];
  if (!gameData) {
    const error = new Error(`Invalid data for game '${gameId}'!`);
    // eslint-disable-next-line no-console
    console.error('[SelectGameScenario:error]', error);
    throw error;
  }
  const { startVideoUrl } = gameData;
  // Create scenario buttons...
  const scenarioButtons = React.useMemo(() => {
    return gameData.scenarios.map((game) => {
      const { id, selectButtonSx, name } = game;
      return (
        <ButtonBase
          key={'scenario-button-' + id}
          id={id}
          className={classNames(styles.button, scenario === id && styles.selected)}
          onClick={handleScenarioSelect}
          sx={{ ...selectButtonSx, borderWidth: buttonBorderWidth }}
          title={name || scenarioNames[id]}
        ></ButtonBase>
      );
    });
  }, [gameData, handleScenarioSelect, scenario, buttonBorderWidth]);
  return (
    <ScreenWrapper
      className={classNames(
        styles.root,
        (doDebug || videoComplete) && styles.videoComplete,
        (doDebug || videoEffectComplete) && styles.videoEffectComplete,
        (doDebug || isFinished) && styles.finished,
        (doDebug || isActive) && !isFinished && styles.active,
      )}
    >
      <video
        src={startVideoUrl}
        className={styles.video}
        preload="auto"
        onEnded={handleVideoEnd}
        ref={refVideo}
        muted
      ></video>
      <Box className={classNames(styles.overContainer)}>
        <Box ref={refBox} className={classNames(styles.overBox)}>
          {/* Scenario buttons */}
          {scenarioButtons}
        </Box>
      </Box>
      <Box className={classNames(styles.curtain)}></Box>
    </ScreenWrapper>
  );
});
