import { AppShell } from './AppShell';

export function PageEntry({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
