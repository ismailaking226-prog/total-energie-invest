import './globals.css';
import { AppStateProvider } from '@/components/AppStateProvider';

export const metadata = {
  title: 'Total Énergie',
  description: 'Application d’investissement mobile Total Énergie',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
