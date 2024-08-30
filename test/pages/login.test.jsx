import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect } from 'vitest';
import { Login } from '../../src/components/header/Login';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { MemoryRouter } from 'react-router-dom';


describe('Test del componente de página de Login', () => {

    beforeEach(() => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login visible={true} onHide={() => {}} setOpenSignIn={() => {}} />              
                </MemoryRouter>
            </Provider>
        )
    })

    test('Logo visible', () => {

        const logo = screen.getByTestId('logo-img')
        expect(logo).toBeInTheDocument()
        expect(logo.alt).toEqual('Logo de Foromanía')
    })

    test('Encabezado nivel 2', () => {

        const subtitle = screen.getByRole('heading', {level: 2})
        expect(subtitle).toBeInTheDocument()
        expect(subtitle.textContent).toEqual('Iniciar Sesión')
    })


})