import { useRef } from "react";

interface searchBarProps<T> {
  searchMethod: (text: string) => Promise<T>;
  onSubmit: (searchResults: T) => void;
  searchBarText?: string;
  buttonText?: string;
}

/**
 * A searchbar with button that can be passed a search function. Resulting types are specified.
 * @param T The type of item(s) the search is expected to result in.
 * @param searchMethod The function that gets called when search is triggered
 * @param searchBarText The text to display in the search bar when nothing is typed in it.
 * @param buttonText The text on the button.
 */
export default function SearchBar<T>({
  searchMethod,
  searchBarText = "Search for...",
  buttonText = "Search",
}: searchBarProps<T>): JSX.Element {
  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const searchText = inputRef.current?.value ?? "";
    searchMethod(searchText);
  };

  return (
    <>
      <input type="text" placeholder={searchBarText} ref={inputRef} />
      <button type="button" onClick={handleClick}>
        {buttonText}
      </button>
    </>
  );
}
