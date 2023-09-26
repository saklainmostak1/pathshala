'use client'

import { useQuery } from '@tanstack/react-query';
// import Image from 'next/image';
import { Image } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { HiTrash } from 'react-icons/hi';
import '../fa.css'


const IconModal = ({ index, handleInputChange, inputValue }) => {

    const [lgShow, setLgShow] = useState(false);




    const { data: icons = [], isLoading, refetch
    } = useQuery({
        queryKey: ['icons'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5002/faIcons')

            const data = await res.json()
            return data
        }
    })

    const [cart, setCart] = useState([])
    const handleAddToCart = data => {
        console.log(data)

        const newCart = [...cart, data]
        setCart(newCart)

    }

    const iconValue = (cart?.map(c => c?.fa))
    console.log(iconValue)

    const handleDeleteClick = () => {
        console.log('clicked')
        setCart([])
    };
    // const change = iconValue.length - 1

    useEffect(() => {
        handleDeleteClick()
    }, [inputValue])


    return (
        <div >
            <>
                <div className="input-group">

                    <div >
                        <input
                            type="text"
                            className="form-control form-control-sm page_group_icon"
                            name="page_group_icon"
                            readOnly
                            placeholder="Enter Page Group Icon"
                            data-input={`page_group_icon[${index}]`}
                            defaultValue={iconValue[iconValue.length - 1]}
                            onChange={(event) => handleInputChange(index, event)}
                        />

                    </div>


                    <div className="input-group-append">
                        <button
                            className="btn btn-sm btn-danger icon_clear"
                            data-input={`page_group_icon[${index}]`}
                            type="button"
                            onClick={handleDeleteClick}
                            onChange={() => handleInputChange(index, { target: { name: 'page_group_icon', value: '' } })}
                        >
                            <HiTrash />
                        </button>

                        <button

                            onClick={() => setLgShow(true)}
                            className="btn btn-sm btn-secondary icon_modal"
                            data-input={`page_group_icon[${index}]`}
                            type="button"
                        >
                            <i className="fas fa-search"></i> Icon
                        </button>
                    </div>
                </div>



                <Modal
                    className='text-black'
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Large Modal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='mt-5'>
                        <div className='row row-cols-2 row-cols-lg-6 row-cols-md-4 g-4 '>

                            {
                                icons?.map((icon) =>
                                    <div key={icon.id} className='mt-1' onClick={() => setLgShow(false)} >
                                        <div className=''

                                            onClick={() => handleAddToCart(icon)} >

                                            <div className="icon-el text-center bg-light m-1 p-1 show_fa_icon fs-3"
                                                onClick={() => handleAddToCart(icon)}
                                            >
                                                <a 
                                               
                                                dangerouslySetInnerHTML={{ __html: icon.fa }}
                                                ></a>
                                            </div>
                                        </div>


                                    </div>

                                )
                            }
                        </div>

                    </Modal.Body>
                </Modal>
            </>


        </div>

    );
};

export default IconModal;
