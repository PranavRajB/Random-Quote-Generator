import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file for styling

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [authorImage, setAuthorImage] = useState("");

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      const quoteData = response.data;

      setQuote(quoteData.content);
      setAuthor(quoteData.author);

      const imageResponse = await axios.get(
        `https://source.unsplash.com/featured/?${quoteData.author}`
      );
      setAuthorImage(imageResponse.request.responseURL);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${authorImage})` }}
    >
      <div className="title-box">
        <h1 className="title">Random Quote Generator</h1>
      </div>
      <div className="quote-box">
        <blockquote className="quote">
          <p className="quote-text">{quote}</p>
        </blockquote>
      </div>
      <div className="author-box">
        <footer className="quote-author">{author}</footer>
      </div>
      <button className="new-quote-btn" onClick={handleNewQuote}>
        New Quote
      </button>
    </div>
  );
};

export default App;
