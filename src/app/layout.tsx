import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elma Vize Danışmanlık',
  description: 'Vize danışmanlığı, yurtdışı eğitim ve iş danışmanlığı hizmetleri',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

