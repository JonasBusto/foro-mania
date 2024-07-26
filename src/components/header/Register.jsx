/* eslint-disable react/prop-types */
import { FormDialog } from './FormDialog';

export function Register({ visible, onHide }) {
	const onSubmit = async (values) => {
		console.log(values);
		// logica para registrar usuario
	};

	return (
		<FormDialog
			visible={visible}
			onHide={onHide}
			onSubmit={onSubmit}
			title='Bienvenido!'
			subtitle='Ingresa estos datos para crear tu cuenta'
			buttonLabel='Registrarse'
			linkText='Ya tienes una cuenta? Inicia sesión'
			linkTo='/login'
			fields={[
				{
					name: 'email',
					label: 'Email',
					validation: { required: 'El Email es requerido' },
				},
				{
					name: 'username',
					label: 'Username',
					validation: { required: 'El Username es requerido' },
				},
				{
					name: 'password',
					label: 'Contraseña',
					type: 'password',
					validation: {
						required: 'La contraseña es requerida',
						minLength: {
							value: 7,
							message: 'La contraseña debe contener al menos 7 dígitos',
						},
					},
				},
				{
					name: 'confirmPassword',
					label: 'Confirmar Contraseña',
					type: 'password',
					validation: {
						required: 'La confirmación de contraseña es requerida',
						validate: (value, { password }) =>
							value === password ||
							'Las contraseñas no coinciden. Intenta nuevamente',
					},
				},
			]}
		/>
	);
}
