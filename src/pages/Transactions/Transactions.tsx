import { Button } from '@/components/ui/button'
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

const Transactions: React.FC =  () => {
  return (
    <div className='flex-flex-col'>
      <Title name='Transactions'/>

      <div className='flex flex-col space-y-8'>

        <div className='flex justify-evenly m-4 pt-12'>
          <button className='w-20 h-20 rounded-3xl bg-green-800 items-center justify-center text-secondary flex'>
            <Plus size={40} />
          </button>
          <button className='w-20 h-20 rounded-3xl bg-primary items-center justify-center text-secondary flex'>
            <ArrowLeftRight size={40} />
          </button>
          <button className='w-20 h-20 rounded-3xl bg-red-800 items-center justify-center text-secondary flex'>
            <Minus size={40} />
          </button>
        </div>

        <div className='flex justify-evenly items-center m-4'>
          <div className='flex flex-col'>
            <p>From:</p>
            <Select>
              <SelectTrigger className="w-[120px]">
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
              <SelectTrigger className="w-[120px]">
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
          <h3 className='mx-8 '>Comment:</h3>
          <div className='flex items-center mx-8'>
            <Textarea></Textarea>
          </div>
        </div>

        <Button variant={'default'} className='m-8 py-6'>
                Add Transaction
        </Button>



        

      </div>
      

      


        
    </div>
  )
}

export default Transactions

