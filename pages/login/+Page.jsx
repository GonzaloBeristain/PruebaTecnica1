export default Page;

import React from 'react';
import { useState } from 'react';
import { navigate } from 'vike/client/router'

function Page() {
    const [rut, setRut] = useState('');

    const formatRUT = (value) => {
        const numericValue = value.replace(/\D/g, '');
        const limitedValue = numericValue.slice(0, 9);

        return limitedValue.length === 9
            ? `${limitedValue.slice(0, 8)}-${limitedValue.slice(8)}`
            : limitedValue;
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setRut(formatRUT(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/login/password/?rut=${rut}`);
    };
    
    return (
        <>
            <div className="text-center py-3 w-auto flex flex-col justify-center items-center h-[calc(100vh-3rem)]">
                <form  className="flex flex-col gap-y-3 bg-slate-900 p-10 rounded-lg" onSubmit={handleSubmit}>
                <p className="flex text-xl text-slate-400">Portal Paciente</p>
                    <label name="rut" className="text-rm-blue-100 text-5xl font-bold pb-3">Ingresa a tu Portal</label>
                    <input type="text" name="rut" value={rut} onChange={handleChange} placeholder="Ingresa tu Rut" className="rounded-full border-2 border-blue-600 p-2 text-center" />
                    <button  type="submit" className="bg-rm-blue-100 text-white rounded-full p-2 font-bold text-lg hover:bg-rm-blue-200 transition-colors duration-300">
                        Siguiente
                    </button>
                </form>
            </div>
        </>
    )
};