import LeftSidebar from "@/components/LeftSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="b-amber-500 flex px-10 min-h-[calc(100vh-4.5rem)]">
      <LeftSidebar />

      {children}
    </main>
  );
};

export default DashboardLayout;
