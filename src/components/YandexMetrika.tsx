import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { hit, reachGoal, YM_GOALS } from '../lib/metrika';

/** SPA pageviews + phone-click goals for Yandex Metrika / Webvisor. */
export default function YandexMetrika() {
  const location = useLocation();
  const isFirstHit = useRef(true);
  const prevUrl = useRef('');

  useEffect(() => {
    const url = window.location.href;

    if (isFirstHit.current) {
      isFirstHit.current = false;
      prevUrl.current = url;
      return;
    }

    hit(url, {
      title: document.title,
      referer: prevUrl.current,
    });
    prevUrl.current = url;
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href^="tel:"]');
      if (!link) return;
      reachGoal(YM_GOALS.phoneClick);
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
