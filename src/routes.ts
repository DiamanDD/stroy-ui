import { createBrowserRouter } from 'react-router';
import RootLayout from './components/RootLayout';
import Hub from './pages/Hub';
import Home from './pages/Home';
import Category from './pages/Category';
import { STORE_BASE } from './constants/paths';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: '/',
        Component: Hub,
      },
      {
        path: STORE_BASE,
        Component: Home,
      },
      {
        path: `${STORE_BASE}/category/:slug`,
        Component: Category,
      },
      {
        path: '*',
        Component: Hub,
      },
    ],
  },
]);
