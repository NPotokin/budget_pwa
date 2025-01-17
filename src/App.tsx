import './App.css'
import Navigation from './pages/Navigation/Navigation'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './pages/Settings/Setings'
import Statistics from './pages/Statistics/Statistics'
import Transactions from './pages//Transactions/Transactions'
import Accounts from './pages/Accounts/Accounts'
import Categories from './pages/Categories/Categories'
import {Login} from './pages/Entry/Login'
import {Register} from './pages/Entry/Register'

const App= () => {
  

  return (
    <>
      <div className="desktop-message">
          <p>This app is only available on mobile devices.</p>
        </div>
      <div className='mobile-only'>
        <Router>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route path="entry" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route index element={<Transactions />} />
                    <Route path="accounts" element={<Accounts />} />
                    <Route path="categories" element={<Categories />} />
                </Route>
            </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
