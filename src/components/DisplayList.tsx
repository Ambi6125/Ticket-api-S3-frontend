import { ReactNode } from "react"

interface DisplayListProps {
  title: String;
  items: any[];
  enumerate?: boolean;
}

export default function DisplayList({ title, items, enumerate = true }: DisplayListProps) {
  const enumeratedList = (items: any[]) =>
    items.map((item, index) => (
      <li className="list-group-item">{index + 1 + ". " + item}</li>
    ));

  const nonEnumeratedList = (items: any[]) =>
    items.map((item) => <li className="list-group-item">{item}</li>);

  const enumerationFunction: (items: any[]) => ReactNode = enumerate ? enumeratedList : nonEnumeratedList

  return (
    <div>
      <h2>{title}</h2> 
      <ul className="list-group">
            {enumerationFunction(items)}
      </ul>
    </div>
  );
}
