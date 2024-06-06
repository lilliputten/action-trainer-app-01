import { EScenario, defaultScenario } from 'src/core/types';
import { getScreenRoute } from './getScreenRoute';

export function getNextScreenRoute(
  scenario: EScenario = defaultScenario,
  screen: number = 0,
  doRoot?: boolean,
) {
  return getScreenRoute(scenario, screen + 1, doRoot);
}
