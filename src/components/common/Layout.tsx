import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Nav />
      <main className="pt-16 pb-20 md:pb-12 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
