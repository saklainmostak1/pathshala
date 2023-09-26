'use client'
import React from 'react';
import Table from 'react-bootstrap/Table';
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2';
import { useState } from 'react';
import './style.css'
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { FaTrashAlt } from "react-icons/fa";
import Link from 'next/link';

const UsersList = () => {

    const { data: users = [], isLoading, refetch
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5002/user/allUser')

            const data = await res.json()
            return data
        }
    })
    // paigination Start
    const itemsPerPage = 20;

    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = Math.ceil(users?.length / itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const slicedItems = users?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // paigination end

    const handleDelete = id => {
        const proceed = window.confirm('Are You Sure delete')
        console.log(id)
        if (proceed) {
            fetch(`http://localhost:5002/allUser/${id}`, {
                method: "DELETE",

            })
                .then(Response => Response.json())
                .then(data => {
                    if (data.affectedRows > 0) {
                        refetch()
                        Swal.fire({
                            title: 'delete!',
                            text: 'user delete Successful !!',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        console.log(data)
                    }
                })
        }
    }
    return (
        <div className='p-3'>
            <Table striped=" " className=''>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Role</th>
                        <th>Created date</th>
                        <th>Modified date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        slicedItems?.map((allUser, i) =>


                            <tr key={allUser.id} >
                                <td>
                                    {i + 1}
                                </td>

                                <td>

                                    <p className=" text-sm">
                                        {allUser.full_name}
                                    </p>

                                </td>

                                <td>

                                    <p className=" text-sm">
                                        {allUser.email}
                                    </p>

                                </td>
                                <td>

                                    <p className=" text-sm">
                                        {allUser.mobile}
                                    </p>

                                </td>
                                <td>

                                    <p className=" text-sm">
                                        {allUser.role_name}
                                    </p>

                                </td>
                                <td>

                                    <p className=" text-sm">
                                        {allUser.created_date}
                                    </p>

                                </td>
                                <td>

                                    <p className=" text-sm">
                                        {allUser.modified_date}
                                    </p>

                                </td>
                                <td className="">
                                    <div className="flex items-center ">
                                        <button
                                            style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                            className=" rounded border-0 bg-success text-white
                                        
                                            "
                                        >

                                            <HiEye></HiEye>
                                        </button>
                                        <Link href={`/AdminController/UserPageListController/update/${allUser.id}`}>
                                        
                                        <button
                                            style={{ width: "35px ", height: '30px', marginLeft: '2px', }}
                                            className=" rounded border-0 bg-primary text-white 
                                         
                                            "
                                        >

                                            <HiPencilAlt></HiPencilAlt>
                                        </button>
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(allUser.id)}
                                            style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                            className=" rounded border-0 bg-danger text-white
                                           
                                            "
                                        >

                                            <FaTrashAlt></FaTrashAlt>
                                        </button>






                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <div className=" mt-5 ">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />

            </div>
        </div>
    );
};

export default UsersList;