import "./globals.css";

export const metadata = {
  title: "Cocoa & Cloud | Artisanal 3D Custom Cake Studio",
  description:
    "Design and order bespoke luxury cakes in interactive 3D. Handcrafted with premium ingredients, delivered across Mumbai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#0F0D0D] text-[#F5F2EB] selection:bg-[#D4AF37] selection:text-[#0F0D0D]">
        {children}
      </body>
    </html>
  );
}
