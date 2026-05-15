import "./globals.css";

export const metadata = {
  title: "Prompt Master",
  description: "Transform rough ideas into powerful AI prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
