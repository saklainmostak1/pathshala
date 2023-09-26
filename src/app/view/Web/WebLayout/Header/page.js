"use client"
import Link from 'next/link';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';


const Header = () => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Navbar expand="lg" className="bg-secondary mb-4">
                <Container>
                    <Navbar.Brand className='mb-2 mt-2' >React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto text-black mt-1 gap-lg-5 gap-2 gap-md-2">
                            <Link href="/">Home</Link>              
                            <Link href="/blogController">Blogs</Link>              
                            <Link href="/aboutController">About</Link>              
                            <Link href="/AdminController">Dashboard</Link>              
                            {/* <a href="" onClick={handleShow}>Show</a> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Some text as placeholder. In real life you can have the elements you
                        have chosen. Like, text, images, lists, etc.
                    </Offcanvas.Body>
                </Offcanvas>
            </>

        </div>
        

    );
};

export default Header;