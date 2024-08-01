import Header from "@/components/Header";

const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="w-full h-dvh flex flex-col align-top">
      <Header />
      {children}
    </div>
  );
}

export default Layout;