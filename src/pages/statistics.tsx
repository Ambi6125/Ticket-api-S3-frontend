import React, { useState } from "react";
import { AccountAPI, AccountRanking } from "../API/AccountAPI";

interface Option {
  [key: string]: (min: number) => Promise<AccountRanking[]>;
}

const options: Option = {
  "Tickets Bought": AccountAPI.GetUsersByTicketsBought,
};

export function StatisticsPage(): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string>("Tickets Bought");
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
      try {
        const response = await fetchData(inputValue);
        console.log("Response: ", response);
        setResults(response);
      } catch (error) {
        console.log("Error rendering results:", error);
      }
    }
  };

  return (
    <div className="statistics-page">
      <h1>Statistics Page</h1>
      <div className="select-statistic-container">
        <select value={selectedOption} onChange={handleOptionChange}>
          {Object.keys(options).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input type="number" value={inputValue} onChange={handleInputChange} />
        <button className="standard-button" onClick={handleFetchData}>Fetch Data</button>
      </div>
      <div className="results-container">
        <h2>Results</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Ticket Count</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.username}>
                <td>{result.username}</td>
                <td>{result.ticketCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
