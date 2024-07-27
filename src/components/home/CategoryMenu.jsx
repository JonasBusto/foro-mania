/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Categories } from '../../helpers/Categories';
import { Tags } from '../../helpers/Tags';
import { Button } from 'primereact/button';

export const CategoryMenu = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedTag, setSelectedTag] = useState(null);

	const categoryTemplate = (option) => {
		return (
			<div className='flex items-center'>
				<div className={`w-2 h-8 rounded-full mr-2 ${option.color}`}></div>
				<div>
					<div>{option.category}</div>
					<p className='text-gray-500 text-[13px]'>{option.description}</p>
				</div>
			</div>
		);
	};

	return (
		<section className='flex flex-row flex-wrap items-center justify-between w-full z-0'>
			<div className='flex flex-row flex-wrap items-center justify-around w-full sm:w-3/5 z-0'>
				<Dropdown
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.value)}
					options={Categories}
					optionLabel='category'
					placeholder='Categorias'
					filter
					className='border-4 border-yellow-500 w-1/3 rounded-xl hover:border-yellow-700'
					itemTemplate={categoryTemplate}
				/>
				<Dropdown
					value={selectedTag}
					onChange={(e) => setSelectedTag(e.value)}
					options={Tags}
					optionLabel='tag'
					placeholder='Tags'
					filter
					className='border-4 border-blue-400 w-1/3 rounded-xl hover:border-blue-800'
				/>
			</div>

			<div className='flex-row flex-wrap items-center sm:justify-center lg:justify-end w-2/5 hidden sm:flex z-0'>
				<Button className='p-2 rounded-xl border mx-2 bg-red-800 text-white font-semibold hover:bg-red-600'>
					Categorias
				</Button>
				<Button className='p-2 px-4 rounded-xl border mx-2 font-semibold text-white bg-orange-500 hover:bg-orange-300'>
					Últimos
				</Button>
				<Button className='p-2 px-5 rounded-xl border mx-2 font-semibold text-white bg-green-600 hover:bg-green-400'>
					Top
				</Button>
			</div>
		</section>
	);
};
