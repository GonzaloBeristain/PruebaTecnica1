import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage  from '../pages/login/+Page';
import PasswordPage from '../pages/login/password/+Page';
import ProfilePage from '../pages/profile/+Page';

// Mock de `fetch` para la respuesta de la API
global.fetch = jest.fn((url, options) => {
    if (url === 'http://rec-staging.recemed.cl/api/users/log_in' && options.method === 'POST') {
        return Promise.resolve({
            json: () => Promise.resolve({
                data: {
                    token: 'fake-token',
                    profiles: [{ id: 'profile-id', first_name: 'Paciente', last_name: '' }] // Perfil genérico
                }
            })
        });
    }
    return Promise.reject('Not Found');
});

describe('Login', () => {
    beforeEach(() => {
        // Limpia el localStorage y el mock de `fetch` antes de cada prueba
        localStorage.clear();
        jest.clearAllMocks();
    });

    it("Debe iniciar sesión correctamente, guardar el token en localStorage y navegar a la página de perfil", async () => {
        // Renderiza la página de login de RUT
        render(<LoginPage />);

        // Elementos del formulario Login
        const inputRut = screen.getByPlaceholderText(/Ingresa tu Rut/i);
        const submitButton = screen.getByText(/Siguiente/i);

        // Simula la entrada del RUT
        fireEvent.change(inputRut, { target: { value: '11111111-1' } });

        // Simula el click en el botón de siguiente
        fireEvent.click(submitButton);

        // Renderiza la página de contraseña
        render(<PasswordPage />);

        // Elementos del formulario Password
        const inputPassword = screen.getByPlaceholderText(/Ingresa tu Contraseña/i);
        const submitPasswordButton = screen.getByText(/Ingresar/i);

        // Simula la entrada de la contraseña
        fireEvent.change(inputPassword, { target: { value: '11223344' } });

        // Simula el click en el botón de ingresar
        fireEvent.click(submitPasswordButton);

        // Espera a que la llamada a `fetch` se complete y el localStorage se actualice
        await waitFor(() => {
            // Verifica que el token esté guardado en el localStorage
            expect(localStorage.getItem('token')).toBe('fake-token');
            // Verifica que el perfil esté guardado en el localStorage
            expect(localStorage.getItem('profile')).toBe(JSON.stringify({ id: 'profile-id', first_name: 'Paciente', last_name: '' }));
        });

        // Renderiza la página de perfil
        render(<ProfilePage />);

        // Verifica que la información del perfil esté presente en la página
        expect(screen.getByText('Paciente')).toBeInTheDocument();
    });
});