
'use client'
import Footer from '@/app/view/AdminLayOut/Footer/page';
import Header from '@/app/view/AdminLayOut/Header/page';
import React from 'react';

const Dashboard = ({children}) => {
    return (
        <div>
          <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;