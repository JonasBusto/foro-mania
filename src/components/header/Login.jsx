/* eslint-disable react/prop-types */
import { FormDialog } from '../header/FormDialog';

export function Login({ visible, onHide }) {
	const onSubmit = async (values) => {
		console.log(values);
		// logica para iniciar sesion
	};

	return (
		<FormDialog
			visible={visible}
			onHide={onHide}
			onSubmit={onSubmit}
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
							value: 7,
							message: 'La contraseña debe contener al menos 7 dígitos',
						},
					},
				},
			]}
		/>
	);
}
