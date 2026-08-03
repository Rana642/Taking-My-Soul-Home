import React from 'react';

/**
 * BrandLogo renders the official Taking My Soul Home lockup
 * (icon + wordmark) from /public/logo/. Both current mount points
 * (Navbar, Footer) sit on a dark teal background, so the LIGHT
 * variant is the default. Pass `variant="dark"` for use on light
 * cream backgrounds or `variant="gold"` for the gold accent version.
 */

type LogoVariant = 'light' | 'dark' | 'gold';
type LogoSize = 'sm' | 'md' | 'lg';

interface BrandLogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
  /** Retained for API compatibility. The wordmark is baked into the
   *  lockup image, so this prop is currently a no-op. */
  showText?: boolean;
}

const VARIANT_SRC: Record<LogoVariant, string> = {
  light: '/logo/logo-full-light.png',
  dark:  '/logo/logo-full-dark.svg',
  gold:  '/logo/logo-full-gold.png',
};

// Height tuned to keep the visible logo footprint close to the
// previous inline-SVG icon sizes; width auto-scales via aspect ratio.
const SIZE_CLASSES: Record<LogoSize, string> = {
  sm: 'h-9',
  md: 'h-11 sm:h-12',
  lg: 'h-14 sm:h-16',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'light',
  className = '',
}) => {
  return (
    <img
      src={VARIANT_SRC[variant]}
      alt="Taking My Soul Home"
      className={`${SIZE_CLASSES[size]} w-auto object-contain select-none ${className}`}
      draggable={false}
    />
  );
};
