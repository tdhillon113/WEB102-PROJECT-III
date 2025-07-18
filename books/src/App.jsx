import React, { useEffect, useState } from "react";
import "./App.css";
// import BookDiscoverer from "./BookDiscoverer";

function App() {
  //creating random book set
  const [randomBook, setRandomBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [bannedBooks, setBannedBooks] = useState([]);
  const [bannedAuthors, setBannedAuthors] = useState([]);
  const [authorInput, setAuthorInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const apiKey = import.meta.env.VITE_ACCESS_KEY;
      const url = `https://www.googleapis.com/books/v1/volumes=${VITE_ACCESS_KEY}`;

      try {
        const res = await fetch(url);
        const json = await res.json();
        console.log(json.items);
      } catch (err) {
        console.error("API error", err);
      }
    };

    fetchBooks();
  }, []);

  const handleShowRandomBook = async () => {
    setError("");
    const apiKey = import.meta.env.VITE_ACCESS_KEY;
    const query = searchTerm.trim() || "fiction";
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&key=${apiKey}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      let filteredBooks = [];
      if (json.items && json.items.length > 0) {
        filteredBooks = json.items.filter((book) => {
          // Filter out banned books
          if (bannedBooks.includes(book.id)) return false;
          // Filter out banned authors
          if (book.volumeInfo.authors) {
            const lowerAuthors = book.volumeInfo.authors.map((a) =>
              a.toLowerCase()
            );
            if (lowerAuthors.some((a) => bannedAuthors.includes(a)))
              return false;
          }
          return true;
        });
        if (filteredBooks.length > 0) {
          const randomIdx = Math.floor(Math.random() * filteredBooks.length);
          setRandomBook(filteredBooks[randomIdx]);
        } else {
          setRandomBook(null);
          setError(`No books found :0 `);
        }
      } else {
      }
    } catch (err) {
      console.error("error", err);
    }
  };

  const handleBanBook = () => {
    if (randomBook && !bannedBooks.includes(randomBook.id)) {
      setBannedBooks([...bannedBooks, randomBook.id]);
      setRandomBook(null);
    }
  };

  const handleBanAuthor = () => {
    const author = authorInput.trim().toLowerCase();
    if (author && !bannedAuthors.includes(author)) {
      setBannedAuthors([...bannedAuthors, author]);
      setAuthorInput("");
    }
  };

  // remove author from ban
  const handleUnbanAuthor = (author) => {
    setBannedAuthors(bannedAuthors.filter((a) => a !== author));
  };

  // remove book from ban
  const handleUnbanBook = (id) => {
    setBannedBooks(bannedBooks.filter((b) => b !== id));
  };

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div style={{ flex: 1 }}>
        <header className="header">
          <h1>Discover Books Around the World!</h1>
        </header>
        <div style={{ margin: "1rem 0" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter a genre <3"
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              marginRight: "1rem",
            }}
          />
          <button className="test-button" onClick={handleShowRandomBook}>
            Random Book!
          </button>
        </div>
        
        <div style={{ marginBottom: "1rem 0" }}>
          <input
            type="text"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            placeholder="Search an author"
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              marginRight: "1rem",
              marginTop: "0.5rem",
            }}
          />
          <button
            className="test-button"
            style={{ backgroundColor: "#E66BBA" }}
            onClick={handleBanAuthor}
          >
            Ban Author
          </button>
        </div>
        <div
          style={{
            position: "absolute",
            right: "40px",
            background: "#ffe0f0",
            padding: "1rem",
            borderRadius: "12px",
            maxWidth: "350px",
            minWidth: "200px",
          }}
        >
          <h3 style={{ color: "#E66BBA", marginTop: 0 }}>
            Banned Books & Authors
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {bannedBooks.map((id, idx) => (
              <li
                key={idx}
                onClick={() => handleUnbanBook(id)}
                style={{
                  color: "#E66BBA",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                title="Click to unban this book"
              >
                {id}
              </li>
            ))}
          </ul>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {bannedAuthors.map((author, idx) => (
              <li
                key={idx}
                onClick={() => handleUnbanAuthor(author)}
                style={{
                  color: "#E66BBA",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                title="Click to unban this author"
              >
                {author}
              </li>
            ))}
          </ul>
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}
        <main>
          {randomBook && (
            <div style={{ marginTop: "2rem" }}>
              <h2>{randomBook.volumeInfo.title}</h2>
              <div>
                {randomBook.volumeInfo.authors?.map((author, idx) => {
                  const lowerAuthor = author.toLowerCase();
                  const isBanned = bannedAuthors.includes(lowerAuthor);
                  return (
                    <span
                      key={idx}
                      onClick={() => {
                        if (!isBanned) {
                          setBannedAuthors([...bannedAuthors, lowerAuthor]);
                        }
                      }}
                      style={{
                        cursor: isBanned ? "not-allowed" : "pointer",
                        color: isBanned ? "#181818" : "#181818",
                        fontWeight: "bold",
                        marginRight: "0.5rem",
                        textDecoration: isBanned ? "line-through" : "underline",
                      }}
                      title={isBanned ? "Already banned" : "ban author"}
                    >
                      {author}
                    </span>
                  );
                })}
              </div>
              <p>{randomBook.volumeInfo.description}</p>
              {randomBook.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={randomBook.volumeInfo.imageLinks.thumbnail}
                  alt={randomBook.volumeInfo.title}
                />
              )}
              <button
                className="test-button"
                style={{
                  backgroundColor: "#E66BBA",
                  marginTop: "1rem",
                }}
                onClick={handleBanBook}
              >
                Ban Book
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
