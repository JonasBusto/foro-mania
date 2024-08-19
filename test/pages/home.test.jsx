import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { Home } from '../../src/pages/Home';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { MemoryRouter } from 'react-router-dom';
import { CategoriesMock } from '../../src/helpers/Categories'


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
    }))

    vi.mock('../../src/hooks/useAuth', () => ({
        useAuth: () => ({ loggedUser: null }), // No hay usuario logueado
    }))

    vi.mock('../../src/hooks/useCategoryAction', () => ({
        useCategoryAction: () => ({
            categories: CategoriesMock
        })
    }))


    test('Mensaje de bienvenida', () => {

        const welcomeBanner = screen.getByTestId('welcome-banner')
        expect(welcomeBanner).toBeInTheDocument()
        
        const msjPresentacion = screen.getByRole('presentation')
        expect(msjPresentacion).toHaveTextContent('¡Hola! Nos alegra verte en ForoMania')

    })


    test('Visualizar botón para realizar una nueva publicación', async () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />                    
                </MemoryRouter>
            </Provider>
        )

        let nuevaPublicacionButton = screen.queryByRole('Nueva Publicación')
        expect(nuevaPublicacionButton).toBeNull()

        cleanup()

        vi.mock('../../src/hooks/useAuth', () => ({
            useAuth: () => ({
                loggedUser: { uid: '123', email: 'test@example.com' }, // Usuario logueado
            }),
        }))

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        )

        nuevaPublicacionButton = await screen.findByRole('link', { name: /Nueva Publicación/i })
        expect(nuevaPublicacionButton).toBeInTheDocument()
        expect(nuevaPublicacionButton.textContent).toBe('Nueva Publicación')
    })


    test('Render de categorías en etiquetas de navegación', async () => {

        const categoryLinks = await screen.findAllByRole('link')

        const filteredCategoryLinks = categoryLinks.filter(link => 
            CategoriesMock.some(category => link.textContent.includes(category.title))
        )

        if (CategoriesMock.length > 6) {
            expect(filteredCategoryLinks.length).toBe(6)
        } else {
            expect(filteredCategoryLinks.length).toBe(CategoriesMock.length)
        }

        filteredCategoryLinks.forEach(link => {
            const category = CategoriesMock.find(cat => link.textContent.includes(cat.title))
            if (category) {
                expect(link).toHaveAttribute('href', `/topic-list?category=${category.uid}`)
            }
        })
    })

})