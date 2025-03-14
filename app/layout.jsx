// app/layout.jsx
import { Providers } from './providers';
import { AuthProvider } from './contexts/AuthContext'; // Importe o AuthProvider

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}