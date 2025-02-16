import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Category } from "@/store/categories/catgoriesSlice";
import { useNavigate } from "react-router-dom";


interface CategoryProps {
  category: Category,
}

export const CategoryCard: React.FC<CategoryProps> = ({category}) =>  {
  const navigate = useNavigate();

  return (
    <Card className='mx-4' onClick={() => navigate(`/categories/${category.id}`)}>
        <CardHeader>
            <div className="flex flex-col">
                <CardTitle 
                className={`text-2xl font-light mb-2 flex justify-between ${category.type === "spending" ? "text-red-800" : "text-green-800"}`}
                >
                  <p>{category.name}</p>
                </CardTitle>
                <CardDescription>
                    <div className="flex justify-between">
                        <p className='text-primary pr-2 w-1/3 text-xs'>{category.type === 'spending' ? 'Budgeted:' : 'Expected:'}</p>
                        <p className='text-primary pr-2 w-1/3 text-xs'>{category.type === 'spending' ? 'Used:' : 'Recieved:'}</p>
                        <p className='text-primary pr-2 w-1/3 text-xs'>Left:</p>
                    </div>
                    <div className="flex justify-between">
                        <p className=' text-xl pr-2 w-1/3 font-mono'>{category.category_limit}</p>
                        <p className='text-red-800 text-xl  pr-2 w-1/3 font-mono'>{category.used}</p>
                        <p className='text-green-800 text-xl  pr-2 w-1/3 font-mono'>{category.category_limit! - category.used}</p>
                    </div>
                </CardDescription>
            </div>
        </CardHeader>
    </Card> 
  );
}
