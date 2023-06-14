import React, { useState } from "react";
import { AccountAPI, AccountRanking } from "../API/AccountAPI";

interface Option {
  [key: string]: (min: number) => Promise<AccountRanking[]>;
}

const options: Option = {
  "Tickets Bought": AccountAPI.GetUsersByTicketsBought,
};

export function StatisticsPage(): JSX.Element {
  const [selectedOption, setSelectedOption] =
    useState<string>("Tickets Bought");
  const [results, setResults] = useState<AccountRanking[]>([]);
  const [inputValue, setInputValue] = useState<number>(0);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(event.target.value));
  };

  const handleFetchData = async () => {
    const fetchData = options[selectedOption];
    if (fetchData) {
      fetchData(inputValue)
        .then((response) => {
          console.log("Response: ", response);
          setResults(response);
        })
        .catch((error) => console.log("Error rendering results:", error));
    }
  };

  return (
    <div className="statistics-page">
      <h1>Statistics Page</h1>
      <div className="select-container">
        <select value={selectedOption} onChange={handleOptionChange}>
          {Object.keys(options).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input type="number" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleFetchData}>Fetch Data</button>
      </div>
      <div className="results-container">
        <h2>Results</h2>
        <ul>
          {results.map((result) => (
            <li key={result.username}>{result.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
