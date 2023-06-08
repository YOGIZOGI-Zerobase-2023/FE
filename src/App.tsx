import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccommodationDetail from './views/AccomodationDetail';
import Main from './views/Main';
import Payment from './views/Payment';
import ReservationConfirm from './views/ReservationConfirm';
import SearchResult from './views/SearchResult';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import PageNotFound from './views/PageNotFound';
import { useEffect } from 'react';
import { mswTest } from './mocks/mswTestForBrowser';
import Layout from './components/common/Layout';

function App() {
  useEffect(() => {}, []);

  mswTest();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route
            path="/accommodationDetail"
            element={<AccommodationDetail />}
          />
          <Route path="/reservationConfirm" element={<ReservationConfirm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
