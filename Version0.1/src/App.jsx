
// import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Layout from './components/Layout'
import DetailPage from './components/detailPage'
import Dashboard from './components/Dashboard'
import Add from './components/Add'
import Update from './components/Update'
import Contact from './components/Contact'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element={<Layout/>}>           
            <Route index element={<HomePage/>}/>
            <Route path ="/detail/:id" element={<DetailPage/>}/>
            <Route path = "/dashboard" element={<Dashboard/>}/>
            <Route path = "/addStaff" element={<Add/>}/>
            <Route path ="/update/:id" element={<Update/>}/>
            <Route path = "/contact" element={<Contact/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
