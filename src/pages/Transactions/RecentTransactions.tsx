import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { AppDispatch } from '@/store/store'
import { fetchAllTransactions } from '@/store/transactions/transactions.Thunk'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RecentTransactions = () => {
  

  const navigate = useNavigate()

   const transactions = useTypedSelector(state => state.transactions.transactions)
   const dispatch = useDispatch<AppDispatch>()
  
    useEffect(() => {
      dispatch(fetchAllTransactions())
    }, [dispatch])

    
  return (
    <div className='flex flex-col'>
        <Title name='Recent Transactions'/>

        <div className='flex flex-col mx-4'>
          <h2 className="text-primary text-xl">Latest transactions</h2>
          <div className="border border-primary rounded max-h-[60vh] overflow-y-auto">
            {/* Header Row */}
            <div className="flex w-full">
              <div className="w-1/6 text-sm text-start px-2 py-1 border-r border-primary">Date</div>
              <div className="w-1/6 text-sm text-start px-2 py-1 border-r border-primary">From</div>
              <div className="w-1/6 text-sm text-start px-2 py-1 border-r border-primary">To</div>
              <div className="w-1/6 text-sm text-start px-2 py-1 border-r border-primary">Amount</div>
              <div className="w-1/6 text-sm text-start px-2 py-1">Comment</div>
            </div>
            {/* Data Row */}
            {transactions.map(transaction => 
            <div className="flex border-t border-primary" key={transaction.id}>
              <div className="w-1/6 text-xs text-start px-2 py-1 border-r border-primary">{transaction.date}</div>
              <div className="w-1/6 text-xs text-start px-2 py-1 border-r border-primary">{transaction.account_from}</div>
              <div className="w-1/6 text-xs text-start px-2 py-1 border-r border-primary">{transaction.account_to ? transaction.account_to : transaction.category}</div>
              <div className="w-1/6 text-xs text-start px-2 py-1 border-r border-primary font-mono">{transaction.amount}</div>
              <div className="w-2/6 text-xs text-start px-2 py-1">{transaction.comment}</div>
            </div>
            )}
          </div>
        </div>

          <Button onClick={() => navigate('/')} variant={'default'} className='mx-4 mt-8 py-6'>
                Add Transaction
          </Button>
      
    </div>
  )
}

export default RecentTransactions
