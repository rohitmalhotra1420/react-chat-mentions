import React, { FC, useState, useRef } from "react";
import { useReplaceCaret } from "../utils/useReplaceCaret";
import { useRoveFocus } from "../utils/useRoveFocus";
import { MentionListItem } from "./MentionListItem";

const mentions = [
  { display: "Walter White", id: 1 },
  { display: "Jessy Pinkman", id: 2 },
  { display: "Saul Goodman", id: 3 },
  { display: "Tuco", id: 4 },
  { display: "Gutavo Fring", id: 5 },
  { display: "Hector Salamanca", id: 6 },
];

const MentionsInput: FC<any> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [content, setContent] = useState("");
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  useReplaceCaret(containerRef, content);

  const [currentFocus, setCurrentFocus] = useRoveFocus(mentions.length);

  const handleContentChange = (e: any) => {
    console.log(e.target.innerText);
    setContent(e.target.innerText);
    if (e.target.innerText.endsWith("@")) {
      setDropdownVisibility(true);
    }
  };

  const handleOnBlur = () => {
    setDropdownVisibility(false);
  };

  const handleOnFocus = () => {
    if (content.endsWith("@")) {
      setDropdownVisibility(true);
    }
  };

  const handleMentionSelect = (mention: any) => () => {
    setCurrentFocus(0);
  };

  return (
    <div>
      <div
        ref={containerRef}
        contentEditable={true}
        style={{
          width: 300,
          height: 40,
          background: "#f9f9f9",
          position: "relative",
        }}
        suppressContentEditableWarning={true}
        onInput={handleContentChange}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
      >
        {content}
      </div>
      {isDropdownVisible && (
        <div
          style={{
            position: "absolute",
            minHeight: 300,
            minWidth: 400,
            background: "#fff",
            border: "1px solid #f2f2f2",
          }}
        >
          {mentions.map((mention, index) => (
            <MentionListItem
              mention={mention}
              key={`${index}`}
              focused={currentFocus === index}
              onMentionSelect={handleMentionSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { MentionsInput };
