const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-amber-500">
      <div>LeftBar</div>
      {children}
    </main>
  );
};

export default DashboardLayout;
