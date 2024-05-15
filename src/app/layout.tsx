import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import NavBar from "@/components/common/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChessUp: Strategy Meets the Blockchain",
  description: `   In the world of digital board games, OnChain Chess stands out by
  integrating the timeless game of chess with the cutting-edge
  technology of blockchain. This is not just a game; it&apos;s an
  experience, a community, and a new chapter in the world of
  decentralized gaming.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <NavBar />
          {children}
        </Theme>
      </body>
    </html>
  );
}
