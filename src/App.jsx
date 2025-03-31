import './App.css'
import Employee from './components/Employee'
import EmployeeList from './components/EmployeeList'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
          {/* // http://localhost:3000/ */}
          <Route path='/' element={<EmployeeList />} />

          {/* // http://localhost:3000/employees */}
          <Route path='/employees' element={<EmployeeList />} />

          {/* // http://localhost:3000/add-employee */}
          <Route path='/add-employee' element={<Employee/>} />

          {/* // http://localhost:3000/edit-employee/1 */}
          <Route path='/update-employee' element={<Employee/>} />
        </Routes>
        </main>
        

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
