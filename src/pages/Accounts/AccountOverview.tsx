import { Button } from '@/components/ui/button'
import Title from '@/components/ui/title'
import React from 'react'

const AccountOverview = () => {
  return (
    <div className='fle flex-col space-y-2'>
        <Title name='Account Overview'/>

        <h2 className="text-xl m-4 text-primary">Account name</h2>
        <h1 className="text-3xl m-4 pb-8">T-bank</h1>

        <h2 className="text-xl m-4 text-primary">Account amount</h2>
        <h1 className="text-3xl m-4 pb-8 font-mono">97,000</h1>

        <h2 className="text-xl m-4 text-primary">Account earnings</h2>
        <h1 className="text-3xl m-4 pb-8 font-mono text-green-800"> + 7,000</h1>

        <h2 className="text-xl m-4 text-primary">Account spendings</h2>
        <h1 className="text-3xl m-4 pb-8 font-mono text-red-800"> - 27,000</h1>

        <Button type={'button'} variant={'destructive'} className='w-[90vw] m-4 p-6'>
            Delete Account
        </Button>

        
    </div>
  )
}

export default AccountOverview
