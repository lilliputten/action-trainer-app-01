import { useAppSessionStore } from 'src/store/AppSessionStore';
import { getNextScreenRoute } from 'src/core/helpers/routes';

export function useNextScreenRoute(doRoot?: boolean) {
  const appSessionStore = useAppSessionStore();
  const { scenario, screen } = appSessionStore;
  return getNextScreenRoute(scenario, screen, doRoot);
}
