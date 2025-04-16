import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Latest Convention Events</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
