import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, BoxProps, IconButton, Stack } from '@mui/material';

import { Fullscreen, FullscreenExit, Replay } from '@mui/icons-material';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import screenfull from 'screenfull';

import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { RouterLinkComponent } from 'src/components/MUI';
import { useAppSessionStore } from 'src/store';

interface TProps extends TPropsWithChildrenAndClassName {
  ref?: React.ForwardedRef<HTMLDivElement>;
}

export const ScreenWrapper = observer<TProps, HTMLDivElement>(
  (props, ref) => {
    const appSessionStore = useAppSessionStore();
    const { fullscreen } = appSessionStore;
    const { children, className } = props;
    const location = useLocation();
    const { pathname } = location;
    const isRoot = !pathname || pathname === '/';
    const [isFullscreen, setFullscreen] = React.useState(fullscreen);
    React.useEffect(() => {
      if (isFullscreen !== appSessionStore.fullscreen) {
        appSessionStore.setFullscreen(isFullscreen);
        if (isFullscreen) {
          screenfull.request();
        } else {
          screenfull.exit();
        }
      }
    }, [appSessionStore, isFullscreen]);
    const toggleFullscreen = React.useCallback(() => {
      setFullscreen((isFullscreen) => !isFullscreen);
    }, []);
    return (
      <Box className={classNames(className)} ref={ref}>
        {/* Main content */}
        {children}
        <Stack
          sx={{
            position: 'absolute',
            right: 4,
            bottom: 4,
          }}
          spacing={1}
          direction="row"
        >
          {!isRoot && (
            <IconButton component={RouterLinkComponent} to="/" title="Начать сначала">
              <Replay />
            </IconButton>
          )}
          <IconButton title="Полноэкранный режим" onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        </Stack>
      </Box>
    );
  },
  { forwardRef: true },
);
