import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';

const Layout = ({ children, loginMessage }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar loginMessage={loginMessage} />
      <div style={{ flex: 1, marginTop: '60px' }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
