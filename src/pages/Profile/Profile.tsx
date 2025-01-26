import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { fetchProfile } from '@/store/profile/profile.Thunk';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Card, CardContent, CardFooter } from '@/components/ui/card';


const Profile = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const profile = useTypedSelector(state => state.profile)

  useEffect(() => {
      dispatch(fetchProfile())
    }, [dispatch] )

  const handleLogOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className='flex flex-col'>
      <Title name='Profile'/>

      <Card className='mx-4 py-2'>
        <CardContent>
          <p className='pt-2 text-sm text-primary'>Name</p>
          <p className='text-lg'>{profile.profile.firstName}</p>
          <p className='text-sm text-primary'>Surname</p>
          <p className='text-lg'>{profile.profile.lastName}</p>
          <p className='text-sm text-primary'>Email</p>
          <p className='text-lg'>{profile.profile.email}</p>
        </CardContent>
        {/* <CardFooter>
          <Button
          onClick={() => navigate('/')}
          >Edit Profile</Button>
        </CardFooter> */}
      </Card>
      <Button 
      type={'button'} 
      variant={'link'} 
      className='justify-start text-lg mt-12'
      onClick={() => navigate('/reset')}
      >
        Change Passsword
      </Button>
      <Button 
      type={'button'} 
      variant={'link'} 
      className='justify-start text-lg text-red-800 py-4'
      onClick={() => handleLogOut()}
      >
        Sign out
      </Button>
      

    </div>
  )
}

export default Profile
