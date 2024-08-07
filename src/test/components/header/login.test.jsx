import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect } from 'vitest';
import { Login } from '../../../components/header/Login';
import { Provider } from 'react-redux';
import { store } from '../../../store';
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

    test('Encabezado nivel 1', () => {

        const title = screen.getByRole('heading', {level: 1})
        expect(title).toBeInTheDocument()
        expect(title.textContent).toEqual('Foromania')
    })

    test('Encabezado nivel 2', () => {

        const subtitle = screen.getByRole('heading', {level: 2})
        expect(subtitle).toBeInTheDocument()
        expect(subtitle.textContent).toEqual('Iniciar Sesión')
    })


})