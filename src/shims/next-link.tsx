import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
  shallow?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, prefetch, scroll, replace, shallow, locale, legacyBehavior, ...props }, ref) => (
    <a ref={ref} href={href} {...props} />
  )
);

Link.displayName = 'Link';

export default Link;
