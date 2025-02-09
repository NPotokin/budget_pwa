import './App.css'
import Navigation from './pages/Navigation/Navigation'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Statistics from './pages/Statistics/Statistics'
import Transactions from './pages//Transactions/Transactions'
import Accounts from './pages/Accounts/Accounts'
import Categories from './pages/Categories/Categories'
import {Login} from './pages/Entry/Login'
import {Registration} from './pages/Entry/Register'
import AddAccount from './pages/Accounts/AddAccount';
import AccountOverview from './pages/Accounts/AccountOverview';
import CategoryAdd from './pages/Categories/CategoryAdd';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Recovery } from './pages/Entry/Recovery';
import { ChangePassword } from './pages/Entry/ChangePassword';
import Profile from './pages/Profile/Profile';
import CategoryOverview from './pages/Categories/CategoryOverview';
import RecentTransactions from './pages/Transactions/RecentTransactions';

const App= () => {

  return (
    <>
      <div className="desktop-message">
          <p>This app is only available on mobile devices.</p>
        </div>
      <div className='mobile-only'>
        <Router>
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='recover' element={<Recovery />} />
                <Route path='reset' element={<ChangePassword />} />
                <Route path='registration' element={<Registration />} />
                <Route path="/" element={<ProtectedRoute><Navigation/></ProtectedRoute>}>
                    <Route path="profile" element={<Profile />} />

                    <Route path="statistics" element={<Statistics />} />

                    <Route index element={<Transactions />} />
                    <Route path="transactions" element={<RecentTransactions />} />

                    <Route path="accounts" element={<Accounts />} />
                    <Route path='accounts/add' element={<AddAccount/>} />
                    <Route path='accounts/:accountId' element={<AccountOverview/>} />

                    <Route path="categories" element={<Categories />} />
                    <Route path="categories/add" element={<CategoryAdd/>} />
                    <Route path='categories/:categoryId' element={<CategoryOverview/>} />
                </Route>
            </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
