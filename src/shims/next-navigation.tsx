import { useState, useEffect } from 'react';

export function usePathname(): string {
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    setPathname(window.location.pathname);
    const handler = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return pathname;
}

export function useRouter() {
  return {
    push: (url: string) => { window.location.href = url; },
    replace: (url: string) => { window.location.replace(url); },
    back: () => { window.history.back(); },
    forward: () => { window.history.forward(); },
    refresh: () => { window.location.reload(); },
    prefetch: () => {},
  };
}

export function notFound(): never {
  if (typeof window !== 'undefined') {
    window.location.href = '/404';
  }
  throw new Error('Not Found');
}

export function useSearchParams() {
  const [params, setParams] = useState(() => new URLSearchParams());

  useEffect(() => {
    setParams(new URLSearchParams(window.location.search));
  }, []);

  return params;
}
