import { Routes, Route } from "react-router-dom";
import './App.css';
import Footer from './include/Footer';
import Header from './include/Header';
import Landing from './page/Landing';
import Single from './page/Single';

function App() {

  
  return (
    <div className="App">
      <main>
      <Header />
      <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/post/:id" element={<Single /> } />
      </Routes>
      <Footer />
      </main>
    </div>
  );
}

export default App;
