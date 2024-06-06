import { RouteObject } from 'react-router-dom';

import { demoRoute, rootUrl, testRoute } from './appUrls';

import { AppRootLayout } from 'src/pages/app/AppRootLayout';
import { DemoPage } from 'src/pages/app/DemoPage';
import { TestPage } from 'src/pages/app/TestPage';
import { SelectScenarioPage } from 'src/pages/app/SelectScenarioPage';
import { StartPage } from 'src/pages/app/StartPage';
import { NotFoundPage } from 'src/pages/app/NotFoundPage';
import { ScreenPage } from 'src/pages/app/ScreenPage';

/** Routes
 * @see src/routes/appUrls.ts
 * @see https://reactrouter.com/en/main/route/route
 */
export const routes: RouteObject[] = [
  {
    path: rootUrl,
    element: <AppRootLayout />,
    children: [
      { index: true, element: <StartPage /> },
      { path: 'select-scenario', element: <SelectScenarioPage /> },
      { path: 'screen/:scenario/:screen', element: <ScreenPage /> },
      { path: demoRoute, element: <DemoPage /> }, // NOTE: Debug only!
      { path: testRoute, element: <TestPage /> }, // NOTE: Debug only!
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
