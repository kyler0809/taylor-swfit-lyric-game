/* This react app contains 3 different pages: main menu page, the game guessing page
    and the game summary page
*/

import './css/App.css'
import MainPage from './components/MainPage'
import SecondaryPage from './components/SecondaryPage'
import SummaryPage from './components/SummaryPage'
import {Routes,Route} from 'react-router-dom'

function App () {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path ="/lyricgame" element={<SecondaryPage/>}/>
      <Route path ="/summary" element={<SummaryPage/>}/>
    </Routes>
  );
}

export default App;
