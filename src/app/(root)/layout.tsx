import Navbar from "@/components/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="b-rose-500">
      <Navbar />

      {children}
    </main>
  );
};

export default RootLayout;
