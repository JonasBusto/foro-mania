import { Link } from 'react-router-dom';
import { useCategoryAction } from '../../hooks/useCategoryAction';

export const CategoryList = () => {
	const { categories } = useCategoryAction();

	return (
		<section className='flex flex-col flex-wrap items-start text-neutral-50 justify-start w-full sm:w-[48%] mt-3 ml-3'>
			<div>
				<h1 className='text-2xl font-bold mb-5 '>Categorias</h1>
			</div>
			<div className='flex flex-col items-start justify-start w-full '>
				{categories &&
					categories.map((category, index) => {
						return (
							<Link
								to=''
								key={index}
								className='flex flex-row flex-wrap items-center justify-between w-11/12 my-2 hover:text-neutral-400'>
								<hr
									className='flex flex-col flex-wrap items-center justify-between h-[8vh] pl-2'
									style={{ backgroundColor: category.color }}
								/>
								<div className='w-[95%] flex flex-row justify-between items-center'>
									<div className='flex flex-col flex-wrap '>
										<p className='ml-2 font-semibold text-xl'>
											{category.category}
										</p>
										<p className='ml-2'>{category.description}</p>
									</div>

									<div className='flex flex-col'>
										<p>{category.topics}</p>
									</div>
								</div>
								<hr className='h-[2px] bg-slate-300 w-full' />
							</Link>
						);
					})}
			</div>
		</section>
	);
};
