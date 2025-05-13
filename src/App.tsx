import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signup from './Auth/Signup';
import Signin from './Auth/Login';
import Forget from './Auth/Forget';
import Reset from './Auth/Reset';
import Dashboard from './Components/Dashboard';
import Layout from './Components/Layout';
import OrderList from './Components/Orders/OrderList';
import OrderDetails from './Components/Orders/OrderDetails';
import CustomerList from './Components/Customers/CustomerList';
import CustomerDetails from './Components/Customers/CustomerDetails';
import Organizations from './Components/Organizations/Organizations';
import OrganizationDetails from './Components/Organizations/OrganizationDetails';
import 'react-toastify/dist/ReactToastify.css';
import ProductCategories from './Auth/pages/productsCategories';
import ProductDetails from './Auth/pages/products/productDetails';
import ProductList from './Auth/pages/products/productListing';
import AddProduct from './Auth/pages/products/addProduct';
import { ToastContainer } from 'react-toastify';
import OrganizationsDash from './Auth/pages/organizations/organizations';
import Org_Store from './Auth/pages/organizations/store/org_store';
import EmployeesListing from './Auth/pages/organizations/Employess/EmployeesListing';
import EmployeeDetailing from './Auth/pages/organizations/Employess/employeeDetailing';
import EmployeesOrderDetailing from './Auth/pages/organizations/Employess/orderDetails';
import StoreDetails from './Auth/pages/store/store';
import CustomerProfile from './Auth/pages/customer/customerOperations';
import RecognitionTask from './Auth/pages/customer/recognitionTask';
import ProductDetailsPage from './Components/organizationAdmin/productDetails/productsDetail';
import CartPage from './Components/organizationAdmin/cartUi/cartPage';
import DeliveryPage from './Components/organizationAdmin/cartUi/delivery';
import OrdersPage from './Components/organizationAdmin/orderUI/orderListing';
import OrderDetailPage from './Components/organizationAdmin/orderUI/orderDetails';
import OrderTracking from './Components/organizationAdmin/orderUI/trackOrder';
import CategoryPage from './Components/organizationAdmin/productDetails/categoriesType';


const App: React.FC = () => {
   const [roleType, setRoleType] = useState<string | null>(null);
    useEffect(()=>{
      const data = sessionStorage.getItem('user')
      if(data){
        const user = JSON.parse(data)
        setRoleType(user.role)
      }
  },[])
  return (
    <>
          <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgetpassword" element={<Forget />} />
        <Route path="/resetpassword" element={<Reset />} />
        <Route element={<Layout roleType={roleType} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders/list" element={<OrderList />} />
          <Route path="/orders/details" element={<OrderDetails />} />
          <Route path="/customers/list" element={<CustomerList />} />
          <Route path="/customers/details/:id" element={<CustomerDetails />} />
          <Route path="/store/products" element={< ProductList/>} />
          <Route path="/store/products/addproduct" element={< AddProduct/>} />
          <Route path="/store/products/:id" element={< ProductDetails/>} />
          <Route path="/store/categories" element={< ProductCategories/>} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/details/:id" element={<OrganizationDetails />} />
          <Route path="/settings" element={<Dashboard />} />
          {/* organizations  operations*/}
          <Route path="/admin/" element={<OrganizationsDash />} />
          <Route path="/store" element={<Org_Store />} />
          <Route path="/employees" element={<EmployeesListing />} />
          <Route path="/employees/:id" element={<EmployeeDetailing />} />
          <Route path="/employees/:id/:orderid" element={<EmployeesOrderDetailing />} />
          {/* store landing page */}
          <Route path="/store/details" element={<StoreDetails />} />
          {/* Employee operation  */}
          <Route path="/my-profile" element={<CustomerProfile />} />
          <Route path="/recognition-tasks" element={<RecognitionTask />} />
          <Route path="/store/product-details" element={<ProductDetailsPage />} />
          <Route path="/store/product-categories" element={<CategoryPage />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/user/cart/delivery" element={<DeliveryPage />} />
          <Route path="/user/orders" element={<OrdersPage />} />
          <Route path="/user/orders-details" element={<OrderDetailPage />} />
          <Route path="/user/orders-details/tracking" element={<OrderTracking />} />

        </Route>
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
