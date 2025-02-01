import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card';
import Title from '@/components/ui/title'
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { deleteCategory, fetchCategories } from '@/store/categories/categories.Thunk';
import { AppDispatch } from '@/store/store';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryOverview = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch] )

  const { categoryId } = useParams();

  const categories = useTypedSelector(state => state.categories)
  const thisCategory = categories.categories.find(category => category.id === categoryId)
  
  const deleteThisCategory = () => {
    dispatch(deleteCategory(thisCategory?.id))
    navigate('/categories')
  }

  const isSpending = thisCategory?.type === 'spending'

  return (
    <div className='fle flex-col space-y-2'>
        <Title name='Category Overview'/>

        <Card className='mx-4 py-2'>
          <CardContent className='flex justify-even'>
            <div className='flex flex-col items-start w-1/2'>
              <p className='pt-2 text-sm text-primary'>Name</p>
              <p className='text-lg'>{thisCategory?.name}</p>
              <p className='text-sm text-primary'>{isSpending ? 'Used' : 'Recieved'}</p>
              <p className='text-lg font-mono text-green-800'>+ 7000</p>
            </div>
            <div className='flex flex-col items-start'>
              <p className='pt-2 text-sm text-primary'>{isSpending ? 'Limit' : 'Expected'}</p>
              <p className='text-lg font-mono'>{thisCategory?.category_limit}</p>
              <p className='text-sm text-primary'>Left</p>
              <p className='text-lg font-mono text-red-800'>- 7000</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl m-4 text-primary">Latest transactions</h2>

        <div className="border border-primary rounded max-h-[250px] mx-4 overflow-y-auto">
            {/* Header Row */}
            <div className="flex sticky top-0 bg-white z-10">
              <div className="flex-1 text-md text-start px-2 py-1 border-r border-primary">Date</div>
              {isSpending && 
              <div className="flex-1 text-md text-start px-2 py-1 border-r border-primary">From</div>}
              <div className="flex-1 text-md text-start px-2 py-1">Amount</div>
            </div>
            {/* Data Row */}
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
        </div>
        
        <Button 
        type={'button'} 
        variant={'destructive'} 
        className='w-[90vw] m-4 p-6'
        onClick={deleteThisCategory}>
            Delete category
        </Button>

        
    </div>
  )
}

export default CategoryOverview
