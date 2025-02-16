import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Title from '@/components/ui/title';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createAccount } from '@/store/accounts/accounts.Thunk';
import { supabase } from '@/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Account } from '@/store/accounts/accountsSlice';
import { CircleChevronLeft } from 'lucide-react';

const FormSchema = z.object({
	name: z.string().min(2, {
		message: 'Account name must be at least 2 characters.',
	}),
	balance: z
		.number({ invalid_type_error: 'Account amount must be a number.' })
		.positive('Account amount must be a positive number.')
		.or(z.string().regex(/^\d+$/, 'Account amount must be a valid number.')),
});

const AddAccount: React.FC = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			balance: '',
		},
	});

	const navigate = useNavigate();
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				setUserId(user.id);
			}
		};

		fetchUser();
	}, []);

	const dispatch = useDispatch<AppDispatch>();

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		if (userId) {
			const accountData = {
				...data,
				user_id: userId,
			};
			dispatch(createAccount(accountData as Account));
			navigate('/accounts');
		} else {
			console.error('User ID is not available.');
		}
	};

	return (
		<div className="flex flex-col space-y-6">
			<Title name="Add Account" />
			<Button
				type={'button'}
				variant={'link'}
				className="justify-start"
				onClick={() => navigate('/accounts')}
			>
				<CircleChevronLeft /> Back to Accounts
			</Button>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					{/* Account Name Field */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Account Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter account name" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Account Amount Field */}
					<FormField
						control={form.control}
						name="balance"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Account Balance</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter account balance"
										type="text"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button
						type="submit"
						variant={'default'}
						className="mx-4 py-6 w-[90vw]"
					>
						Add Account
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default AddAccount;
