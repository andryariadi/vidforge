import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative -screen w-full">
      <div className="absolute size-full">
        <Image src="/bg-img.png" alt="background" fill className="size-full" />
      </div>

      {children}
    </main>
  );
}
