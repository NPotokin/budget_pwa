import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchProfile } from '@/store/profile/profile.Thunk';
import { useEffect } from 'react';


const ProfileCard: React.FC = () => {

    const dispatch = useAppDispatch()
    const profile = useTypedSelector(state => state.profile)
  
    useEffect(() => {
        dispatch(fetchProfile())
      }, [dispatch] )


    if(profile.loading) {
    return (
      <div className="flex flex-col space-y-3 items-center">
        <Skeleton className="h-[200px] w-[90vw] rounded-xl">
          <div className='flex flex-col items-start mx-4 py-2'>
            <Skeleton className="h-4 w-[50px] mt-4" />
            <Skeleton className="h-4 w-[100px] mt-2" />
            <Skeleton className="h-4 w-[50px] mt-4" />
            <Skeleton className="h-4 w-[100px] mt-2" />
            <Skeleton className="h-4 w-[50px] mt-4" />
            <Skeleton className="h-4 w-[150px] mt-2" />
          </div>
        </Skeleton>
      </div>
    )}

    return (
      <Card className='mx-4 py-2'>
        <CardContent>
          <p className='pt-2 text-sm text-primary'>Name</p>
          <p className='text-lg'>{profile.profile.first_name}</p>
          <p className='text-sm text-primary'>Surname</p>
          <p className='text-lg'>{profile.profile.last_name}</p>
          <p className='text-sm text-primary'>Email</p>
          <p className='text-lg'>{profile.profile.email}</p>
        </CardContent>
      </Card>
    )
}

export default ProfileCard
