import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Recovery() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleResetPassword = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		setMessage('');
		navigate('/login');

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset`,
		});

		if (error) {
			console.log('Error sending reset email:', error.message);
		} else {
			console.log('Password reset email sent');
		}
	};

	return (
		<div className="mx-4 h-screen my-auto flex flex-col justify-center">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Password Recovery</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleResetPassword}>
						<div className="flex flex-col gap-6 items-center">
							<div className="grid gap-2">
								<Label htmlFor="email" className="ml-4">
									Email
								</Label>
								<Input
									className="max-w-[78vw]"
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								{message && <p className="text-green-800 text-sm mx-auto">{message}</p>}
								{error && <p className="text-red-800 text-sm mx-auto">{error}</p>}
							</div>

							<Button type="submit" className="w-[78vw] mb-12">
								Send Reset Link
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
