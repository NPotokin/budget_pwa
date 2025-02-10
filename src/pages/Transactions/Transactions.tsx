import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
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
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { fetchAccounts } from '@/store/accounts/accounts.Thunk'
import { fetchCategories } from '@/store/categories/categories.Thunk'
import { addTransaction } from '@/store/transactions/transactions.Thunk'
import { Transaction } from '@/store/transactions/transactionsSlice'
import { Minus, Plus, ArrowLeftRight, ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Transactions: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const categories = useTypedSelector(state => state.categories.categories) || [];
  const accounts = useTypedSelector(state => state.accounts.list) || [];

  const categoriesSpending = categories.filter(category => category.type === "spending");
  const categoriesEarning = categories.filter(category => category.type === "income");

  const [selectedFrom, setSelectedFrom] = useState([]);
  const [selectedTo, setSelectedTo] = useState([]);

  const [transaction, setTransaction] = useState<Transaction>({
    date: new Date(),
    amount: 0,
    account_from: "",
    account_to: "",
    category: "",
    comment: "",
  });

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSpending = () => {
    setSelectedFrom(accounts);
    setSelectedTo(categoriesSpending);
    setTransaction(prev => ({ ...prev, account_from: "", category: "" })); 
  };

  const handleTransfer = () => {
    setSelectedFrom(accounts);
    setSelectedTo(accounts);
    setTransaction(prev => ({ ...prev, account_from: "", account_to: "" }));
  };

  const handleEarning = () => {
    setSelectedFrom(categoriesEarning);
    setSelectedTo(accounts);
    setTransaction(prev => ({ ...prev, category: "", account_to: "" }));
  };

 

  return (
    <div className="flex-flex-col w-full">
      <Title name="Transactions" />

      <div className="flex flex-col space-y-2">
        <Calendar
          weekStartsOn={1}
          className="w-[95vw] mx-4"
          selected={transaction.date}
          onDayClick={(date) => setTransaction({ ...transaction, date })}
        />

        {/* Buttons for transaction types */}
        <div className="flex justify-between pt-2 mx-8">
          <button
            onClick={handleEarning}
            className="w-[25vw] h-8 rounded-2xl bg-green-800 items-center justify-center text-secondary flex"
          >
            <Plus size={20} />
          </button>
          <button
            onClick={handleTransfer}
            className="w-[25vw] h-8 rounded-2xl bg-primary items-center justify-center text-secondary flex"
          >
            <ArrowLeftRight size={20} />
          </button>
          <button
            onClick={handleSpending}
            className="w-[25vw] h-8 rounded-2xl bg-red-800 items-center justify-center text-secondary flex"
          >
            <Minus size={20} />
          </button>
        </div>

        {/* Selection for "From" and "To" */}
        <div className="flex justify-evenly items-center m-4">
          <div className="flex flex-col">
            <p>From:</p>
            <Select
              onValueChange={(value) =>
                selectedFrom == accounts 
                ? setTransaction({ ...transaction, account_from: value })
                : setTransaction ({ ...transaction, category: value })
              }
            >
              <SelectTrigger className="w-[35vw]">
                <SelectValue placeholder={selectedFrom === accounts ? 'Account' : 'Category'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectedFrom.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <ArrowRight size={40} className="text-primary" />
          </div>

          <div className="flex flex-col">
            <p>To:</p>
            <Select
              onValueChange={(value) =>
                selectedTo == accounts 
                ? selectedFrom == accounts 
                  ? setTransaction({ ...transaction, account_to: value, category: null }) // acc to acc 
                  : setTransaction({ ...transaction, account_to: value, account_from: null}) // cat to acc 
                : null
              }
              
            >
              <SelectTrigger className="w-[35vw]">
                <SelectValue placeholder={selectedTo === accounts ? 'Account' : 'Category'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectedTo.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Amount Input */}
        <Input
          className='w-[85vw] mx-auto '
          type="number"
          placeholder="Amount"
          min={0}
          required
          onChange={(e) =>
            setTransaction({ ...transaction, amount: parseFloat(e.target.value) })
          }
        />

        {/* Comment Section */}
        <div className="flex flex-col">
          <h3 className="mx-8">Comment:</h3>
          <div className="flex items-center mx-8">
            <Textarea className='h-[20px]'
              onChange={(e) =>
                setTransaction({ ...transaction, comment: e.target.value })
              }
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          disabled={!transaction.date || !transaction.amount || !transaction.comment}
          variant={"default"}
          className="m-8 py-6"
          onClick={() => dispatch(addTransaction(transaction))}
        >
          Add Transaction
        </Button>

        {/* Navigate to Recent Transactions */}
        <Button
          variant={"link"}
          className="py-4"
          onClick={() => navigate("/transactions")}
        >
          See Recent Transactions
        </Button>
      </div>
    </div>
  );
};

export default Transactions;


