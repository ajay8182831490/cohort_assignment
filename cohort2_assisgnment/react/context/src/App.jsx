import { useState, useContext, createContext } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Create a context
import UserContext from './context/usecontext';

function App() {
  const [count, setCount] = useState(0);
  const [name, setname] = useState("ajay")

  return (
    <UserContext.Provider value={{ count, name }}>
      <div>
        <p>Here we pass the components</p>
        <CounterDisplay />
        <CounterButton setCount={setCount} />
      </div>
    </UserContext.Provider>
  );
}

function CounterDisplay() {
  const { count, name } = useContext(UserContext);
  return <p>Count: {count} with name :{name}</p>;
}

function CounterButton({ setCount }) {
  return <button onClick={() => setCount(count => count + 1)}>Increment</button>;
}

export default App;
