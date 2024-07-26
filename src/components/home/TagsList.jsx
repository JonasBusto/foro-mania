import { Link } from 'react-router-dom';
import { Tags } from '../../helpers/Tags';

export const TagsList = () => {
	return (
		<section className='flex flex-col flex-wrap items-start justify-start w-full sm:w-[48%] mt-3 ml-3'>
			<div>
				<h1 className='text-2xl font-bold mb-5 '>Últimos Tags</h1>
			</div>
			<div className='flex flex-col items-start justify-start w-full'>
				{Tags &&
					Tags.map((tag, index) => {
						return (
							<Link
								to=''
								key={index}
								className='flex flex-row flex-wrap items-center justify-between w-11/12 my-2'>
								<div className='flex flex-row flex-wrap items-center justify-center'>
									{tag.img && (
										<img
											src={tag.img}
											alt='img Usercreator'
											width={30}
											className='mr-2 rounded-full'
										/>
									)}
									<div className='flex flex-col'>
										<h3 className='font-semibold text-xl'>
											{tag.tag}
										</h3>
										<div className='flex flex-row items-center ml-2'>
											<hr
												className={`flex flex-col flex-wrap items-center justify-between w-[10px] h-[1vh] ${tag.color}`}
											/>
											<p className='text-sm pl-1'>{tag.category}</p>
										</div>
									</div>
								</div>
								<div className='flex flex-col'>
									<p>Respuestas Nº</p>
									<p>Ult post Date</p>
								</div>
								<hr className='h-[2px] bg-slate-300 w-full' />
							</Link>
						);
					})}
			</div>
		</section>
	);
};
