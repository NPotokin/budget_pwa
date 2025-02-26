import { Button } from '@/components/ui/button';
import Title from '@/components/ui/title';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchCategoriesThisMonth } from '@/store/categories/categories.Thunk';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from './CategoryCard';
import { AccountCardSkeleton } from '../Accounts/AccountCardSkeleton';

const Categories: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const categories = useTypedSelector((state) => state.categories);
	const [selectedDate] = useState(new Date());
	

	useEffect(() => {
		dispatch(fetchCategoriesThisMonth())
	}, [dispatch, selectedDate]);

	if (categories.error || categories.loading) {
		return (
			<div className="flex flex-col space-y-2">
				<Title name="Categories" />
				<AccountCardSkeleton />
				<AccountCardSkeleton />
				<AccountCardSkeleton />
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			<Title name="Categories" />

			<div className="overflow-auto space-y-1 h-[64vh]">
				{categories.categories.map((category) => (
					<CategoryCard key={category.id} category={category} />
				))}
			</div>

			<Button
				type={'button'}
				variant={'default'}
				className="mx-4 p-6"
				onClick={() => navigate('/categories/add')}
			>
				Add Category
			</Button>
		</div>
	);
};

export default Categories;
