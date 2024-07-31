import './globals.css';
import { Nunito } from 'next/font/google';
import SideBar from './components/SideBar/SideBar';
import Header from './components/Header';

export const metadata = {
  title: 'Scenario Dash',
  description: 'Unlock real-time financial insights',
};

const font = Nunito({
  weight: ['400', '500', '600', '700'],
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
      <body className={`${font.className} flex p-0`}>
        <SideBar />
        <div className="flex-1 w-full overflow-scroll">
          <div className="min-w-[768px]">
            <Header />
            <main className="flex p-8 h-[calc(100vh-80px)] w-full">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
