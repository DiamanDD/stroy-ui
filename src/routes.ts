import { createBrowserRouter } from 'react-router';
import RootLayout from './shared/RootLayout';
import Hub from './hub/Hub';
import { smRoutes } from './hypotheses/sm';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: '/',
        Component: Hub,
      },
      ...smRoutes,
      {
        path: '*',
        Component: Hub,
      },
    ],
  },
]);
