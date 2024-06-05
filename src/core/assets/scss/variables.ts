/** @desc Re-export parsed and typed scss variables */

import cssVariables from './variables.module.scss';

const {
  // Fixed screen size
  screenWidthPx,
  screenHeightPx,

  themeControlsRadiusPx,
  defaultFontSizePx,

  transitionTimeMs,
  animationTimeMs,
  disappearTimeMs,

  primaryColor,
  secondaryColor,

  defaultBackgroundColor,
  defaultBackgroundColorDark,

  defaultTextColor,
  defaultTextColorDark,

  defaultLinkColor,
  neutralColor,

  errorColor,
  dangerColor,
  warnColor,
  successColor,
  infoColor,
} = cssVariables;

const screenWidth = parseInt(screenWidthPx);
const screenHeight = parseInt(screenHeightPx);

const themeControlsRadius = parseInt(themeControlsRadiusPx);
const defaultFontSize = parseInt(defaultFontSizePx);

const defaultFontSizeRem = (defaultFontSize * 16) / 10;

const transitionTime = parseInt(transitionTimeMs);
const animationTime = parseInt(animationTimeMs);
const disappearTime = parseInt(disappearTimeMs);

export {
  // Fixed screen size
  screenWidthPx,
  screenHeightPx,
  screenWidth,
  screenHeight,

  // Dimensions...
  themeControlsRadiusPx,
  defaultFontSizePx,
  themeControlsRadius,
  defaultFontSize,
  defaultFontSizeRem,

  // Timeouts...
  transitionTime,
  animationTime,
  disappearTime,
  transitionTimeMs,
  animationTimeMs,
  disappearTimeMs,

  // Colors...
  primaryColor,
  secondaryColor,
  defaultBackgroundColor,
  defaultBackgroundColorDark,
  defaultTextColor,
  defaultTextColorDark,
  defaultLinkColor,
  neutralColor,
  errorColor,
  dangerColor,
  warnColor,
  successColor,
  infoColor,

  // TODO: Export other essential variables?
};
