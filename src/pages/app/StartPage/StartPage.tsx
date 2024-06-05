import React from 'react';
import { Box } from '@mui/material';

import Video from 'src/assets/videos/1c-0-start.mp4';

import { Demo } from 'src/components/Demo';
import { Scrollable } from 'src/ui/Basic';

import styles from './StartPage.module.scss';

export function StartPage() {
  const refVideo = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    if (refVideo.current) {
      refVideo.current.play();
    }
  }, []);
  // const videoSrc = '/video/1c-0-start.mp4';
  const handleVideoEnd = React.useCallback(() => {
    console.log('[StartPage:handleVideoEnd]');
  }, []);
  return (
    <Box className={styles.root}>
      <video
        src={Video}
        className={styles.video}
        preload="auto"
        onEnded={handleVideoEnd}
        ref={refVideo}
        // controls
        autoPlay
        muted
      ></video>
      {/*
      <Scrollable>
        <Demo />
      </Scrollable>
      */}
    </Box>
  );
}
