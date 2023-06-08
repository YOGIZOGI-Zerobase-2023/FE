import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Nav />
      <main className="py-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
