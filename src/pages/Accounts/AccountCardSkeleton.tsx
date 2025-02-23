import { Skeleton } from '@/components/ui/skeleton';

export const AccountCardSkeleton: React.FC = () => {
	return (
		<div className="flex flex-col space-y-3 items-center">
			<Skeleton className="h-[140px] w-[90vw] rounded-xl">
				<div className="flex flex-col items-start mx-4 py-2">
					<Skeleton className="h-5 w-[150px] mt-4" />
					<div className="flex justify-start w-full">
						<div className="flex flex-col">
							<Skeleton className="h-4 w-[50px] mt-4 mr-12" />
							<Skeleton className="h-5 w-[75px] mr-8 mt-4" />
						</div>
						<div className="flex flex-col">
							<Skeleton className="h-4 w-[50px] mt-4 mr-12" />
							<Skeleton className="h-5 w-[75px] mr-8 mt-4" />
						</div>
						<div className="flex flex-col">
							<Skeleton className="h-4 w-[50px] mt-4 mr-12" />
							<Skeleton className="h-5 w-[75px] mr-8 mt-4" />
						</div>
					</div>
				</div>
			</Skeleton>
		</div>
	);
};
