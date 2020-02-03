import React from 'react';

type InputProps = {
  value: string;
  handleTermChange: (e) => void;
};

const Input: React.FC<InputProps> = ({ value, handleTermChange }) => {
  const handleClean = e => {
    e.preventDefault();
    handleTermChange('');
  };
  return (
    <form className="relative w-full h-8 text-base flex align-middle flex justify-end pr-3">
      <input
        type="text"
        className="rounded h-full p-3 pr-8 w-full  absolute top-0 left-0"
        value={value}
        onChange={e => handleTermChange(e.target.value)}
        placeholder="Search..."
      />
      <button className="z-10" onClick={handleClean}>
        X
      </button>
    </form>
  );
};

export default Input;
