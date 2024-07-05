
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductsList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import EditProduct from './components/EditPage/EditProducts';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/edits/:id" element={<EditProduct/>} />

      </Routes>
    </Router>
    </>
  )
}

export default App
