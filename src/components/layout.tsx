
import { ReactNode } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import NowPlaying from "./now-playing";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-tidal-black text-white">
      <Sidebar />
      <Header />
      <main className="pl-[240px] pt-16 pb-20">
        <div className="container mx-auto py-6 px-6">
          {children}
        </div>
      </main>
      <NowPlaying />
    </div>
  );
};

export default Layout;
