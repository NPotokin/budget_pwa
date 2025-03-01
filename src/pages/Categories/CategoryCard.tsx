import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchCategoriesThisMonth } from '@/store/categories/categories.Thunk';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountCardSkeleton } from '../Accounts/AccountCardSkeleton';

export const CategoryCard: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { categories, loading, error } = useTypedSelector((state) => state.categories);

	useEffect(() => {
		dispatch(fetchCategoriesThisMonth());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const categoriesCards = useMemo(() => {
		return categories.map((category) => (
			<Card className="mx-4" onClick={() => navigate(`/categories/${category.id}`)}>
				<CardHeader>
					<div className="flex flex-col">
						<CardTitle
							className={`text-2xl font-light mb-2 flex justify-between ${
								category.type === 'spending' ? 'text-red-800' : 'text-green-800'
							}`}
						>
							<p>{category.name}</p>
						</CardTitle>
						<CardDescription>
							<div className="flex justify-between">
								<p className="text-primary pr-2 w-1/3 text-xs">
									{category.type === 'spending' ? 'Budgeted:' : 'Expected:'}
								</p>
								<p className="text-primary pr-2 w-1/3 text-xs">
									{category.type === 'spending' ? 'Used:' : 'Recieved:'}
								</p>
								<p className="text-primary pr-2 w-1/3 text-xs">Left:</p>
							</div>
							<div className="flex justify-between">
								<p className=" text-xl pr-2 w-1/3 font-mono">{category.category_limit}</p>
								<p className="text-red-800 text-xl  pr-2 w-1/3 font-mono">{category.used}</p>
								<p className="text-green-800 text-xl  pr-2 w-1/3 font-mono">
									{category.category_limit! - category.used}
								</p>
							</div>
						</CardDescription>
					</div>
				</CardHeader>
			</Card>
		));
	}, [categories, navigate]);

	if (loading && categories.length === 0) {
			return (
				<>
					<AccountCardSkeleton />
					<AccountCardSkeleton />
					<AccountCardSkeleton />
				</>
			);
		}
	
		if (error) {
			return <p className="text-red-500 text-center py-4">Failed to load categories.</p>;
		}
	
		if (categories.length === 0) {
			return <p className="text-primary text-lg text-center py-6">No categories available</p>;
		}
	
		return <>{categoriesCards}</>;
};
