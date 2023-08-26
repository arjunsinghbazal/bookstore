import React, { useEffect, useState } from "react";

const Home = () => {
    const [Data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State to track search query
    const url1 = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";
    const url2 = "https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes";

    const fetchdata = async (url) => {
        const response = await fetch(url);
        const daata = await response.json();
        const data = daata.items;
        const arr = [];
        for (let i = 0; i < data.length; i++) {
            arr.push(data[i].volumeInfo);
        }
        setData(arr);
        setUser(arr);
    };

    useEffect(() => {
        fetchdata(url1);
        fetchdata(url2);
    }, []);

    useEffect(() => {
        handleSearch(); // Automatically perform search as the user types
    }, [searchQuery]);

    const handleShowMore = () => {
        setShowAll(true);
    };

    const handleSearch = async () => {
        if (searchQuery.trim() !== "") {
            const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}`;
            await fetchdata(searchUrl);
        }
    };

    return (
        <div className="home">
            <header>
                <h1>KeazoN<span>BOOKS</span></h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search Books by Title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>
            <div className="body">
                {
                    user && user.slice(0, showAll ? user.length : 3).map((item, index) => (
                        <div key={index} className="items">
                            <div className="one">
                                {item.imageLinks && item.imageLinks.thumbnail && (
                                    <img src={item.imageLinks.thumbnail} alt="Book Thumbnail" />
                                )}
                            </div>
                            <div className="two">
                                <h3>{item.title}</h3>
                                <p>{item.description && item.description.length > 0 ? item.description.substring(0, 100) + "..." : "No description available"}</p>
                                <button>Read More</button>
                            </div>
                        </div>
                    ))
                }
                {!showAll && (
                    <button className="btn" onClick={handleShowMore}>More Books</button>
                )}
            </div>
        </div>
    );
}

export default Home;
