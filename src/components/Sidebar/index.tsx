import React from "react";
import { EmojiSectionType, SECTION_TYPE } from "../../types";
import Icon from "../Icon";

type SidebarProps = {
  sections: Array<EmojiSectionType>;
  currentSection?: String;
  scrollTo: Function;
};

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  currentSection,
  scrollTo
}) => {
  const renderItems = () => {
    return sections.map((section, i) => {
      const { category } = section;
      return (
        <li
          key={category}
          className={currentSection === category ? "active" : ""}
          onClick={() => handleClick(category)}
        >
          <Icon
            type={
              SECTION_TYPE[
                category
                  .toUpperCase()
                  .split("-")
                  .join("_")
              ]
            }
            active={currentSection === category}
          />
        </li>
      );
    });
  };
  const handleClick = category => {
    scrollTo(category);
  };
  return (
    <div className="fixed">
      <ul>{renderItems()}</ul>
    </div>
  );
};

export default Sidebar;
