/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const CategoryBox = ({ category }) => {
	return (
		<Link
			to={`/topic-list?category=${category.uid}`}
			className='flex flex-col h-24 items-start px-4 justify-center bg-[#2e2e2e] border-l-4'
			style={{ borderLeft: `10px solid ${category.color}` }}>
			<div className='flex flex-col'>
				<p className='text-lg font-semibold text-white'>{category.title}</p>
				<p className='text-sm text-gray-300 leading-4 lg:leading-normal'>
					{category.description}
				</p>
			</div>
			<div className=' text-gray-800 font-semibold'>{category.topics}</div>
		</Link>
	);
};

export default CategoryBox;
