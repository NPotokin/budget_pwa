import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Transaction } from "@/store/transactions/transactionsSlice";
// import { Settings } from "lucide-react";
// import { useNavigate } from "react-router-dom";


interface TransactionProps {
  transaction: Transaction
}

export const TransactionCard: React.FC<TransactionProps> = ({transaction}) =>  {
  // const navigate = useNavigate();

  return (
    <Card key={transaction.id} className='mx-4 my-0.5'>
        <CardHeader className="p-3">
            <div className="flex flex-col">
                <CardTitle className='text-sm font-normal mb-0 flex justify-between'>
                  <p>
                    {transaction.comment}
                  </p>
                  {/* <button className='hover:text-primary' onClick={() => navigate(`/accounts/edit/${transaction.id}`)}>
                    <Settings size={20}/>
                  </button> */}
                </CardTitle>
                <CardDescription>
                    <div className="flex">
                        <p className='text-primary pr-2 w-1/4 text-xs'>Date:</p>
                        <p className='text-primary pr-2 w-1/4 text-xs'>From:</p>
                        <p className='text-primary pr-2 w-1/4 text-xs'>To:</p>
                        <p className='text-primary pr-2 w-1/4 text-xs'>Amount:</p>
                    </div>
                    <div className="flex">
                        <p className='pr-2 w-1/4 text-xs'>{transaction.date}</p>
                        <p className='pr-2 w-1/4 text-xs'>{transaction.account_from ? transaction.account_from : transaction.category}</p>
                        <p className='pr-2 w-1/4 text-xs'>{transaction.account_to ? transaction.account_to : transaction.category}</p>
                        <p className='pr-2 w-1/4 text-xs font-mono'>{transaction.amount}</p>
                    </div>
                </CardDescription>
            </div>
        </CardHeader>
    </Card> 
  );
}
