import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    message();
  }, []);
  const message = async () => {
    let result = await fetch("http://localhost:3000/all-ads", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    setAds(result);
  };
  const handleSearch = async (e) => {
    let key = e.target.value;
    let result = await fetch(`http://localhost:3000/search/${key}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    setAds(result);
    console.log(ads.length > 0);
  };
  
  return (
    <div className="App">
      <div className="container h-100 d-flex flex-column align-items-center justify-content-center mt-5">
        <input
          className="form-control me-2 mb-4"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleSearch}
        ></input>
        <div className="d-flex flex-wrap gap-3"> 
          {ads.length > 0 ? (
            ads.map((data) => (
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src="https://lh3.googleusercontent.com/u/0/drive-viewer/AJc5JmSWHYzlGWMzO6SE1k-M_jjTpvgCGHPQk00Jo7X5GfO4dZ_D4Vb2HlUpbcH0QrMMxgKqvE3abAvSeFNJ8YtymcerJQMXGQ=w1920-h924"
                  class="card-img-top"
                  alt="..."
                ></img>
                <div className="card-body">
                  {/* {data.companies.map((e) => (
                    <h5 className="card-title">{e.company_name}</h5>
                  ))} */}
                  <h5 className="card-title">{data.headline}</h5>

                  <p className="card-title">{data.primaryText}</p>
                  <p className="card-text">{data.description}</p>
                  <a href="/" class="btn btn-primary">
                    {data.cta}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <h1> no result</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
