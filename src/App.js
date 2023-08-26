import React, { useState } from "react";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from "./Home";
import BookDetails from "./books"; // Import the new component

const App = () => {
  const [data,setData]=useState([]);
  const receiveDataFromChild = (data) => {
    setData(data);
};
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home usser={receiveDataFromChild}/>} />
                <Route path="/book/:id" element={<BookDetails books={data}/>} />
            </Routes>
        </Router>
    );
}

export default App;
