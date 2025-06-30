import 'bootstrap/dist/css/bootstrap.min.css';  
import Header from './pages/headers/Header';
import Dashboard from './pages/dashboard/Dashboard';
import Nomatch from './pages/Nomatch/Nomatch';
import { Routes,Route } from 'react-router-dom';
import Postuser from './pages/Employee/Postuser';
import Updateuser from './pages/Employee/Updateuser';



function App() {
  

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element ={<Dashboard/>} />
      <Route path="/employee" element ={<Postuser/>} />
      <Route path="/employee/:id" element ={<Updateuser/>} />
      <Route path="*" element ={<Nomatch/>} />
    </Routes>

      </>
  );
}

export default App
