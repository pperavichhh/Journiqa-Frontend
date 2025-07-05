import { Routes, Route } from 'react-router-dom';
import AuthScreen from './pages/authPage/authPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthScreen />} />
    </Routes>
  );
}

export default App;
