import { Button } from '@/components/ui/button';
import Title from '@/components/ui/title';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from './CategoryCard';

const Categories: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col">
			<Title name="Categories" />

			<div className="overflow-auto space-y-1 h-[64vh]">
					<CategoryCard/>
			</div>

			<Button type="button" variant="default" className="mx-4 p-6" onClick={() => navigate('/categories/add')}>
				Add Category
			</Button>
		</div>
	);
};

export default Categories;
