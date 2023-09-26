'use client'
import Footer from '@/app/view/Web/WebLayout/Footer/page';
import Header from '@/app/view/Web/WebLayout/Header/page';
import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            <nav>
              <Header></Header>
            </nav>
            {children}

          <Footer></Footer>
        </div>
    );
};

export default Layout;