/* eslint-disable react/prop-types */
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../styles/home.css';

// recibe props de login o register
export function FormDialog({
	visible,
	onHide,
	onSubmit,
	title,
	buttonLabel,
	subtitle,
	linkText,
	linkTo,
	fields,
}) {
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// maneja el estado de visibilidad del password
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleGoogle = () => {
		console.log('Google');
		// logica para iniciar sesion o registrarse con Google
	};

	return (
		<Dialog
			className='custom-dialog'
			visible={visible}
			modal
			onHide={onHide}
			contentStyle={{
				width: '100%',
				border: 'rounded',
				backgroundColor: '#f0f0f0',
				borderRadius: '0 0 20px 20px',
				padding: 20,
			}}
			// titulo de encabezado multicolor
			header={
				<div className='flex items-center justify-start'>
					<span className='title-multicolor font-bold text-4xl'>
						ForoMania
					</span>
				</div>
			}>
			<div className='flex flex-col px-3 py-5 gap-4 items-center justify-center b'>
				<p className='font-bold text-3xl'>{title}</p>
				<img src='/handlogin.png' alt='handlogin' width={50} />
				<p className='font-semibold mb-3'>{subtitle}</p>
				{/* formulario reutilizable para login y register */}
				<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
					{fields.map((field) => (
						<div
							key={field.name}
							className='flex flex-col items-center justify-center gap-2 w-full mt-7'>
							<FloatLabel>
								<div className='relative'>
									<InputText
										id={field.name}
										type={
											field.type === 'password'
												? showPassword
													? 'text'
													: 'password'
												: field.type || 'text'
										}
										className='border p-3 w-full'
										{...register(field.name, field.validation)}
									/>
									{field.type === 'password' && (
										<button
											type='button'
											onClick={toggleShowPassword}
											className='absolute right-2 top-1/2 transform -translate-y-1/2 border-none bg-transparent cursor-pointer'>
											<i
												className={`text-xl ${
													showPassword
														? 'pi pi-eye-slash'
														: 'pi pi-eye'
												}`}></i>
										</button>
									)}
								</div>
								<label>{field.label}</label>
							</FloatLabel>
							{/* maneja los errores de cada input */}
							{errors[field.name] && (
								<span className='text-red-700 text-center w-full'>
									{errors[field.name].message}
								</span>
							)}
						</div>
					))}
					{/* link p iniciar sesion o recuperar contraseña */}
					<Link to={linkTo}>
						<p className='text-[12px] py-4 text-start hover:underline-offset-2 hover:text-blue-700 hover:underline'>
							{linkText}
						</p>
					</Link>
					{/* boton para iniciar sesion o registrar usuario */}
					<div className='mt-4 flex flex-wrap items-center justify-around gap-2 w-full'>
						<Button
							label={buttonLabel}
							type='submit'
							text
							icon='pi pi-lock-open'
							className='p-3 bg-blue-700 rounded-xl font-semibold text-white border-1 border-white-alpha-30 hover:bg-green-800'
						/>
						<Button
							label='Ingresar con Google'
							type='button'
							text
							icon='pi pi-google'
							className='p-3 bg-blue-700 rounded-xl font-semibold text-white border-1 border-white-alpha-30 hover:bg-green-800'
							onClick={() => {
								handleGoogle;
							}}
						/>
					</div>
				</form>
			</div>
		</Dialog>
	);
}
