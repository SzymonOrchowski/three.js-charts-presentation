// src/app/layout.js
import { StoreProvider } from './StoreProvider';
import './globals.css';

export const metadata = {
  title: 'Three.js Charts V2',
  description: 'Data visualization with Three.js and Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}