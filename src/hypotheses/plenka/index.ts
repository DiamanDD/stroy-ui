import type { RouteObject } from 'react-router';
import PlenkaLayout from './Layout';
import Home from './pages/Home';
import Series from './pages/Series';
import NotFound from './pages/NotFound';
import { PLENKA_BASE } from './paths';

export const plenkaMeta = {
  id: 2,
  path: PLENKA_BASE,
  title: 'Плёнка Вест',
  description:
    'Прайс полиэтиленовой плёнки: агросерии, ГОСТ, мульча, подбор рулонов и заявка менеджеру.',
  status: 'active' as const,
};

export const plenkaRoutes: RouteObject[] = [
  {
    path: PLENKA_BASE,
    Component: PlenkaLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'serii/:slug',
        Component: Series,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
];
