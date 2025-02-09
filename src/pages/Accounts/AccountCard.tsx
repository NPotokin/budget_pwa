import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Account } from "@/store/accounts/accountsSlice";
import { useNavigate } from "react-router-dom";


interface AccountProps {
  account: Account
}

export const AccountCard: React.FC<AccountProps> = ({account}) =>  {
  const navigate = useNavigate();

  return (
    <Card key={account.id} className='mx-4' onClick={() => navigate(`/accounts/${account.id}`)}>
        <CardHeader>
            <div className="flex flex-col">
                <CardTitle className='text-2xl font-light mb-2'>{account.name}</CardTitle>
                <CardDescription>
                    <div className="flex justify-between">
                        <p className='text-primary pr-2 w-1/3 text-xs'>Balance:</p>
                        <p className='text-primary pr-2 w-1/3 text-xs'>Earnings:</p>
                        <p className='text-primary pr-2 w-1/3 text-xs'>Spendings:</p>
                    </div>
                    <div className="flex justify-between">
                        <p className=' text-xl pr-2 w-1/3 font-mono'>{account.balance}</p>
                        <p className='text-green-800 text-xl  pr-2 w-1/3 font-mono'>{account.earning}</p>
                        <p className='text-red-800 text-xl  pr-2 w-1/3 font-mono'>{account.spending}</p>
                    </div>
                </CardDescription>
            </div>
        </CardHeader>
    </Card> 
  );
}
