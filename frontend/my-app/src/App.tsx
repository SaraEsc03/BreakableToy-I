import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
