import { Route, Routes,BrowserRouter as Router  } from 'react-router-dom';
import './App.css';
import MainPage from './components/mainComponents/MainPage';
import LoginPage from './components/mainComponents/LoginPage';
import Register from './components/mainComponents/Register';
import LoginMainPage from './components/mainComponents/LoginMainPage';
import EventInfo from './components/eventComponents/EventInfo';
import Eventdetail from './components/eventComponents/Eventdetail';
import Acc_main from './components/accComponents/Acc_main';
import Acc_info from './components/accComponents/Acc_info';
import RestaurantMain from './components/RestaurantComponents/RestaurantMain';
import RestaurantInfo from './components/RestaurantComponents/RestaurantInfo';
import WeatherMain from './components/weatherComponents/WeatherMain';
function App() {
  return (
    <Router>
       <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<LoginMainPage />} />
          <Route path="/eventinfo" element={<EventInfo/>}/>
          <Route path="/event" element={<Eventdetail/>}/>
          <Route path="/Restaurant" element={<RestaurantMain/>}/>
          <Route path="/restaurantinfo/:contentid" element={<RestaurantInfo/>}/>
          <Route path="/accommodation" element={<Acc_main/>}/>
          <Route path="/accommodation/detail" element={<Acc_info/>}/>
          <Route path="/weather" element={<WeatherMain/>}/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
