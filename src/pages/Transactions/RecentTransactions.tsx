import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { fetchAllTransactions } from '@/store/transactions/transactions.Thunk'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionCard } from './TransactionCard'
import { useAppDispatch } from '@/hooks/useAppDispatch'

const RecentTransactions: React.FC = () => {
  

  const navigate = useNavigate()

   const transactions = useTypedSelector(state => state.transactions.transactions)
   const dispatch = useAppDispatch()
  
    useEffect(() => {
      dispatch(fetchAllTransactions())
    }, [dispatch])

    
  return (
    <div className='flex flex-col'>
        <Title name='Recent Transactions'/>

        <div className="h-[65vh] overflow-y-auto">
        {transactions.length === 0 
          ? <p className='mx-4 h-[65vh] py-24 text-primary text-lg'>No recent transactions</p>
          : transactions.map(transaction => <TransactionCard transaction={transaction}/>)
        }
        </div>

        

        <Button onClick={() => navigate('/')} variant={'default'} className='mx-4 mt-8 py-6'>
          Add Transaction
        </Button>
      
    </div>
  )
}

export default RecentTransactions
