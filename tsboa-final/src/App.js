import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import EventsPage from './Components/EventsPage';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import EventDetail from './Components/EventDetail';
import NewsPage from './Components/NewsPage';
import NewsDetail from './Components/NewsDetail';
import Endorsments from './Components/Endorsments';
import EndorsmentsDetail from './Components/EndorsmentsDetail';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import ResetPassword from './Components/ResetPassword';
import BuyMembership from './Components/BuyMembership';
import VendorRecomendationDetail from './Components/VendorRecomendationDetail';
import Bids from './Components/Bids';
import BidsDetail from './Components/BidsDetail';
import PrivateRoute from './Components/PrivateRoute';
import MyBids from './Components/MyBids';
import CreatePosting from './Components/CreatePosting';
import MissingPage from './Components/MissingPage';
import UpdatePosting from './Components/UpdatePosting';
import Admin from './Components/Admin';
import Homepagesignin from './Components/Homepagesignin';
import BusinessDirectory from './Components/BusinessDirectory';
import BusinessDirectoryDetails from './Components/BusinessDirectoryDetails';

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Public routes */}
          <Route path="/" element={isLoggedIn ? <Homepagesignin /> : <HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/buymembership" element={<BuyMembership />} />
        
          <Route path="/membership" element={<BuyMembership />} />

        {/* User routes */}
            <Route element={<PrivateRoute /> } >
            <Route path="/createposting" element={<CreatePosting />} />
            <Route path="/updateposting/:postingId" element={<UpdatePosting />} />
            <Route path="/bidsdetail/:postingId" element={<BidsDetail />} />
            <Route path="/mybids" element={<MyBids />} />
            <Route path="/businessdirectory" element={<BusinessDirectory />} />   
            <Route path="/businessdirectorydetails/:businessId" element={<BusinessDirectoryDetails />} />         
            <Route path="/vendorrecomendationdetail/:vendorsId" element={<VendorRecomendationDetail />} />   
            <Route path="/events" element={<EventsPage />} />
            <Route path="/eventdetail/:eventId" element={<EventDetail />} />
            <Route path="/newspage" element={<NewsPage />} />
            <Route path="/newsdetail/:newsId" element={<NewsDetail />} />
            <Route path="/endorsments" element={<Endorsments />} />
            <Route path="/endorsmentdetail/:endorsmentId" element={<EndorsmentsDetail />} />
           

            <Route path="/bids" element={<Bids />} />   

            </Route> 


        {/* admin routes */}
        <Route path="/admin" element={<Admin />} />      
       
        <Route path="*" element={<MissingPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;