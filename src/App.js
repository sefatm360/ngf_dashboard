import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import OrderRouterHelper from './components/helperComponents/orderHelper/OrderRouterHelper';
import ProductRouterHelper from './components/helperComponents/productHelper/ProductRouterHelper';
import QueenRouterHelper from './components/helperComponents/queenHelper/QueenRouterHelper';
import { useAdminContext } from './contexts/adminContext';
import Dashboard from './pages/categoryPage/Dashboard';
import Login from './pages/loginPage/Login';
import './styles/Training.css';
// import OfferRouterHelper from './components/helperComponents/offerHelper/OfferRouterHelper';
import SearhContentPage from './components/SearhContentPage/SearhContentPage';
import EditModal from './components/editModals/EeditModal';
import ContentRouterHelper from './components/helperComponents/contentHelper/ContentRouterHelper';
import FundRouterHelper from './components/helperComponents/fundHelper/FundRouterHelper';
import GigOrdersHelper from './components/helperComponents/gigOrdersHelper/GigOrdersHelper';
import GigsRouterHelper from './components/helperComponents/gigsHelper/GigsRouterHelper';
import SellerHelper from './components/helperComponents/sellerHelper/SellerHelper';
import Courses from './pages/categoryPage/Courses';
import Customers from './pages/categoryPage/Customers';
import Training from './pages/categoryPage/Training';
import ForgotPassword from './pages/loginPage/ForgotPassword';
import QueenInvoice from './pages/otherPages/QueenInvoice';
// import GigsPage from './components/SearhContentPage/GigsPage';
// import QueensPages from './components/SearhContentPage/QueensPages';
import CustomersInvoice from './components/PrintedComponents/CustomersInvoice';
import QueensInvoice from './components/PrintedComponents/QueensInvoice';
import BlogRouterHelper from './components/helperComponents/blogHelper/BlogRouterHelper';
import QueenConnectHelper from './components/helperComponents/queenConnectHelper/QueenConnectHelper';
import QueensOfferRouterHelper from './components/helperComponents/queenHelper/QueensOfferRouterHelper';
import QuestionsRouterHelper from './components/helperComponents/questionsRouterHelper/QuestionsRouterHelper';
import TraineeRouterHelper from './components/helperComponents/traineeHelper/TraineeRouterHelper';
import Buyer from './pages/categoryPage/Buyer';
import ContactMsg from './pages/categoryPage/ContactMsg';
import ContactMsgDetails from './pages/detailsPage/ContactMsgDetails';
import CreateInvoice from './pages/otherPages/CreateInvoice';

function App() {
  const { admin } = useAdminContext();
  return (
    <div className='App'>
      <div>
        {admin && <Sidebar />}
        {admin && <Header />}
        <Routes>
          <Route
            path='/login'
            element={admin ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='/forgot-password'
            element={admin ? <Navigate to='/' /> : <ForgotPassword />}
          />
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path='/inbox/*'
            element={
              <PrivateRoute>
                <ContactMsg />
              </PrivateRoute>
            }
          />
          <Route
            path='/inbox/:id'
            element={
              <PrivateRoute>
                <ContactMsgDetails />
              </PrivateRoute>
            }
          />
          <Route
            path='/me/*'
            element={
              <PrivateRoute>
                <QueenRouterHelper />
              </PrivateRoute>
            }
          />
          <Route
            path='/blog/*'
            element={
              <PrivateRoute>
                <BlogRouterHelper />
              </PrivateRoute>
            }
          />
          <Route
            path='/me-offer/*'
            element={
              <PrivateRoute>
                <QueensOfferRouterHelper />
              </PrivateRoute>
            }
          />

          <Route
            path='/products/*'
            element={
              <PrivateRoute>
                <ProductRouterHelper />
              </PrivateRoute>
            }
          />

          <Route
            path='/orders/*'
            element={
              <PrivateRoute>
                <OrderRouterHelper />
              </PrivateRoute>
            }
          />
          <Route
            path='/sellers/*'
            element={
              <PrivateRoute>
                <SellerHelper />
              </PrivateRoute>
            }
          />
          <Route
            path='/gigs/*'
            element={
              <PrivateRoute>
                <GigsRouterHelper />
              </PrivateRoute>
            }
          />
          <Route
            path='/gig-orders/*'
            element={
              <PrivateRoute>
                <GigOrdersHelper />
              </PrivateRoute>
            }
          />

          {/* <Route
            path='/offers/*'
            element={
              <PrivateRoute>
                <OfferRouterHelper />
              </PrivateRoute>
            }
          /> */}

          <Route
            path='/customers/*'
            element={
              <PrivateRoute>
                <Customers />
              </PrivateRoute>
            }
          />
          <Route
            path='/training/*'
            element={
              <PrivateRoute>
                <Training />
              </PrivateRoute>
            }
          />
          <Route
            path='/trainee/*'
            element={
              <PrivateRoute>
                <TraineeRouterHelper />
              </PrivateRoute>
            }
          />
          <Route
            path='/courses/*'
            element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />
          <Route
            path='/funds/*'
            element={
              <PrivateRoute>
                <FundRouterHelper />
              </PrivateRoute>
            }
          />

          <Route
            path='/search-content/:type'
            element={
              <PrivateRoute>
                <SearhContentPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path='/queen-invoice/:orderId/:queenId/:commision'
            element={<QueenInvoice />}
          />
          <Route
            path='/me-invoice/:orderId/:queenId/:commision'
            element={<QueensInvoice />}
          />
          <Route
            path='/customers-invoice/:orderId/:delivery'
            element={<CustomersInvoice />}
          />
          <Route
            path='/content/*'
            element={
              <PrivateRoute>
                <ContentRouterHelper />
              </PrivateRoute>
            }
          />
          <Route
            path='/create-invoice'
            element={
              <PrivateRoute>
                <CreateInvoice />
              </PrivateRoute>
            }
          />
          <Route
            path='/questions/*'
            element={
              <PrivateRoute>
                <QuestionsRouterHelper />
              </PrivateRoute>
            }
          />
          <Route
            path='/queen-connect/*'
            element={
              <PrivateRoute>
                <QueenConnectHelper />
              </PrivateRoute>
            }
          />
          <Route
            path='/buyer/*'
            element={
              <PrivateRoute>
                <Buyer />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <EditModal />
    </div>
  );
}

export default App;
