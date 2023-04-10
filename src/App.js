import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [showText, setShowText] = useState(false);

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const generateStreamFromUrl = () => {
    setErrorMessage("");
    axios
      .post("http://127.0.0.1:5000/download", { url: url })
      .then((response) => {
        setDropdownData(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const handleDownload = () => {
    setErrorMessage("");
    axios
      .post("http://127.0.0.1:5000/process", {
        id: selectedOption,
        url: url,
      })
      .then((response) => {
        setMessage("Download completed!");
        setShowText(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [showText]);

  return (
    <div className="app-container">
      <h1>Download YouTube Video</h1>
      <div className="form-container">
        <input
          className="url-input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
        />
        <button className="download-button" onClick={generateStreamFromUrl}>
          Download
        </button>
      </div>
      {dropdownData.length !== 0 && (
        <div className="options-container">
          <select
            className="options-dropdown"
            value={selectedOption}
            onChange={handleSelect}
          >
            <option value="">Select an option</option>
            {dropdownData &&
              dropdownData?.map((option, index) => (
                <option key={index} value={index}>
                  {option.mime_type} {option.res}
                </option>
              ))}
          </select>
          <button className="download-button" onClick={handleDownload}>
            Download
          </button>
        </div>
      )}

      {showText && <p className="message-text">{message}</p>}
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [data, setData] = useState([{}]);
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:5000/members")
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
//   return (
//     <>
//       <h1>ajay</h1>
//     </>
//   );
// };

// export default App;
