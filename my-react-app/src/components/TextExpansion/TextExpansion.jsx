import React from "react";
import { useState } from "react";

export default function TextExpansion({ text, maxLength = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return null;
  }

  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  const displayedText = isExpanded ? text : text.slice(0, maxLength) + "...";

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <p>
      {displayedText}
      {!isExpanded && (
        <button onClick={toggleExpansion} className="read-more">
          Read More
        </button>
      )}
      {isExpanded && (
        <button onClick={toggleExpansion} className="read-less">
          Read Less
        </button>
      )}
    </p>
  );
}
