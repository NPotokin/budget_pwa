import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card';
import Title from '@/components/ui/title'
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { deleteCategory, fetchCategories } from '@/store/categories/categories.Thunk';
import { AppDispatch } from '@/store/store';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryCard } from './CategoryCard';
import { fetchAllTransactions } from '@/store/transactions/transactions.Thunk';
import { AccountCardSkeleton } from '../Accounts/AccountCardSkeleton';

const CategoryOverview = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchAllTransactions())
  }, [dispatch] )

  const { categoryId } = useParams();

  const categories = useTypedSelector(state => state.categories)
  const transactions = useTypedSelector(state => state.transactions)
  const thisCategory = categories.categories.find(category => category.id === categoryId)
  const thisCategoryTransactions = transactions.transactions.filter(tr => tr.category === thisCategory?.name)
  
  const deleteThisCategory = () => {
    dispatch(deleteCategory(thisCategory?.id))
    navigate('/categories')
  }

  if (categories.error || categories.loading || !thisCategory){
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
        <Title name='Category Overview'/>

        <CategoryCard category={thisCategory}/>

        <h2 className="text-xl m-4 text-primary">Latest transactions</h2>

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

        
        
        <Button 
        type={'button'} 
        variant={'link'} 
        className='justify-start text-lg text-red-800 py-4 mx-1'
        onClick={deleteThisCategory}>
            Delete category
        </Button>

        
    </div>
  )
}

export default CategoryOverview
