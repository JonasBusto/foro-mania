/* eslint-disable react/prop-types */
import { FormDialog } from './FormDialog';
import { useAuth } from '../../hooks/useAuth';

export function Register({ visible, onHide }) {
	const { loginGoogle, register, statusSign } = useAuth();

	const onSubmit = async (values, reset) => {
		console.log(values);
		const success = await register(values);
		if (success) {
			reset();
			onHide();
		}
	};

	const handleGoogle = async () => {
		const success = await loginGoogle();
		if (success) {
			onHide();
		}
	};

	return (
		<FormDialog
			visible={visible}
			onHide={onHide}
			disabled={statusSign === 'Cargando'}
			onSubmit={onSubmit}
			handleGoogle={handleGoogle}
			title='Bienvenido!'
			subtitle='Ingresa estos datos para crear tu cuenta'
			buttonLabel='Registrarse'
			linkText='¿Ya tienes una cuenta? Inicia sesión'
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
