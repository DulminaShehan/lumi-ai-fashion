import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DashboardPage } from '@/pages/Dashboard/DashboardPage';
import { ProductsListPage } from '@/pages/Products/ProductsListPage';
import { ProductFormPage } from '@/pages/Products/ProductFormPage';
import { ProductDetailPage } from '@/pages/Products/ProductDetailPage';
import { CategoriesPage } from '@/pages/Categories/CategoriesPage';
import { OrdersListPage } from '@/pages/Orders/OrdersListPage';
import { OrderDetailPage } from '@/pages/Orders/OrderDetailPage';

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/products/new" element={<ProductFormPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/:id/edit" element={<ProductFormPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/orders" element={<OrdersListPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
