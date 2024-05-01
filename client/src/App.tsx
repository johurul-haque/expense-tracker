import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col">
        <button
          className="bg-blue-100"
          onClick={() => setCount((count) => count + 1)}
        >
          up
        </button>

        <button
          className="bg-red-100 hover:bg-red-300"
          onClick={() => setCount((count) => count - 1)}
        >
          down
        </button>
        <p>{count}</p>
      </div>
    </>
  );
}

export default App;
