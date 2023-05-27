import { useState } from "react";

interface ListGroupProps {
  title: String;
  items: any[];
  onSelectItem: (item: any) => void;
}

function ListGroup({ title, items, onSelectItem }: ListGroupProps) {
  const [selectedIndex, setSelection] = useState<number>(-1);

  return (
    <>
      <h1>{title}</h1>
      {items.length === 0 && "No items."}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelection(index);
              onSelectItem(item);
            }}
          >
            {index + 1 + "| " + item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
