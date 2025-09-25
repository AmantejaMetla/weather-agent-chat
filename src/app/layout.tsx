import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Agent Chat",
  description: "Interactive weather chatbot with real-time weather information and forecasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('weather-agent-theme') || 'light';
                const palette = localStorage.getItem('weather-agent-color-palette') || 'blue';
                
                // Apply theme class
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                
                // Apply color palette
                const colorPalettes = {
                  blue: {
                    light: {
                      primary: '#3b82f6',
                      primaryHover: '#2563eb',
                      background: '#ffffff',
                      foreground: '#171717',
                      chatBg: '#f9fafb',
                      messageUserBg: '#3b82f6',
                      messageAgentBg: '#f3f4f6',
                      messageText: '#1f2937',
                      messageUserText: '#ffffff',
                      inputBg: '#f9fafb',
                      borderColor: '#e5e7eb',
                      headerBg: '#2563eb',
                      headerText: '#ffffff',
                      headerSubtext: '#dbeafe',
                      statusOnline: '#10b981',
                      statusOffline: '#6b7280',
                      searchHighlight: '#fef3c7'
                    },
                    dark: {
                      primary: '#3b82f6',
                      primaryHover: '#1d4ed8',
                      background: '#0f172a',
                      foreground: '#f1f5f9',
                      chatBg: '#1e293b',
                      messageUserBg: '#3b82f6',
                      messageAgentBg: '#334155',
                      messageText: '#e2e8f0',
                      messageUserText: '#ffffff',
                      inputBg: '#334155',
                      borderColor: '#475569',
                      headerBg: '#1e40af',
                      headerText: '#ffffff',
                      headerSubtext: '#dbeafe',
                      statusOnline: '#10b981',
                      statusOffline: '#6b7280',
                      searchHighlight: '#fbbf24'
                    }
                  }
                };
                
                const colors = colorPalettes[palette]?.[theme] || colorPalettes.blue[theme];
                if (colors) {
                  Object.entries(colors).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(\`--\${key}\`, value);
                  });
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
