import type { RouteObject } from 'react-router';
import Home from './pages/Home';
import Category from './pages/Category';
import { STORE_BASE } from './paths';

export const smMeta = {
  id: 1,
  path: STORE_BASE,
  title: 'Магазин СМ',
  description:
    'Текущий функционал интернет-магазина Строймаркет: каталог, категории, заявка и звонок.',
  status: 'active' as const,
};

export const smRoutes: RouteObject[] = [
  {
    path: STORE_BASE,
    Component: Home,
  },
  {
    path: `${STORE_BASE}/category/:slug`,
    Component: Category,
  },
];
