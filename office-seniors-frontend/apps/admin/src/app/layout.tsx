import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Office of Seniors - Admin Dashboard',
  description: 'Management dashboard for the Office of Seniors',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
