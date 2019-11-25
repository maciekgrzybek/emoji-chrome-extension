import React from 'react';
import useCopyEmoji from '../../helpers/useCopyEmoji';

const App: React.FC = () => {
  return (
    <div className="h-app w-app">
      <header className="">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span
          onClick={() =>
            useCopyEmoji([0x1f939, 0x1f3ff, 0x200d, 0x2642, 0xfe0f])
          }
        >
          Icon goes here manb
        </span>
      </header>
    </div>
  );
};

export default App;
