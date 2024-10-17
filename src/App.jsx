import Index from "./pages/Index.jsx";
import Posts from "./pages/Posts.jsx";
import GlobalStyles from "./App.styles.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
      </Router>
    </>
  );
};

export default App;
