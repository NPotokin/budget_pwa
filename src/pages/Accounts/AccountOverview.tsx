import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card';
import Title from '@/components/ui/title'
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchAccounts, deleteAccount } from '@/store/accounts/accounts.Thunk';
import { AppDispatch } from '@/store/store';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const AccountOverview = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch] )

  const { accountId } = useParams();

  const accounts = useTypedSelector(state => state.accounts)
  const thisAccount = accounts.list.find(account => account.id === accountId)
  
  const deleteThisAccout = () => {
    dispatch(deleteAccount(thisAccount?.id))
    navigate('/accounts')
  }

  return (
    <div className='fle flex-col space-y-2'>
        <Title name='Account Overview'/>

        <Card className='mx-4 py-2'>
        <CardContent className='flex justify-even'>
          <div className='flex flex-col items-start w-1/2'>
            <p className='pt-2 text-sm text-primary'>Name</p>
            <p className='text-lg'>{thisAccount?.name}</p>
            <p className='text-sm text-primary'>Earnings</p>
            <p className='text-lg font-mono text-green-800'>+ 7000</p>
          </div>
          <div className='flex flex-col items-start'>
            <p className='pt-2 text-sm text-primary'>Balance</p>
            <p className='text-lg font-mono'>{thisAccount?.balance}</p>
            <p className='text-sm text-primary'>Spendings</p>
            <p className='text-lg font-mono text-red-800'>- 7000</p>
          </div>
        </CardContent>
      </Card>

        <h2 className="text-xl m-4 text-primary">Latest transactions</h2>

        <div className="border border-primary rounded max-h-[30vh] mx-4 overflow-y-auto">
            {/* Header Row */}
            <div className="flex sticky top-0 bg-white z-10">
              <div className="flex-1 text-md text-start px-2 py-1 border-r border-primary">Date</div>
              <div className="flex-1 text-md text-start px-2 py-1 border-r border-primary">From</div>
              <div className="flex-1 text-md text-start px-2 py-1 border-r border-primary">To</div>
              <div className="flex-1 text-md text-start px-2 py-1">Amount</div>
            </div>
            {/* Data Row */}
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
        </div>
        


        
        <Button 
        type={'button'} 
        variant={'destructive'} 
        className='w-[90vw] m-4 p-6'
        onClick={deleteThisAccout}>
            Delete Account
        </Button>

        
    </div>
  )
}

export default AccountOverview
