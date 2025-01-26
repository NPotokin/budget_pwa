import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Title from '@/components/ui/title'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col'>
      <Title name='Categories'/>
      <div className="overflow-auto h-[65vh] space-y-1">
      <Card className='mx-4'>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Groceries</CardTitle>
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Budgeted:</p>
                <p className='font-mono'>8,000</p>
              </div>
              </CardDescription>
            </div>
            <div className="flex flex-col">
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Used:</p>
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
      <Card className='m-4'>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Groceries</CardTitle>
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Budgeted:</p>
                <p className='font-mono'>8,000</p>
              </div>
              </CardDescription>
            </div>
            <div className="flex flex-col">
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Used:</p>
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
      <Card className='m-4'>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Groceries</CardTitle>
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Budgeted:</p>
                <p className='font-mono'>8,000</p>
              </div>
              </CardDescription>
            </div>
            <div className="flex flex-col">
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Used:</p>
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
      <Card className='m-4'>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Groceries</CardTitle>
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Budgeted:</p>
                <p className='font-mono'>8,000</p>
              </div>
              </CardDescription>
            </div>
            <div className="flex flex-col">
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Used:</p>
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
      <Card className='m-4'>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Groceries</CardTitle>
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Budgeted:</p>
                <p className='font-mono'>8,000</p>
              </div>
              </CardDescription>
            </div>
            <div className="flex flex-col">
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Used:</p>
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
      <Card className='m-4'>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Groceries</CardTitle>
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Budgeted:</p>
                <p className='font-mono'>8,000</p>
              </div>
              </CardDescription>
            </div>
            <div className="flex flex-col">
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Used:</p>
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
      <Card className='m-4'>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Groceries</CardTitle>
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Budgeted:</p>
                <p className='font-mono'>8,000</p>
              </div>
              </CardDescription>
            </div>
            <div className="flex flex-col">
              <CardDescription>
              <div className="flex">
                <p className='text-primary pr-2'>Used:</p>
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
      </div>

      <Button type={'button'} variant={'default'} className='m-4 p-6' onClick={() => navigate('/categories/add')}>
        Add Category
      </Button>

    </div>
    
  )
}

export default Categories
