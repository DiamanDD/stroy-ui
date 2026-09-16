import { Outlet, ScrollRestoration } from 'react-router';
import StandGate from './StandGate';
import YandexMetrika from './YandexMetrika';

export default function RootLayout() {
  return (
    <StandGate>
      <YandexMetrika />
      <ScrollRestoration />
      <Outlet />
    </StandGate>
  );
}
