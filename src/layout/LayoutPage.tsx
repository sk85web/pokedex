import { Outlet } from 'react-router';
// import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

const LayoutPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default LayoutPage;
