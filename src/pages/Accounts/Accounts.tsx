import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Title from '@/components/ui/title'
import { RussianRuble } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Accounts = () => {

  const navigate = useNavigate()
  return (
    <div className='flex flex-col'>
      <Title name='Accounts'/>
      <div className='overflow-y-auto h-[65vh]'>

      <Card className='mx-4 my-1' onClick={() => navigate('/accounts/account')}>
        <CardHeader >
          <CardTitle className='text-xl font-thin'>T-bank current</CardTitle>
          <CardDescription className='flex items-center'>
            <p className='text-3xl font-mono'>97.000</p>
            <RussianRuble size={24}/>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className='mx-4 my-1'>
        <CardHeader >
          <CardTitle className='text-xl font-thin'>T-bank current</CardTitle>
          <CardDescription className='flex items-center'>
            <p className='text-3xl font-mono'>97.000</p>
            <RussianRuble size={24}/>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className='mx-4 my-1'>
        <CardHeader >
          <CardTitle className='text-xl font-thin'>T-bank current</CardTitle>
          <CardDescription className='flex items-center'>
            <p className='text-3xl font-mono'>97.000</p>
            <RussianRuble size={24}/>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className='mx-4 my-1'>
        <CardHeader >
          <CardTitle className='text-xl font-thin'>T-bank current</CardTitle>
          <CardDescription className='flex items-center'>
            <p className='text-3xl font-mono'>97.000</p>
            <RussianRuble size={24}/>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className='mx-4 my-1'>
        <CardHeader >
          <CardTitle className='text-xl font-thin'>T-bank current</CardTitle>
          <CardDescription className='flex items-center'>
            <p className='text-3xl font-mono'>97.000</p>
            <RussianRuble size={24}/>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className='mx-4 my-1'>
        <CardHeader >
          <CardTitle className='text-xl font-thin'>T-bank current</CardTitle>
          <CardDescription className='flex items-center'>
            <p className='text-3xl font-mono'>97.000</p>
            <RussianRuble size={24}/>
          </CardDescription>
        </CardHeader>
      </Card>
      </div>


      <Button variant={'default'} className='m-4 py-6' onClick={() => navigate('/accounts/add')}>
        Add Account
      </Button>


    </div>
  )
}

export default Accounts
