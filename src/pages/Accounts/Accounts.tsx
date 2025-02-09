import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { useNavigate } from 'react-router-dom'
import { AccountList } from './AccountList'

const Accounts: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col'>
      <Title name='Accounts'/>
      
      <div className='overflow-y-auto h-[64vh] space-y-1'>
        <AccountList/>
      </div>

      <Button variant={'default'} className='m-4 py-6' onClick={() => navigate('/accounts/add')}>
        Add Account
      </Button>
    </div>
  )
}

export default Accounts
