import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect } from "vitest"
import { Header } from "../../../src/components/structure/Header"
import { Provider } from 'react-redux';
import { store } from '../../../src/store';
import { MemoryRouter } from 'react-router-dom';


describe('Renderizado de las acciones en el header para login y registro de usuarios', () => {

    beforeEach(() => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        )        
    })


    vi.mock('../../../src/hooks/useAuth.js', () => ({
        useAuth: () => ({ loggedUser: null })
    }))
      
    vi.mock('../../../src/hooks/useLoad', () => ({
        useLoad: () => ({ isLoading: false })
    }))


    test('Boton de Iniciar sesión', () => {

        const loginButton = screen.getByText('Iniciar Sesión')
        expect(loginButton).toBeInTheDocument()

        fireEvent.click(loginButton)

        const headings = screen.getAllByRole('heading', { level: 2 })
        const loginTitle = headings.find(heading => heading.textContent === 'Iniciar Sesión')
        expect(loginTitle).toBeInTheDocument()
    })

    test('Boton de Registro', () => {

        const registerButton = screen.getByText('Registrarse')
        expect(registerButton).toBeInTheDocument()

        fireEvent.click(registerButton)
        screen.debug()

        const headings = screen.getAllByRole('heading', { level: 2 })
        const registerTitle = headings.find(heading => heading.textContent === 'Registrarse')
        expect(registerTitle).toBeInTheDocument()
    })
})