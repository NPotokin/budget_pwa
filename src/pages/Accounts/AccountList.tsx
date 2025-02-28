import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { AccountCardSkeleton } from './AccountCardSkeleton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchAccountsThisMonth } from '@/store/accounts/accounts.Thunk';
import { useEffect, useMemo } from 'react';

export const AccountList: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { list, loading, error } = useTypedSelector((state) => state.accounts);

	useEffect(() => {
		dispatch(fetchAccountsThisMonth());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const accountCards = useMemo(() => {
		return list.map((account) => (
			<Card key={account.id} className="mx-4" onClick={() => navigate(`/accounts/${account.id}`)}>
				<CardHeader>
					<div className="flex flex-col">
						<CardTitle className="text-2xl font-light mb-2">{account.name}</CardTitle>
						<CardDescription>
							<div className="flex justify-between">
								<p className="text-primary pr-2 w-1/3 text-xs">Balance:</p>
								<p className="text-primary pr-2 w-1/3 text-xs">Earnings:</p>
								<p className="text-primary pr-2 w-1/3 text-xs">Spendings:</p>
							</div>
							<div className="flex justify-between">
								<p className="text-xl pr-2 w-1/3 font-mono">{account.balance}</p>
								<p className="text-green-800 text-xl pr-2 w-1/3 font-mono">{account.earning}</p>
								<p className="text-red-800 text-xl pr-2 w-1/3 font-mono">{account.spending}</p>
							</div>
						</CardDescription>
					</div>
				</CardHeader>
			</Card>
		));
	}, [list, navigate]);

	if (loading && list.length === 0) {
		return (
			<>
				<AccountCardSkeleton />
				<AccountCardSkeleton />
				<AccountCardSkeleton />
			</>
		);
	}

	if (error) {
		return <p className="text-red-500 text-center py-4">Failed to load accounts.</p>;
	}

	if (list.length === 0) {
		return <p className="text-primary text-lg text-center py-6">No accounts available</p>;
	}

	return <>{accountCards}</>;
};
