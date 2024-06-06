import { EScenario, defaultScenario } from 'src/core/types';

export function getScreenRoute(
  scenario: EScenario = defaultScenario,
  screen: number = 1,
  doRoot?: boolean,
) {
  let url = `screen/${scenario}/${screen}`;
  if (doRoot) {
    url = '/' + url;
  }
  return url;
}
