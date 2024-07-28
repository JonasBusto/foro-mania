/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

export function FormContact({ visible, onHide }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmitForm = (data) => {
		const serviceID = '';
		const templateID = '';
		const userID = '';

		emailjs
			.send(serviceID, templateID, data, userID)
			.then(() => {
				alert('Email enviado con éxito');
				reset();
				onHide();
			})
			.catch((error) => {
				console.error('Error al enviar el email:', error);
				alert('Error al enviar el email');
			});
	};

	return (
		<div className='flex justify-center'>
			<Dialog
				className='custom-dialog'
				visible={visible}
				modal
				onHide={() => {
					onHide();
					reset();
				}}
				contentStyle={{
					width: '100%',
					border: 'rounded',
					backgroundColor: '#262626',
					borderRadius: '0 0 20px 20px',
					padding: 20,
				}}
				header={
					<div className='flex items-center justify-center bg-neutral-800'>
						<h1 className='title-multicolor font-bold text-4xl'>
							ForoMania
						</h1>
					</div>
				}>
				<div className='flex flex-col px-3 py-5 gap-4 items-center justify-center w-full'>
					<p className='font-bold text-3xl text-white'>
						Formulario de contacto
					</p>
					<p className='font-semibold mb-3 text-white'>
						Envia tu consulta o sugerencia y te responderemos a la
						brevedad!
					</p>
					<form onSubmit={handleSubmit(onSubmitForm)} className='w-full '>
						<div className='flex flex-col items-center justify-center mt-7'>
							<FloatLabel>
								<div className='relative '>
									<InputText
										id='email'
										type='email'
										className='border p-2 w-full'
										{...register('email', {
											required: 'El Email es obligatorio',
										})}
									/>
								</div>
								<label>Email</label>
							</FloatLabel>
							{errors.email && (
								<span className='text-red-700 text-center w-full'>
									{errors.email.message}
								</span>
							)}
						</div>
						<div className='flex flex-col items-center justify-center w-full mt-10'>
							<FloatLabel>
								<div className='relative '>
									<textarea
										id='comment'
										rows={7}
										className='border p-1 w-[250px]'
										{...register('comment', {
											required: 'El Comentario es obligatorio',
										})}
									/>
								</div>
								<label>Consulta o comentario</label>
							</FloatLabel>
							{errors.comment && (
								<span className='text-red-700 text-center w-full'>
									{errors.comment.message}
								</span>
							)}
						</div>
						<div className='flex justify-evenly items-center mt-5'>
							<Button
								label='Enviar'
								type='submit'
								text
								className='p-3 bg-blue-700 rounded-xl font-semibold text-white border-2 border-white hover:bg-green-800'></Button>
							<Button
								label='Cancelar'
								onClick={() => {
									onHide();
									reset();
								}}
								text
								className='p-3 bg-red-700 rounded-xl font-semibold text-white border-2 border-white hover:bg-green-800'></Button>
						</div>
					</form>
				</div>
			</Dialog>
		</div>
	);
}
