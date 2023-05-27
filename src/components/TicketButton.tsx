import React from "react";

interface ButtonProps {
  text: string;
  onButtonClick: () => void;
}

export default function TicketButton({ text, onButtonClick }: ButtonProps) {
  return (
    <button type="button" className="btn btn-primary" onClick={onButtonClick}>
      {text}
    </button>
  );
}
