import Create from "./create";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Notes from "./notes";
import Layout from "./components/Layout";
import Login from "./components/Login";
import SignUp from "./components/signup";

function App() {


  return (
    <Router>
      <Layout >
        <Routes>
            <Route path="/create" element={ <Create />} />
            <Route path="/" element={<Notes />} />
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
