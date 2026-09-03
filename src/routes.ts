import { createBrowserRouter } from 'react-router';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import Category from './pages/Category';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/category/:slug',
        Component: Category,
      },
      {
        path: '*',
        Component: Home,
      },
    ],
  },
]);
