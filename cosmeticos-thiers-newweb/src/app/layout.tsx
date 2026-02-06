import type { Metadata } from "next";
import { Poppins, Comfortaa } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Belleza creada con ciencia y elegancia - Cosméticos Thiers",
  description: "Cosméticos Thiers es una empresa mexicana especializada en el desarrollo de productos cosméticos de alta calidad con fórmulas propias y exclusivas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${comfortaa.variable}`}>
      <body className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
