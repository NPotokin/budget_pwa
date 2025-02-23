import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(error.message);
		} else {
			navigate('/');
		}
	};

	return (
		<div className="mx-4 h-screen my-auto flex flex-col justify-center">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
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
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password" className="ml-4">
									Password
								</Label>
								<Input
									className="max-w-[78vw]"
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							{error && <p className="text-red-800 text-sm">{error}</p>}
							<Button type="submit" className="w-[78vw]">
								Login
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<Button
								variant="link"
								className="underline underline-offset-4"
								onClick={() => navigate('/registration')}
							>
								Sign up
							</Button>
						</div>
						<div className="flex justify-center items-center">
							<Button
								variant="link"
								className="cursor-pointer mx-auto"
								onClick={() => navigate('/recover')}
							>
								Forgot Password?
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
