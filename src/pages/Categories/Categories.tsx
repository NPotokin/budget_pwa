import { Button } from '@/components/ui/button';
import Title from '@/components/ui/title';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchCategoriesThisMonth } from '@/store/categories/categories.Thunk';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from './CategoryCard';
import { AccountCardSkeleton } from '../Accounts/AccountCardSkeleton';

const Categories: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { categories, loading, error } = useTypedSelector((state) => state.categories);

	// Fetch categories only if not already loaded or if the list is empty
	useEffect(() => {
		if (!loading && !error && categories.length === 0) {
			dispatch(fetchCategoriesThisMonth());
		}
	}, [dispatch, categories.length, loading, error]);

	return (
		<div className="flex flex-col">
			<Title name="Categories" />

			{/* Loading State */}
			{loading ? (
				<>
					<AccountCardSkeleton />
					<AccountCardSkeleton />
					<AccountCardSkeleton />
				</>
			) : error ? (
				<p className="text-red-500 text-center py-4">
					Failed to load categories.
					<Button variant="link" onClick={() => dispatch(fetchCategoriesThisMonth())}>
						Retry
					</Button>
				</p>
			) : categories.length === 0 ? (
				<p className="text-gray-500 text-center py-4">No categories found.</p>
			) : (
				<div className="overflow-auto space-y-1 h-[64vh]">
					{categories.map((category) => (
						<CategoryCard key={category.id} category={category} />
					))}
				</div>
			)}

			<Button type="button" variant="default" className="mx-4 p-6" onClick={() => navigate('/categories/add')}>
				Add Category
			</Button>
		</div>
	);
};

export default Categories;
