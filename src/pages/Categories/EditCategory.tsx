import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Title from '@/components/ui/title';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AccountCardSkeleton } from '../Accounts/AccountCardSkeleton';
import { CircleChevronLeft } from 'lucide-react';
import { Category } from '@/store/categories/catgoriesSlice';
import {
	deleteCategory,
	fetchCategories,
	updateCategoryLimit,
	updateCategoryName,
} from '@/store/categories/categories.Thunk';

const EditCategory: React.FC = () => {
	const { categoryId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const category = useTypedSelector(
		(state) => state.categories.categories.find((category) => category.id === categoryId) as Category
	);

	const [isEditingName, setIsEditingName] = useState(false);
	const [isEditingLimit, setIsEditingLimit] = useState(false);

	const nameForm = useForm<{ name: string }>({
		resolver: zodResolver(
			z.object({
				name: z.string().min(2, 'Category name must be at least 2 characters.'),
			})
		),
		defaultValues: { name: category?.name || '' },
	});

	const limitForm = useForm<{ limit: number }>({
		resolver: zodResolver(
			z.object({
				limit: z
					.string()
					.regex(/^\d+$/, 'Limit must be a valid number.')
					.transform((val) => Number(val)),
			})
		),
		defaultValues: { limit: category?.category_limit || 0 },
	});

	useEffect(() => {
		if (!category) dispatch(fetchCategories());
	}, [category, dispatch]);

	const handleUpdateName = async (data: { name: string }) => {
		await dispatch(updateCategoryName({ id: category.id, name: data.name }));
		await dispatch(fetchCategories());
		setIsEditingName(false);
	};

	const handleUpdateLimit = async (data: { limit: number }) => {
		await dispatch(updateCategoryLimit({ id: category.id, category_limit: data.limit }));
		await dispatch(fetchCategories());
		setIsEditingLimit(false);
	};

	const deleteThisCategory = () => {
		dispatch(deleteCategory(categoryId as string));
		navigate('/categories');
	};

	if (!category)
		return (
			<div className="flex flex-col space-y-4">
				<Title name="Edit Category" />
				<AccountCardSkeleton />
			</div>
		);

	return (
		<div className="flex flex-col space-y-4">
			<Title name="Edit Category" />
			<Button className="justify-start" variant="link" onClick={() => navigate(`/categories/${categoryId}`)}>
				<CircleChevronLeft />
				Back to Category Overview
			</Button>

			<Card key={category.id} className="mx-4">
				<CardHeader>
					<div className="flex flex-col">
						<CardTitle
							className={`text-2xl font-light mb-2  ${category.type === 'spending' ? 'text-red-800' : 'text-green-800'}`}
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

			<div className="flex flex-col mx-4">
				{isEditingName ? (
					<Form {...nameForm}>
						<form onSubmit={nameForm.handleSubmit(handleUpdateName)} className="flex flex-col space-y-2">
							<FormField
								control={nameForm.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input className="w-[90vw] mx-0" placeholder="Enter new name" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="flex space-x-4">
								<Button type="submit">Save</Button>
								<Button variant="outline" onClick={() => setIsEditingName(false)}>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				) : (
					<Button className="justify-start px-0" variant="link" onClick={() => setIsEditingName(true)}>
						Change Name
					</Button>
				)}
			</div>

			{/* Update Account Balance */}
			<div className="flex flex-col mx-4">
				{isEditingLimit ? (
					<Form {...limitForm}>
						<form onSubmit={limitForm.handleSubmit(handleUpdateLimit)} className="flex flex-col space-y-2">
							<FormField
								control={limitForm.control}
								name="limit"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="w-[90vw] mx-0"
												type="number"
												placeholder="Enter new Limit"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="flex space-x-4">
								<Button type="submit">Save</Button>
								<Button variant="outline" onClick={() => setIsEditingLimit(false)}>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				) : (
					<Button className="justify-start px-0" variant="link" onClick={() => setIsEditingLimit(true)}>
						Change Limit
					</Button>
				)}
			</div>
			<Button
				type={'button'}
				variant={'link'}
				className="justify-start text-md text-red-800 mx-0"
				onClick={deleteThisCategory}
			>
				Delete Category
			</Button>
		</div>
	);
};

export default EditCategory;
