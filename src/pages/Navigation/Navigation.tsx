import { Button } from '@/components/ui/button';
import { BadgeRussianRubleIcon, ChartPieIcon, NotebookTabsIcon, User, Wallet } from 'lucide-react';
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {

  const navigate = useNavigate()
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet />
        </main>
      <footer className="flex justify-around pb-5 items-center">
         <Button variant="default" size="icon" onClick={() => navigate('/settings')}>
            <User/>
         </Button>
         <Button variant="default" size="icon" onClick={() => navigate('/accounts')}>
            <Wallet />
         </Button>
         <Button variant="default" size="iconLarge" onClick={() => navigate('/')} >
            <BadgeRussianRubleIcon/>
         </Button>
         <Button variant="default" size="icon" onClick={() => navigate('/categories')}>
            <NotebookTabsIcon />
         </Button>
         <Button variant="default" size="icon" onClick={() => navigate('/statistics')}>
            <ChartPieIcon />
         </Button>
        
      </footer>
    </div>
  )
}

export default Navigation
