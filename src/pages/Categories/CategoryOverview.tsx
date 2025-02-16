import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Title from '@/components/ui/title'
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchCategories } from '@/store/categories/categories.Thunk';
import React, { useEffect } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { fetchAllTransactions } from '@/store/transactions/transactions.Thunk';
import { AccountCardSkeleton } from '../Accounts/AccountCardSkeleton';
import { CircleChevronLeft, Settings } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';

const CategoryOverview: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const categories = useTypedSelector(state => state.categories)
  const transactions = useTypedSelector(state => state.transactions)

  useEffect(() => {
    const checkCayegoriesAndTransacions = async () => {
      if(categories.categories.length === 0){
        await dispatch(fetchCategories())
      }
      if(transactions.transactions.length === 0){
        await dispatch(fetchAllTransactions())
      }
    }
    checkCayegoriesAndTransacions()
  }, [dispatch, categories, transactions.transactions.length] )

  const { categoryId } = useParams();

  const thisCategory = categories.categories.find(category => category.id === categoryId)
  const thisCategoryTransactions = transactions.transactions.filter(tr => tr.category === thisCategory?.name)
  
  if (categories.error || categories.loading || !thisCategory){
    return (
      <div className='fle flex-col space-y-2'>
        <Title name='Account Overview'/>
        <AccountCardSkeleton/>
        <h2 className="text-xl m-5 text-primary">Latest Category transactions:</h2>
        <AccountCardSkeleton/>
        <AccountCardSkeleton/>
      </div>

    )
  }



  return (
    <div className='fle flex-col space-y-2'>
        <Title name='Category Overview'/>
        <Button type={'button'} variant={'link'} onClick={() => navigate('/categories')}>
          <CircleChevronLeft/> Back to Categories
        </Button>

        <Card className='mx-4'>
          <CardHeader>
            <div className="flex flex-col">
              <CardTitle 
              className={`text-2xl font-light mb-2 flex justify-between ${thisCategory.type === "spending" ? "text-red-800" : "text-green-800"}`}
              >
                <p>{thisCategory.name}</p>
                <button className='hover:text-primary' onClick={() => navigate(`/categories/edit/${thisCategory.id}`)}>
                  <Settings size={28}/>
                </button>
              </CardTitle>
              <CardDescription>
                  <div className="flex justify-between">
                      <p className='text-primary pr-2 w-1/3 text-xs'>{thisCategory.type === 'spending' ? 'Budgeted:' : 'Expected:'}</p>
                      <p className='text-primary pr-2 w-1/3 text-xs'>{thisCategory.type === 'spending' ? 'Used:' : 'Recieved:'}</p>
                      <p className='text-primary pr-2 w-1/3 text-xs'>Left:</p>
                  </div>
                  <div className="flex justify-between">
                      <p className=' text-xl pr-2 w-1/3 font-mono'>{thisCategory.category_limit}</p>
                      <p className='text-red-800 text-xl  pr-2 w-1/3 font-mono'>{thisCategory.used}</p>
                      <p className='text-green-800 text-xl  pr-2 w-1/3 font-mono'>{thisCategory.category_limit! - thisCategory.used}</p>
                  </div>
              </CardDescription>
              </div>
          </CardHeader>
        </Card> 
        
        {thisCategoryTransactions[0] &&
          <h2 className="text-xl m-4 text-primary">Latest transactions</h2>
        }

        {thisCategoryTransactions.map(transaction =>
          <Card key={transaction.id} className='mx-4 my-0.5'>
              <div className="flex flex-col">
                  <h4 className='text-sm px-2 py-1 text-primary'>{transaction.comment}</h4>
                  <div className="flex justify-between px-2">
                      <p className='text-primary pr-2 w-1/3 text-xs'>Date:</p>
                      <p className='text-primary pr-2 w-1/3 text-xs'>
                        {transaction.account_to  ? 'To:' : 'From'}
                      </p>
                      <p className='text-primary pr-2 w-1/3 text-xs'>Amount:</p>
                  </div>
                  <div className="flex justify-between px-2 mb-2">
                      <p className=' text-md pr-2 w-1/3'>{transaction.date}</p>
                      <p className={`${transaction.account_from ? 'text-red-800' : 'text-green-800'} text-md pr-2 w-1/3`}>
                      {transaction.account_from ? transaction.account_from : transaction.account_to}
                      </p>
                      <p className={`${transaction.account_from ? 'text-red-800' : 'text-green-800'} text-md pr-2 w-1/3 font-mono`}>
                      {transaction.amount}</p>
                  </div>
              </div>
          </Card> 
        )}
    </div>
  )
}

export default CategoryOverview
