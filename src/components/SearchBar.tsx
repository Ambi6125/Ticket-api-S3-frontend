import { ChangeEvent, useState, MouseEvent } from "react";

interface SearchBarProps<T> {
  searchMethod: (text: string) => Promise<T>;
  responseCatcher: (data: T) => any;
  searchBarText?: string;
  buttonText?: string;
}

/**
 * A searchbar with button that can be passed a search function. Resulting types are specified.
 * @param T The type of item(s) the search is expected to result in.
 * @param searchMethod The function that gets called when search is triggered.
 * @param responseCatcher A function to catch the returned data and process it.
 * @param searchBarText The text to display in the search bar when nothing is typed in it.
 * @param buttonText The text on the button.
 */
export default function SearchBar<T>({
  searchMethod,
  responseCatcher,
  searchBarText = "Search for something...",
  buttonText = "Search",
}: SearchBarProps<T>): JSX.Element {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const searchResult = searchMethod(searchTerm).then(result => responseCatcher(result));
  }
 
  return (
    <div className="searchbar">
      <input type="text" placeholder={searchBarText} value={searchTerm} onChange={handleChange}></input>
      <button type="submit" onClick={handleClick}>{buttonText}</button>
    </div>
  );
}
