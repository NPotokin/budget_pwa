import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { Minus, Plus, ArrowLeftRight, ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Transactions: React.FC =  () => {

  const navigate = useNavigate()

  return (
    <div className='flex-flex-col w-full'>
      <Title name='Transactions'/>

      <div className='flex flex-col space-y-3'>

        <Calendar weekStartsOn={1} className='w-[95vw] mx-4'/>

        <div className='flex justify-evenly items-center m-4'>
          <div className='flex flex-col'>
            <p>From:</p>
            <Select
            onValueChange={(value)=> console.log(value)}>
              <SelectTrigger className="w-[35vw]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <ArrowRight size={40} className='text-primary'/>
          </div>
          <div className='flex flex-col'>
            <p>To:</p>
            <Select>
              <SelectTrigger className="w-[35vw]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col'>
          <h3 className='mx-8'>Comment:</h3>
          <div className='flex items-center mx-8'>
            <Textarea></Textarea>
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

        <Button variant={'default'} className='m-8 py-6'>
                Add Transaction
        </Button>

        <Button 
          variant={'link'} 
          className='py-4'
          onClick={() => navigate('/transactions')}>
                See Recent Transactions
        </Button>



        

      </div>
      

      


        
    </div>
  )
}

export default Transactions

