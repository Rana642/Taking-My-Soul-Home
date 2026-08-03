import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top whenever the pathname changes.
 * Sits at the router root so every navigation lands at the top of the page
 * (matching the old `window.scrollTo` calls that were scattered through
 * the pre-routing callback plumbing).
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}
