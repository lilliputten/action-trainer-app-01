import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, ButtonBase } from '@mui/material';
import classNames from 'classnames';

import { EScenario } from 'src/core/types';
import Video from 'src/assets/videos/1c-0-start.mp4';

// import { Demo } from 'src/components/Demo';
// import { Scrollable } from 'src/ui/Basic';

import { useAppSessionStore } from 'src/store/AppSessionStore';

import styles from './SelectScenarioPage.module.scss';

function vw(n: number): string {
  return `${n}vw`;
}

const defaultButtonSx = {
  left: vw(4),
  top: vw(10),
  width: vw(45.5),
  height: vw(46),
  // borderRadius: vw(5),
};

export const SelectScenarioPage: React.FC = observer(() => {
  const appSessionStore = useAppSessionStore();
  const refVideo = React.useRef<HTMLVideoElement>(null);
  const [isActive, setActive] = React.useState(false);
  const startPlay = React.useCallback(() => {
    refVideo.current?.play();
  }, [refVideo]);
  React.useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 500);
    const video = refVideo.current;
    if (video && startPlay) {
      video.addEventListener('canplay', () => {
        setTimeout(startPlay, 1000);
      });
      return () => {
        video?.removeEventListener('canplay', startPlay);
      };
    }
  }, [refVideo, startPlay]);
  const [videoComplete, setVideoComplete] = React.useState(false);
  const [scenario, setScenario] = React.useState<EScenario | undefined>();
  const handleVideoEnd = React.useCallback(() => {
    setVideoComplete(true);
  }, []);
  const handleScenarioSelect = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const scenario = event.currentTarget.id as EScenario;
      console.log('[SelectScenarioPage:handleScenarioSelect]', {
        scenario,
        event,
      });
      setScenario(scenario);
      appSessionStore.setScenario(scenario);
      appSessionStore.setScreen(1); // From the 1st screen
    },
    [appSessionStore],
  );
  const isFinished = !!scenario;
  return (
    <Box
      className={classNames(
        styles.root,
        videoComplete && styles.videoComplete,
        scenario && styles.finished,
        isActive && !isFinished && styles.active,
      )}
    >
      <video
        src={Video}
        className={styles.video}
        preload="auto"
        onEnded={handleVideoEnd}
        ref={refVideo}
        // controls
        // autoPlay
        muted
      ></video>
      <Box className={classNames(styles.over)}>
        <ButtonBase
          id={EScenario.N}
          className={classNames(styles.button, scenario === EScenario.N && styles.selected)}
          onClick={handleScenarioSelect}
          sx={{
            ...defaultButtonSx,
          }}
        ></ButtonBase>
        <ButtonBase
          id={EScenario.I}
          className={classNames(styles.button, scenario === EScenario.I && styles.selected)}
          onClick={handleScenarioSelect}
          sx={{
            ...defaultButtonSx,
            left: vw(50.5),
          }}
        ></ButtonBase>
      </Box>
      <Box className={classNames(styles.curtain)}></Box>
      {/*
      <Scrollable>
        <Demo />
      </Scrollable>
      */}
    </Box>
  );
});
