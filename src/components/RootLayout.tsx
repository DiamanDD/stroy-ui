import { Outlet, ScrollRestoration } from 'react-router';
import YandexMetrika from './YandexMetrika';

export default function RootLayout() {
  return (
    <>
      <YandexMetrika />
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
