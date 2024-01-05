"use client";

import { useState, useEffect } from "react";
import { TextField } from "@mui/material";

export default function Search() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    return fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())

      .then((d) => setData(d));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [query, setQuery] = useState("");

  const search_parameters = Object.keys(Object.assign({}, ...data));

  function search(data) {
    return data.filter((data) =>
      search_parameters.some((parameter) =>
        data[parameter].toString().toLowerCase().includes(query)
      )
    );
  }
  return (
    <div>
      <p>Search client</p>
      <div className="container">
        <center>
          <h1>Search component in ReactJS</h1>
        </center>

        {/* <div className="input-box">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search user"
          />
        </div> */}
        <TextField
          autoFocus
          value={"value"}
          variant="outlined"
          onChange={(e) => setQuery(e.target.value)}
        />
        <center>
          {search(data).map((dataObj) => {
            return (
              <div className="box">
                <div class="card">
                  <div class="category">@{dataObj.username} </div>

                  <div class="heading">
                    {dataObj.name}

                    <div class="author">{dataObj.email}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </center>
      </div>
    </div>
  );
}
