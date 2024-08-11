export default Page;

import React from 'react';
import { useState, useEffect } from "react";
import { navigate } from 'vike/client/router'

function Page () {
    const [user, setUser] = useState("");
    const [profile, setProfile] = useState({});
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        
        navigate('/login');
    };

    const handleNextPage = () => {
        setPage(nextPage => nextPage + 1)
    }; 

    const handlePreviousPage = () => {
        setPage(nextPage => nextPage - 1)
    }; 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getData = async (token) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            myHeaders.append('Content-Type', 'application/json');

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            
            const response = await fetch(`http://rec-staging.recemed.cl/api/patients/prescriptions?page=${page}`, requestOptions);
            const data = await response.json();
            setUser(data)
            setTotalPage(data.meta.total_pages)
        } catch (error) {
            console.log("Error en la data del fetch:", error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setProfile(JSON.parse(localStorage.getItem("profile")));

        if (token) {
            getData(token);
        } else {
            console.error('Token not found');
        }
    }, [page]);

    return(
        <div>
            <section>
            {
                <section className='flex justify-between'>
                    <button className="text-white text-1xl font-semibold py-2 hover:text-slate-400 duration-300 transition-colors px-4 md:p-2"
                    onClick={handleClick}>Salir</button>
                    <h1 className="text-white text-2xl font-semibold py-2 px-4 md:p-2">{profile.first_name}</h1>
                </section>
            }
            </section>
            <div className="grid md:grid-cols-2 p-4 bg-gray-200">
                {loading ? (<p className="text-center text-3xl">Cargando...</p>) :
                    user ? (
                    user.data.map((item, index) => (
                        <div key={index} className="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden mb-4">
                            <div className={`p-5  ${item.type === 'Receta Retenida' ? 'bg-slate-100' : 'bg-slate-300'} `}>
                                <section className="border-b-2 flex justify-between gap-x-10">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Folio: {item.id}</p>
                                    <p className="text-sm font-semibold text-gray-700 mb-2 flex gap-x-2">Receta de Medicamentos
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                        </svg>
                                    </p>
                                </section>
                                <section className='flex justify-between'>
                                    <section className="flex flex-col ">
                                        <p className="text-gray-400 text-xs pt-3">Fecha de emisión: {formatDate(item.inserted_at)}</p>
                                        <p className="text-gray-600 font-semibold text-xl">Dr: {item.doctor.first_name} {item.doctor.last_name}</p>
                                        <p className="text-gray-500 text-basic">{item.doctor.speciality} </p>
                                        <p className="text-gray-400 text-xs">Código: {item.doctor.license_number}</p>
                                    </section>
                                    <section className='flex items-end'>
                                        <button className='bg-rm-blue-100 text-white font-semibold px-7 py-2 rounded duration-300 transition-colors shadow hover:bg-rm-blue-200'>Ver</button>
                                    </section>
                                </section>
                                
                            </div>
                        </div>
                    ))
                )
                : 
                (
                    <p className="text-center text-3xl">Data no disponible</p>
                )}
            </div>
            <div className=" p-2  flex justify-between">
                {
                    page === 1 ? <button className="hidden" onClick={handlePreviousPage}>Anterior</button> : <button className="bg-rm-blue-100 text-white p-2 rounded-lg hover:bg-rm-blue-200 font-semibold transition-colors duration-300 text-lg" onClick={handlePreviousPage}>Anterior</button>
                }
                {
                    page == totalPage ? <button className="hidden" onClick={handleNextPage}>Siguiente</button> : <button className="bg-rm-blue-100 text-white p-2 rounded-lg hover:bg-rm-blue-200 font-semibold transition-colors duration-300 text-lg" onClick={handleNextPage}>Siguiente</button>
                }
            </div>
        </div>
    )
};