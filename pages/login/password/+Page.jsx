export default Page;

import React from 'react';
import { useState } from 'react';
import { navigate } from 'vike/client/router'

function Page() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const query = new URLSearchParams(window.location.search);
    const rut = query.get('rut');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = {
            password: password,
            rut: rut
        }

        try {
            const response = await fetch('http://rec-staging.recemed.cl/api/users/log_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({user})
            });

            if (response) {
                const data = await response.json();
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('profile', JSON.stringify(data.data.profiles[0]));
                navigate(`/profile`);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Password incorrecta');
            }
                
        } catch (error) {
            console.log("Error en la solicitud:", error);
            setError('Error en la solicitud.');
        }
    };

    return (
        <>
            <div className="text-center py-3 w-auto flex flex-col justify-center items-center h-[calc(100vh-3rem)]">
                <form className="flex flex-col gap-y-3 bg-slate-900 p-10 rounded-lg" onSubmit={handleSubmit} >
                <p className="flex text-xl text-slate-400">Portal Paciente</p>
                    <label name="password" className="text-rm-blue-100 text-5xl font-bold pb-3">Ingresa a tu Portal</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu Contraseña"
                            className="rounded-full border-2 border-blue-600 p-2 text-center w-full"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center">
                            {showPassword ? (
                                <span className="text-blue-600">👁️</span>
                            ) : (
                                <span className="text-blue-600">👁️‍🗨️</span>
                            )}
                        </button>
                    </div>
                    {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                    <button type="submit" className="bg-rm-blue-100 text-white rounded-full p-2 font-bold text-lg hover:bg-rm-blue-200 transition-colors duration-300">
                        Ingresar
                    </button>
                </form>
            </div>
        </>
    )
}