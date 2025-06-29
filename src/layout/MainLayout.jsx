import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FooterProvider } from '../context/footercontext';
export function MainLayout({ children }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: 'black',
        }}
      >
        <Header />
        {children}

        <Footer />
      </div>
    </>
  );
}
