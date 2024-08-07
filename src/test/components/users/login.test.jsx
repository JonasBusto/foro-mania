import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect } from 'vitest';
import { PublicProfileCard } from '../../../components/users/user-public-profile-card';


describe('Test del componente detalles personalizados del usuario de la página de Perfil', () => {

    const userProps = {
        photoProfile: 'photourl',
        email: 'usuario@ejemplo.com',
        fullName: 'Nombre Apellido',
    }

    beforeEach(() => {
        render(<PublicProfileCard userProps={userProps}/>)
    })

    test('Encabezado con el nombre de usuario', () => {

        const username = screen.getByRole('heading', {level: 2})

        expect(username).toBeDefined()
        expect(username).toHaveTextContent((userProps.fullName))
    })

    test('Imagen del perfil correspondiente al usuario', () => {

        const imgPerfil = screen.getByRole('img')

        expect(imgPerfil).toBeDefined()
        expect(imgPerfil).toHaveAttribute('src', userProps.photoProfile);
    })

})