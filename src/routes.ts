import { createHashRouter as createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import Category from './pages/Category';

export const router = createBrowserRouter([
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
]);
