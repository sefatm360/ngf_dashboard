import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdminContextProvider from '../contexts/adminContext';
import BlogContextProvidor from '../contexts/blogContext';
import CustomerContextProvider from '../contexts/customerContext';
import GigContextProvider from '../contexts/gigContext';
import GigOrderContextProvider from '../contexts/gigOrderContext';
import InboxContextPrivider from '../contexts/inboxContext';
import NotificationContext from '../contexts/notificationContext';
import OfferContextProvider from '../contexts/offerContext';
import OrderContextProvider from '../contexts/orderContext';
import ProductContextProvider from '../contexts/productsContext';
import QueenContextProvider from '../contexts/queenContext';
import QueensOfferContextProvider from '../contexts/queensOfferContext';
import QuestionContextProvider from '../contexts/QuestionContext';
import SellerContextProvider from '../contexts/sellerContext';
import SocialContextProvider from '../contexts/SocialContext';
import SocketContextProvider from '../contexts/socketContext';
import TraineeContextProvider from '../contexts/traineeContext';

const ContextHelper = ({ children }) => {
  return (
    <AdminContextProvider>
      <QuestionContextProvider>
        <TraineeContextProvider>
          <NotificationContext>
            <InboxContextPrivider>
              <ProductContextProvider>
                <CustomerContextProvider>
                  <OrderContextProvider>
                    <QueenContextProvider>
                      <OfferContextProvider>
                        <SocketContextProvider>
                          <GigContextProvider>
                            <GigOrderContextProvider>
                              <SellerContextProvider>
                                <QueensOfferContextProvider>
                                  <BlogContextProvidor>
                                    <SocialContextProvider>
                                      <BrowserRouter>{children}</BrowserRouter>
                                    </SocialContextProvider>
                                  </BlogContextProvidor>
                                </QueensOfferContextProvider>
                              </SellerContextProvider>
                            </GigOrderContextProvider>
                          </GigContextProvider>
                        </SocketContextProvider>
                      </OfferContextProvider>
                    </QueenContextProvider>
                  </OrderContextProvider>
                </CustomerContextProvider>
              </ProductContextProvider>
            </InboxContextPrivider>
          </NotificationContext>
        </TraineeContextProvider>
      </QuestionContextProvider>
    </AdminContextProvider>
  );
};

export default ContextHelper;
