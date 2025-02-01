import { Button } from '@/components/ui/button';
import { BadgeRussianRubleIcon, ChartPieIcon, NotebookTabsIcon, User, Wallet } from 'lucide-react';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[100vh]">
      <main className="flex-grow h-[85vh] overflow-y-auto">
        <Outlet />
      </main>
      <footer className="fixed bottom-0 left-0 right-0 h-[15vh] flex justify-around items-center bg-white">
        <Button variant="default" size="icon" onClick={() => navigate('/profile')}>
          <User />
        </Button>
        <Button variant="default" size="icon" onClick={() => navigate('/accounts')}>
          <Wallet />
        </Button>
        <Button variant="default" size="iconLarge" onClick={() => navigate('/')}>
          <BadgeRussianRubleIcon />
        </Button>
        <Button variant="default" size="icon" onClick={() => navigate('/categories')}>
          <NotebookTabsIcon />
        </Button>
        <Button variant="default" size="icon" onClick={() => navigate('/statistics')}>
          <ChartPieIcon />
        </Button>
      </footer>
    </div>
  );
};

export default Navigation;