import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const RecentTransactions = () => {

  const navigate = useNavigate()
  return (
    <div className='flex flex-col'>
        <Title name='Recent Transactions'/>

        <div className='flex flex-col mx-4'>
          <h2 className="text-primary text-xl">Latest transactions</h2>
          <div className="border border-primary rounded max-h-[60vh] overflow-y-auto">
            {/* Header Row */}
            <div className="flex">
              <div className="flex-1 text-md text-start px-2 py-1 border-r border-primary">Date</div>
              <div className="flex-1 text-md text-start px-2 py-1 border-r border-primary">From</div>
              <div className="flex-1 text-md text-start px-2 py-1 border-r border-primary">To</div>
              <div className="flex-1 text-md text-start px-2 py-1">Amount</div>
            </div>
            {/* Data Row */}
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
            <div className="flex border-t border-primary">
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Mon, Jan 12</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">T-bank main</div>
              <div className="flex-1 text-sm text-start px-2 py-1 border-r border-primary">Dinig out</div>
              <div className="flex-1 text-sm text-start px-2 py-1 font-mono">3,445</div>
            </div>
          </div>

        </div>

          <Button onClick={() => navigate('/')} variant={'default'} className='mx-4 mt-8 py-6'>
                Add Transaction
          </Button>
      
    </div>
  )
}

export default RecentTransactions
