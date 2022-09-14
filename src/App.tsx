import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import WeatherDetails from './components/WeatherDetails';
import { GlobalProvider } from './context/provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  return (
    <div className="App">
      <GlobalProvider>
        <Navbar />
        <WeatherDetails />
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover={true}
          theme="colored"
        />
      </GlobalProvider>
    </div>
  );
}

export default App;
