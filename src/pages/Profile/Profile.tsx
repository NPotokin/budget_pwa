import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient';
import ProfileCard from './ProfileCard';


const Profile: React.FC = () => {

  const navigate = useNavigate()


  const handleLogOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className='flex flex-col'>
      <Title name='Profile'/>

      <ProfileCard/>

      <Button 
        type={'button'} 
        variant={'link'} 
        className='justify-start text-lg mt-4 mx-1'
        onClick={() => navigate('/reset')}
      >
        Change Passsword
      </Button>
      <Button 
        type={'button'} 
        variant={'link'} 
        className='justify-start text-lg text-red-800 py-4 mx-1'
        onClick={() => handleLogOut()}
      >
        Sign out
      </Button>
    </div>
  )
}

export default Profile
