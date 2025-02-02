import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import Title from '@/components/ui/title'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { fetchAccounts } from '@/store/accounts/accounts.Thunk'
import { fetchCategories } from '@/store/categories/categories.Thunk'
import { AppDispatch } from '@/store/store'
import { addTransaction, fetchTransactions } from '@/store/transactions/transactions.Thunk'
import clsx from 'clsx'
import { Minus, Plus, ArrowLeftRight, ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { data, useNavigate } from 'react-router-dom'

const Transactions: React.FC =  () => {

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const accounts = useTypedSelector(state => state.accounts)
  const categories = useTypedSelector(state => state.categories.categories).filter(category => category.type === 'spending')

  useEffect(() => {
    dispatch(fetchAccounts())
    dispatch(fetchCategories())
  }, [dispatch])

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setTransaction({...transaction, date: date})
  };

  const [transaction, setTransaction] = useState({
    date: new Date(),
    amount: '',
    account_from: '',
    account_to: null,
    category: '',
    comment: ''
  })

  return (
    <div className='flex-flex-col w-full'>
      <Title name='Transactions'/>

      <div className='flex flex-col space-y-3'>

        <Calendar weekStartsOn={1} className='w-[95vw] mx-4' selected={selectedDate} onDayClick={handleDayClick}/>

        <div className='flex justify-evenly items-center m-4'>
          <div className='flex flex-col'>
            
            <p>From:</p>
            <Select
            onValueChange={(value)=> setTransaction({...transaction, account_from: value})}>
              <SelectTrigger className="w-[35vw]">
                <SelectValue placeholder="Select a Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {accounts.list.map(account => 
                  <SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <ArrowRight size={40} className='text-primary'/>
          </div>
          <div className='flex flex-col'>
            
            <p>To:</p>
            <Select onValueChange={(value)=> setTransaction({...transaction, category: value})}>
              <SelectTrigger className="w-[35vw]">
                <SelectValue placeholder="Select categoty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map(categoty => 
                  <SelectItem key={categoty.id} value={categoty.id}>{categoty.name}</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Input type='number' placeholder="Amount" min={0} required onChange={(e) => setTransaction({...transaction, amount: e.target.value}) }/>

        <div className='flex flex-col'>
          <h3 className='mx-8'>Comment:</h3>
          <div className='flex items-center mx-8'>
            <Textarea onChange={(e) => setTransaction({...transaction, comment: e.target.value})}/>
          </div>
        </div>

        <div className='flex justify-between pt-2 mx-8'>
          <button className='w-[25vw] h-16 rounded-2xl bg-green-800 items-center justify-center text-secondary flex'>
            <Plus size={40} />
          </button>
          <button className='w-[25vw] h-16 rounded-2xl bg-primary items-center justify-center text-secondary flex'>
            <ArrowLeftRight size={40} />
          </button>
          <button className='w-[25vw] h-16 rounded-2xl bg-red-800 items-center justify-center text-secondary flex'>
            <Minus size={40} />
          </button>
        </div>

        <Button variant={'default'} className='m-8 py-6' onClick={() => dispatch(addTransaction(transaction))}>
                Add Transaction
        </Button>

        <Button 
          variant={'link'} 
          className='py-4'
          onClick={() => {
            navigate('/transactions')
          }}
        >
                See Recent Transactions
        </Button>



        

      </div>
      

      


        
    </div>
  )
}

export default Transactions

