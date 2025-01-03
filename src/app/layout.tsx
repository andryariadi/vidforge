import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/components/Provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VidForge",
  description: "Generate your video using AI",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/logo.svg",
        },
        variables: {
          colorBackground: "#15171c",
          colorPrimary: "",
          colorText: "white",
          colorInputBackground: "#1b1f29",
          colorInputText: "white",
        },
      }}
    >
      <html lang="en">
        <body className={`${outfit.className} antialiased text-white-1`}>
          <Provider>{children}</Provider>
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
