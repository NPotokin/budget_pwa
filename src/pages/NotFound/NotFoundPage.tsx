import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const NotFoundPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center m-4 h-screen">
			<p className="text-2xl text-primary">Sorry, something went wrong</p>
			<Button className="p-4 my-4" onClick={() => navigate('/')}>
				Bo back
			</Button>
		</div>
	);
};

export default NotFoundPage;
