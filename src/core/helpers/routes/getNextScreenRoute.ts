import { EScenarioType, defaultScenarioType } from 'src/core/types';
import { getScreenRoute } from './getScreenRoute';

export function getNextScreenRoute(
  scenario: EScenarioType = defaultScenarioType,
  screen: number = 0,
  doRoot?: boolean,
) {
  return getScreenRoute(scenario, screen + 1, doRoot);
}
