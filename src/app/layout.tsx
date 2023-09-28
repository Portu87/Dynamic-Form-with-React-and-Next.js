/**
 * This module provides the root layout for the application.
 *
 * @module RootLayout
 */

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

// Load the Inter font with the Latin subset
const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata for the application.
 *
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Form dinamic",
  description: "Server actions and form mutations dinamic",
};

/**
 * The root layout component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render within the layout.
 * @returns {JSX.Element} The rendered root layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          toastOptions={{
            className: "w-full text-left",
          }}
        />
        {children}
      </body>
    </html>
  );
}
