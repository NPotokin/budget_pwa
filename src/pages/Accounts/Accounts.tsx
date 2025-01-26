import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Title from '@/components/ui/title'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { fetchAccounts } from '@/store/accounts/accounts.Thunk'
import { AppDispatch } from '@/store/store'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Accounts = () => {

  const accounts = useTypedSelector(state => state.accounts.list)

  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch] )

  const navigate = useNavigate()
  return (
    <div className='flex flex-col'>
      <Title name='Accounts'/>
      <div className='overflow-y-auto h-[65vh] space-y-1'>
        {accounts.map(account => 
        <Card className='mx-4' onClick={() => navigate('/accounts/account')}>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>{account.name}</CardTitle>
                <CardDescription>
                <div className="flex">
                  <p className='text-primary pr-2'>Amount:</p>
                  <p className='font-mono'>{account.balance}</p>
                </div>
                </CardDescription>
              </div>
              <div className="flex flex-col">
                <CardDescription>
                <div className="flex">
                  <p className='text-primary pr-2'>Spendings:</p>
                  <p className='font-mono text-red-800'>8,000000</p>
                </div>
                </CardDescription>
                <CardDescription>
                <div className="flex">
                  <p className='text-primary pr-2'>Earnings:</p>
                  <p className='font-mono text-green-800'>8,000</p>
                </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        )}
        
      
      </div>


      <Button variant={'default'} className='m-4 py-6' onClick={() => navigate('/accounts/add')}>
        Add Account
      </Button>


    </div>
  )
}

export default Accounts
