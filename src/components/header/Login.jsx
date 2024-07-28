/* eslint-disable react/prop-types */
import { FormDialog } from '../header/FormDialog';
import { useAuth } from '../../hooks/useAuth';

export function Login({ visible, onHide }) {
	const { loginGoogle, loginEmail, statusSign } = useAuth();

	const onSubmit = async (values, reset) => {
		console.log(values);
		const { email, password } = values;
		await loginEmail({ email, password });
		reset();
		onHide();
	};

	const handleGoogle = async () => {
		await loginGoogle();
		onHide();
	};

	return (
		<FormDialog
			visible={visible}
			onHide={onHide}
			onSubmit={onSubmit}
			handleGoogle={handleGoogle}
			disabled={statusSign === 'Cargando'}
			title='Bienvenido nuevamente!'
			subtitle='Logueate para acceder a tu cuenta'
			buttonLabel='Ïngresar'
			linkText='Recuperar Contraseña'
			linkTo='/recover-password'
			fields={[
				{
					name: 'email',
					label: 'Email',
					validation: { required: 'El Email es requerido' },
				},
				{
					name: 'password',
					label: 'Contraseña',
					type: 'password',
					validation: {
						required: 'La contraseña es requerida',
						minLength: {
							value: 6,
							message: 'La contraseña debe contener al menos 6 dígitos',
						},
					},
				},
			]}
		/>
	);
}
