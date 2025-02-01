import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Title from '@/components/ui/title'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { fetchCategories } from '@/store/categories/categories.Thunk'
import { AppDispatch } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const categories = useTypedSelector(state => state.categories)
  const [isSpending, setisSpending] = useState(true)

  const switchToSpending = () => {
    setisSpending(true)
  }

  const switchToEarning = () => {
    setisSpending(false)
  }

  const spendingCategories = categories.categories.filter(({type}) => type === 'spending')
  const earningCategories = categories.categories.filter(({type}) => type === 'income')

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div className='flex flex-col'>

      <Title name='Categories'/>

      <div className="overflow-auto space-y-1 h-[50vh]">
       {(isSpending
        ? spendingCategories
        : earningCategories
       ).map(category => 
       
        <Card className='mx-4'
        onClick={() => navigate(`/categories/${category.id}`)}>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>
                <div className="flex">
                  <p className='text-primary pr-2'>
                    {isSpending ? 'Budgeted:' : 'Expected:'}
                    </p>
                  <p className='font-mono'>{category.category_limit}</p>
                </div>
                </CardDescription>
              </div>
              <div className="flex flex-col">
                <CardDescription>
                <div className="flex">
                  <p className='text-primary pr-2'>
                  {isSpending ? 'Used:' : 'Recieved:'}
                  </p>
                  <p className='font-mono text-red-800'>8,000000</p>
                </div>
                </CardDescription>
                <CardDescription>
                <div className="flex">
                  <p className='text-primary pr-2'>Left:</p>
                  <p className='font-mono text-green-800'>8,000</p>
                </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        )}
      </div>

      <div className='flex justify-evenly m-4'>
          <button 
          onClick={switchToEarning}
          className='w-full h-16 rounded-xl bg-green-800 items-center justify-center text-secondary p-1 mr-1'>
            Income
          </button>
          <button 
          onClick={switchToSpending}
          className='w-full h-16 rounded-xl bg-red-800 items-center justify-center text-secondary p-1 ml-1'>
            Spending
          </button>
        </div>

      <Button type={'button'} variant={'default'} className='mx-4 p-6' onClick={() => navigate('/categories/add')}>
        Add Category
      </Button>

    </div>
    
  )
}

export default Categories
