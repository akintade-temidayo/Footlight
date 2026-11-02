import "../styles/globals.css";
import ToastProvider from '@/components/ui/ToastProvider';

export const metadata = {
  title: {
    default: 'Footlight | Personal Portfolio',
    template: '%s',
  },
  description: 'Showcase your creative work and technical projects.',
  icons: {
    icon: [{ url: '/icon.svg?v=2', type: 'image/svg+xml' }],
    shortcut: [{ url: '/icon.svg?v=2', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg?v=2', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
