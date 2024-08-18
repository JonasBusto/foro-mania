import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { Home } from '../../src/pages/Home';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { MemoryRouter } from 'react-router-dom';


describe('Visulizacion del home', () => {

    beforeEach(() => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />                    
                </MemoryRouter>
            </Provider>
        )
    })

    vi.mock('../../src/hooks/useLoad', () => ({
        useLoad: () => ({ isLoading: false }),
    }));

    test('Mensaje de bienvenida', () => {

        const welcomeBanner = screen.getByTestId('welcome-banner')
        expect(welcomeBanner).toBeInTheDocument()
        
        const msjPresentacion = screen.getByRole('presentation')
        expect(msjPresentacion).toHaveTextContent('¡Hola! Nos alegra verte en ForoMania')

    })


    test('Visualizar botón para realizar una nueva publicación', () => {

        vi.mock('../../src/hooks/useAuth', () => ({
            useAuth: () => ({ loggedUser: null }), // No hay usuario logueado
        }));
    
        render(
            <Provider store={store}>
            <MemoryRouter>
                <Home />
            </MemoryRouter>
            </Provider>
        );
    
        let nuevaPublicacionButton = screen.findByText('Nueva Publicación')
        expect(nuevaPublicacionButton).toBeNull
    
        cleanup();
    
        vi.mock('../../src/hooks/useAuth', () => ({
            useAuth: () => ({
            loggedUser: { uid: '123', email: 'test@example.com' }, // Usuario logueado
            }),
        }));
    
        render(
            <Provider store={store}>
            <MemoryRouter>
                <Home />
            </MemoryRouter>
            </Provider>
        );

        nuevaPublicacionButton = screen.getByRole('link', { name: /Nueva Publicación/i })
        expect(nuevaPublicacionButton).toBeInTheDocument();
        expect(nuevaPublicacionButton.textContent).toBe('Nueva Publicación');
    });

})