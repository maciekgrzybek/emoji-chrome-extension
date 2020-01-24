import React from "react";
import { EmojiSectionType, SECTION_TYPE } from "../../types";
import Icon from "../Icon";

type CategoriesMenuProps = {
  sections: Array<EmojiSectionType>;
  currentSection?: String;
  scrollTo: Function;
  setCurrentSection: Function;
};

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({
  sections,
  currentSection,
  scrollTo,
  setCurrentSection
}) => {
  const renderItems = () => {
    return sections.map((section, i) => {
      const { category } = section;
      return (
        <li
          key={category}
          className={`${currentSection === category ? "active" : ""} w-full`}
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
  const handleClick = async category => {
    const canScrollTo = await scrollTo(category);
    if (canScrollTo) {
      setCurrentSection(category);
    }
  };
  return <ul className="flex w-full">{renderItems()}</ul>;
};

export default CategoriesMenu;
