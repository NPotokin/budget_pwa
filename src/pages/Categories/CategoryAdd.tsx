import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Title from '@/components/ui/title';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '@/store/categories/categories.Thunk';
import { Category } from '@/store/categories/catgoriesSlice';
import { CircleChevronLeft } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';

// Define the schema for form validation
const FormSchema = z.object({
	categoryName: z.string().min(2, {
		message: 'Category name must be at least 2 characters.',
	}),
	categoryLimit: z
		.number({ invalid_type_error: 'Category limit must be a number.' })
		.positive('Category limit must be a positive number.')
		.or(z.string().regex(/^\d+$/, 'Category limit must be a valid number.')),
	categoryType: z.enum(['spending', 'income'], {
		required_error: 'Category type is required.',
	}),
});

const CategoryAdd: React.FC = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			categoryName: '',
			categoryLimit: '',
			categoryType: 'spending',
		},
	});

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
		const category = {
			name: data.categoryName,
			category_limit: data.categoryLimit,
			type: data.categoryType,
		};
		dispatch(addCategory(category as Category));
		navigate('/categories');
	}

	return (
		<div className="flex flex-col space-y-6">
			<Title name="Add Category" />
			<Button type={'button'} variant={'link'} className="justify-start" onClick={() => navigate('/categories')}>
				<CircleChevronLeft /> Back to Categories
			</Button>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Account Name Field */}
					<FormField
						control={form.control}
						name="categoryName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter category name" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Category Type Field */}
					<FormField
						control={form.control}
						name="categoryType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category Type</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger className="mx-4 w-[90vw]">
											<SelectValue placeholder="Select category type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="spending">Spendings</SelectItem>
											<SelectItem value="income">Earnings</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Account Amount Field */}
					<FormField
						control={form.control}
						name="categoryLimit"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category Limit</FormLabel>
								<FormControl>
									<Input placeholder="Enter category limit" type="number" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button type="submit" variant={'default'} className="m-4 py-6 w-[90vw]">
						Add Category
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CategoryAdd;
