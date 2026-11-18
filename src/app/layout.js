import "./globals.css";

export const metadata = {
  title: "Cocoa & Cloud | Parisian Patisserie & 3D Cake Atelier",
  description:
    "Handcrafted bespoke luxury cakes designed in 3D. Warm Parisian editorial aesthetic with delicate florals, macarons, and artisanal finishes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#FAF6F0] text-[#2C1E18] selection:bg-[#C86D51] selection:text-[#FAF6F0]">
        {children}
      </body>
    </html>
  );
}
