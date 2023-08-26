import React from "react";

const BookDetails = ({ books }) => {
    return (
        <div>
            <h2>{books.title}</h2>
            <p>{books.description}</p>
            {/* Display other book information here */}
        </div>
    );
}

export default BookDetails;
