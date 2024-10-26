import { Outlet } from 'react-router';

import Header from '../components/layout/Header';

const LayoutPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default LayoutPage;
