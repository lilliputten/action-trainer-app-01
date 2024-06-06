import React from 'react';

export function getVideoSizeByRef(refVideo: React.RefObject<HTMLVideoElement>) {
  const video = refVideo.current;
  let width: number | undefined = undefined;
  let height: number | undefined = undefined;
  if (video) {
    // const rect = video.getBoundingClientRect();
    const {
      // prettier-ignore
      clientWidth,
      clientHeight,
      videoWidth,
      videoHeight,
    } = video;
    if (videoWidth && videoHeight && clientWidth && clientHeight) {
      const videoRatio = videoHeight / videoWidth;
      const widthRatio = videoWidth / clientWidth;
      const heightRatio = videoHeight / clientHeight;
      /* console.log('[getVideoSizeByRef] before', {
       *   clientWidth,
       *   clientHeight,
       *   videoWidth,
       *   videoHeight,
       *   widthRatio,
       *   heightRatio,
       *   videoRatio,
       * });
       */
      if (widthRatio > heightRatio) {
        width = clientWidth;
        // height = clientHeight / widthRatio;
        height = width * videoRatio;
      } else {
        height = clientHeight;
        // width = clientWidth / heightRatio;
        width = height / videoRatio;
      }
      /* console.log('[getVideoSizeByRef] after', {
       *   width,
       *   height,
       * });
       */
    }
  }
  return { width, height };
}
