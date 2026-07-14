import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-transparent z-10 overflow-x-hidden">
      <Header />
      <main className="flex-1 bg-transparent">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;