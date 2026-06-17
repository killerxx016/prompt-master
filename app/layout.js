import "./globals.css";

export const metadata = {
  title: "Prompt Master",
  description: "Transform rough ideas into powerful AI prompts",
  // Stop Chrome/Google from auto-translating the UI — the app has its own
  // EN/TR/AR language switcher, so browser translation only causes mismatches.
  other: { google: "notranslate" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no">
      <body className="notranslate">{children}</body>
    </html>
  );
}
