import React from "react";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { Home } from "./Pages/Home";
import CreateBook from "./Pages/CreateBook";
import { ShowBook } from "./Pages/ShowBook";
import EditBook from "./Pages/EditBook";
import DeleteBook from "./Pages/DeleteBook";
function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={ <CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
