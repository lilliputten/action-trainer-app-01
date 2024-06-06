import { EScenarioType, defaultScenarioType } from 'src/core/types';

export function getScreenRoute(
  scenario: EScenarioType = defaultScenarioType,
  screen: number = 1,
  doRoot?: boolean,
) {
  let url = `screen/${scenario}/${screen}`;
  if (doRoot) {
    url = '/' + url;
  }
  return url;
}
