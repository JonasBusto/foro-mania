/* eslint-disable react/prop-types */
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../styles/home.css';

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
	disabled,
	handleGoogle,
}) {
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset, // Añadir reset
	} = useForm();

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleOnHide = () => {
		reset(); 
		onHide();
	};

	return (
		<Dialog
			className='custom-dialog'
			visible={visible}
			modal
			onHide={handleOnHide} 
			contentStyle={{
				width: '100%',
				border: 'rounded',
				backgroundColor: '#262626',
				borderRadius: '0 0 20px 20px',
				padding: 20,
			}}
			header={
				<div className='flex items-center justify-start'>
					<h1 className='title-multicolor font-bold text-4xl'>
						ForoMania
					</h1>
				</div>
			}>
			<div className='flex flex-col px-3 py-5 gap-4 items-center justify-center text-white'>
				<p className='font-bold text-3xl'>{title}</p>
				<img src='/img/handlogin.png' alt='handlogin' width={50} />
				<p className='font-semibold mb-3'>{subtitle}</p>
				<form
					onSubmit={handleSubmit((data) => onSubmit(data, reset))}
					className='w-full '>
					{fields.map((field) => (
						<div
							key={field.name}
							className='flex flex-col items-center justify-center gap-2 w-full mt-7'>
							<FloatLabel>
								<div className='relative text-black '>
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
										<Button
											type='button'
											onClick={toggleShowPassword}
											className='absolute right-2 top-1/2 transform -translate-y-1/2 border-none bg-transparent cursor-pointer'>
											<i
												className={`text-xl ${
													showPassword
														? 'pi pi-eye-slash'
														: 'pi pi-eye'
												}`}></i>
										</Button>
									)}
								</div>
								<label>{field.label}</label>
							</FloatLabel>
							{errors[field.name] && (
								<span className='text-red-700 text-center w-full'>
									{errors[field.name].message}
								</span>
							)}
						</div>
					))}
					<Link to={linkTo}>
						<p className='text-[12px] py-4 text-start hover:underline-offset-2 hover:text-blue-700 hover:underline'>
							{linkText}
						</p>
					</Link>
					<div className='mt-4 flex flex-wrap items-center justify-around gap-2 w-full'>
						<Button
							label={buttonLabel}
							type='submit'
							text
							disabled={disabled}
							icon='pi pi-lock-open'
							className='p-3 bg-blue-700 rounded-xl font-semibold text-white border-2 border-white hover:bg-green-800'
						/>
						<Button
							className=' px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg hover:bg-neutral-50 text-slate-200 hover:border-slate-400  hover:text-slate-900 '
							onClick={handleGoogle}
							disabled={disabled}
							type='button'>
							<img
								className='w-6 h-6'
								src='https://www.svgrepo.com/show/475656/google-color.svg'
								alt='google logo'></img>
							Iniciar Sesión con Google
						</Button>
					</div>
				</form>
			</div>
		</Dialog>
	);
}
