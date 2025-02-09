import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchAccounts, deleteAccount } from '@/store/accounts/accounts.Thunk';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AccountCard } from './AccountCard';
import { AccountCardSkeleton } from './AccountCardSkeleton';
import { Card } from '@/components/ui/card';
import { fetchAllTransactions } from '@/store/transactions/transactions.Thunk';

const AccountOverview: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchAccounts())
    dispatch(fetchAllTransactions())
  }, [dispatch] )

  const { accountId } = useParams();

  const accounts = useTypedSelector(state => state.accounts)
  const thisAccount = accounts.list.find(account => account.id === accountId)
  const transactions = useTypedSelector(state => state.transactions.transactions)
  const thisAccountTransactionsTo = transactions.filter(transaction => transaction.account_to === thisAccount?.name) // use || ???
  const thisAccountTransactionsFrom = transactions.filter(transaction => transaction.account_from === thisAccount?.name)
  const thisAccountTransactions = thisAccountTransactionsFrom.concat(thisAccountTransactionsTo)

  const deleteThisAccout = () => {
    dispatch(deleteAccount(thisAccount!.id))
    navigate('/accounts')
  }

  const getTransactionTarget = (transaction, thisAccount) => {
    if (transaction.account_from === thisAccount.name) {
      return transaction.account_to || transaction.category;
    }
    return transaction.account_from || transaction.category;
  };


  if (accounts.error || accounts.loading || !thisAccount){
    return (
      <div className='fle flex-col space-y-2'>
        <Title name='Account Overview'/>
        <AccountCardSkeleton/>
        <h2 className="text-xl m-5 text-primary">Latest Account transactions:</h2>
        <AccountCardSkeleton/>
        <AccountCardSkeleton/>
      </div>

    )
  }

  return (
    <div className='fle flex-col space-y-2'>
        <Title name='Account Overview'/>

        <AccountCard account={thisAccount}/>

        {thisAccountTransactions[0] && 
          <h2 className="text-xl m-5 text-primary">Latest Account transactions:</h2>
        }

        <div className="max-h-[30vh] overflow-y-auto">
          {thisAccountTransactions.map(transaction =>

          <Card key={transaction.id} className='mx-4 my-0.5'>
              <div className="flex flex-col">
                  <h4 className='text-sm px-2 py-1 text-primary'>{transaction.comment}</h4>
                  <div className="flex justify-between px-2">
                      <p className='text-primary pr-2 w-1/3 text-xs'>Date:</p>
                      <p className='text-primary pr-2 w-1/3 text-xs'>
                        {transaction.account_from === thisAccount.name ? 'To:' : 'From'}
                      </p>
                      <p className='text-primary pr-2 w-1/3 text-xs'>Amount:</p>
                  </div>
                  <div className="flex justify-between px-2 mb-2">
                      <p className=' text-md pr-2 w-1/3'>{transaction.date}</p>
                      <p className={`${transaction.account_from === thisAccount.name ? 'text-red-800' : 'text-green-800'} text-md pr-2 w-1/3`}>
                      {getTransactionTarget(transaction, thisAccount)}</p>
                      <p className={`${transaction.account_from === thisAccount.name ? 'text-red-800' : 'text-green-800'} text-md pr-2 w-1/3 font-mono`}>
                      {transaction.amount}</p>
                  </div>
              </div>
          </Card> 
          )}
            
        </div>
        


        
        <Button 
        type={'button'} 
        variant={'link'} 
        className='justify-start text-lg text-red-800 py-4 mx-1'
        onClick={deleteThisAccout}>
            Delete Account
        </Button>

        
    </div>
  )
}

export default AccountOverview
