/* eslint-disable react/prop-types */
import { ProgressSpinner } from 'primereact/progressspinner';
import { Banner } from '../../components/home/Banner';
import { useUserAction } from '../../hooks/useUserAction';

export function UsersList({ onSelectUser }) {
	const { users, allUsersStatus } = useUserAction();

	return (
		<div>
			<Banner />
			<h2 className='text-neutral-200 text-center font-bold text-2xl'>
				Usuarios
			</h2>
			{allUsersStatus === 'Cargando' && (
				<div className='min-h-[50vh] flex items-center'>
					<ProgressSpinner />
				</div>
			)}
			<div className='flex flex-row flex-wrap items-center justify-around'>
				{users.map((user) => (
					<div
					key={user.uid}
					className='text-neutral-200 flex flex-col w-[150px] h-[20vh] m-4 items-center'
				>
					<img
						src={user.photoProfile}
						alt={user.fullName}
						width={50}
						height={50}
						className='rounded'
					/>
					<span className='text-center m-2 font-bold text-xl flex-grow'>
						{user.fullName}
					</span>
					<button
						onClick={() => onSelectUser(user)}
						className='w-40 text-center py-2 px-5 text-sm font-medium text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-lg border border-[#61dafb]'
					>
						<i className='pi pi-comments mr-3'></i>Iniciar Chat
					</button>
				</div>
				
				))}
			</div>
		</div>
	);
}
