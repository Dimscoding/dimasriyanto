import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/syne";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dimas Riyanto, S.Sos. — Graphic Designer & AI Creative",
  description:
    "Portofolio Dimas Riyanto, S.Sos., graphic designer untuk percetakan, visual digital, dan creative workflow berbasis AI.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
