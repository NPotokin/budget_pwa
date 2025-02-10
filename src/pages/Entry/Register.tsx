import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null); 
  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setPasswordError(null); 

    // Проверка совпадения паролей
    if (password !== repeatPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (repeatPassword && e.target.value !== repeatPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError(null); 
    }
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError(null); 
    }
  };

  return (
    <div className='mx-4 h-screen my-auto flex flex-col justify-center'>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6 items-center">
              <div className="grid gap-2">
                <Label htmlFor="firstName" className='ml-4'>Your Name</Label>
                <Input
                  className='max-w-[78vw]'
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName" className='ml-4'>Your Last Name</Label>
                <Input
                  className='max-w-[78vw]'
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className='ml-4'>Email</Label>
                <Input
                  className='max-w-[78vw]'
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className='ml-4'>Password</Label>
                <Input
                  className='max-w-[78vw]'
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange} 
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="repeatPassword" className='ml-4'>Repeat Password</Label>
                <Input
                  className='max-w-[78vw]'
                  id="repeatPassword"
                  type="password"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange} 
                  required
                />
              </div>
              {passwordError && <p className="text-red-800 text-sm">{passwordError}</p>}
              {error && <p className="text-red-800 text-sm">{error}</p>}
              <Button type="submit" className="w-[78vw]" disabled={!!passwordError}>
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Button
                variant="link"
                className="underline underline-offset-4"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
