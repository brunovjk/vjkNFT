import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer, ScrollToTop } from "./components";
import { Home, About, Tutorials, NFTCard, Interactions } from "./pages";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/:tokenId" element={<NFTCard />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/interactions" element={<Interactions />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
