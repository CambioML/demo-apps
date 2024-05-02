import './globals.css';
import { Lato } from 'next/font/google';

export const metadata = {
  title: 'Scenario Dash',
  description: 'Unlock real-time financial insights',
};

const font = Lato({
  weight: ['400', '700'],
  style: 'normal',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
