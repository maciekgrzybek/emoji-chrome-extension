import React from "react";

type InputProps = {
  value: string;
  handleTermChange: (e) => void;
};

const Input: React.FC<InputProps> = ({ value, handleTermChange }) => {
  const handleClean = e => {
    e.preventDefault();
    handleTermChange("");
  };
  return (
    <form className="relative w-3/5 h-10 text-base flex align-middle flex justify-end pr-3 mb-5">
      <input
        type="text"
        className="border-solid border-gray-400 border rounded-lg h-full p-3 pr-8 w-full  absolute top-0 left-0"
        value={value}
        onChange={e => handleTermChange(e.target.value)}
      />
      <button className="z-10" onClick={handleClean}>
        X
      </button>
    </form>
  );
};

export default Input;
