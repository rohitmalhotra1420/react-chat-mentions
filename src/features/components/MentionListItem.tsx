import React, { FC } from "react";

const MentionListItem: FC<any> = ({ mention, focused, onMentionSelect }) => {
  return (
    <p
      style={{
        cursor: "pointer",
        backgroundColor: focused ? "green" : "transparent",
      }}
      onClick={onMentionSelect}
    >
      {mention.display}
    </p>
  );
};

export { MentionListItem };
