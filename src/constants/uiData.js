export const uiData = {
  base: "no need to setup because use default vite react", // Normal React template
  tailwind: {
    indexCss: `@import "tailwindcss"; 
/* You can remove all the remaining css except @import "tailwindcss"  */

:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  flex-direction: column;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
`,
    App: `import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col items-center justify-center' style={{
      height:"90vh"
    }}>
      <div className='flex items-center justify-center'>
        <a className='block' href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className='block' href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
`,
  },
  router: {
    main: {
      ts: `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>
);

    `,
      js: `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>
);

    `,
    },
    //src/App
    App: `
import {
 Link,
 Route,
  Routes,
  useLocation
} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();

  return (
    // this is example boiler plate code of routing.
    <div>
      <nav>
      <h2 style={{
        marginBottom:"0.5rem"
      }}>Navigation Buttons 👇</h2>
        <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"1.25rem"
      }}>
            <Link
              style={{
                color: "white",
              }}
              to="/"
            >
          <button style={{
            borderBottom:
                  location.pathname === "/" ? "4px solid white" : "none",
          }}>
              Home
          </button>
            </Link>
            <Link
              style={{
                color: "white",
                }}
                to="/about"
                >
              <button style={{
                borderBottom:
                  location.pathname === "/about" ? "4px solid white" : "none",
              }}>
              About
          </button>
            </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* you can also add Dynamic path like this 👇 */}
        {/* <Route path=":id" element={<h1>ID Route</h1>} /> */}
      </Routes>
    </div>
  );
};

export default App;

`,
    // path src/pages/Home.tsx or Home.jsx
    Home: `
import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>Routing enabled!</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home;

`,
    //path src/page/About.tsx or About.jsx
    About: `      
const About = () => {
  return (
    <div
      style={{
        height:"75vh",
        display:'flex',
        flexDirection:"column",
        alignItems:'center',
        justifyContent:"center"
      }}
    >
        <h1>About Page</h1>
        <p>This is the about page of the application. And you are in the <span style={{
            fontWeight:"bold",
            color:"oklch(62.3% 0.214 259.815)"
          }}>'/about'</span> route</p>
    </div>
  )
}

export default About
      `,
  },
  redux: {
    // path: src/store/store.ts or store.js
    store: {
      ts: `import { configureStore } from '@reduxjs/toolkit'
      import counterReducer from '../features/counter/counterSlice'

        export const store = configureStore({
         reducer: {
            counter: counterReducer,
        },
     })

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
`,
      js: `import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
  `,
    },
    main: {
      js: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
`,
      ts: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
`,
    },
    // path: src/features/counter/counterSlice.ts or counterSlice.js
    counter_slice: {
      ts: `import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
`,
      js: `
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
`,
    },
    App: {
      ts: `
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { decrement, increment } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
     <>
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
                  <h2 className="mb-4 text-lg">
                    count is <span className="font-bold text-blue-500">{count}</span>
                  </h2>
                  <div className="flex items-center justify-center gap-5" style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    gap:'1rem',
                  }}>
                    <button onClick={()=>dispatch(increment())}>➕</button>
                    <button onClick={()=>dispatch(decrement())}>➖</button>
                  </div>
                  <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                  </p>
                </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
  );
}

export default App;

        `,
      js: `
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
              <h2 className="mb-4 text-lg">
                count is <span className="font-bold text-blue-500">{count}</span>
              </h2>
              <div className="flex items-center justify-center gap-5" style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                gap:'1rem',
              }}>
                <button onClick={()=>dispatch(increment())}>➕</button>
                <button onClick={()=>dispatch(decrement())}>➖</button>
              </div>
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

        `,
    },
  },
  combinations: {
    tailwind_router: {
      main: {
        ts: `
      import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>
);

      `,
        js: `
      import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>
);

      `,
      },
      App: `
      import {
  Link,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();

  return (
    // this is example boiler plate code of routing.
    <div className="max-h-9">
      <nav>
      <h2 className="mb-2">Navigation Buttons 👇</h2>
        <div className="flex align-center justify-center gap-5">
            <Link
              style={{
                color: "white",
              }}
              to="/"
            >
          <button style={{
            borderBottom:
                  location.pathname === "/" ? "4px solid white" : "none",
          }}>
              Home
          </button>
            </Link>
            <Link
              style={{
                color: "white",
                }}
                to="/about"
                >
              <button style={{
                borderBottom:
                  location.pathname === "/about" ? "4px solid white" : "none",
              }}>
              About
          </button>
            </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* you can also add Dynamic path like this 👇 */}
        {/* <Route path=":id" element={<h1>ID Route</h1>} /> */}
      </Routes>
    </div>
  );
};

export default App;
      `,
      // path: src/pages/Home.tsx or Home.jsx
      Home: `import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col items-center justify-center' style={{
      height:"90vh"
    }}>
      <div className='flex items-center justify-center'>
        <a className='block' href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className='block' href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
          `,
      //path: src/pages/About.tsx or About.jsx
      About: `      
const About = () => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height:"75vh",
      }}
    >
        <h1>About Page</h1>
        <p>This is the about page of the application. And you are in the <span className="font-bold text-blue-500">'/about'</span> route</p>
    </div>
  )
}

export default About
      `,
    },
    tailwind_redux: {
      // path: store/store.ts or store.js
      store: {
        js: "same as -> redux.store.js",
        ts: "same as -> redux.store.ts",
      },
      // path: src/features/counterSlice.js or counterSlice.ts
      counter_slice: {
        js: "same as -> redux.slices.js",
        ts: "same as -> redux.slices.ts",
      },
      main: "same as -> redux.main.js or redux.main.ts",
      App: {
        js: `      
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height: "90vh",
      }}
    >
      <div className="flex items-center justify-center">
        <a className="block" href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className="block" href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>Tailwind + Redux</h3>
      <div className="card">
        <h2 className="mb-4 text-lg">
          count is <span className="font-bold text-blue-500">{count}</span>
        </h2>
        <div className="flex items-center justify-center gap-5">
          <button onClick={()=>dispatch(increment())}>➕</button>
          <button onClick={()=>dispatch(decrement())}>➖</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
        `,
        ts: `
        
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { decrement, increment } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height: "90vh",
      }}
    >
      <div className="flex items-center justify-center">
        <a className="block" href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className="block" href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>Tailwind + Redux</h3>
      <div className="card">
        <h2 className="mb-4 text-lg">
          count is <span className="font-bold text-blue-500">{count}</span>
        </h2>
        <div className="flex items-center justify-center gap-5">
          <button onClick={()=>dispatch(increment())}>➕</button>
          <button onClick={()=>dispatch(decrement())}>➖</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

        `,
      },
    },
    router_redux: {
      // path src/main
      main: {
        ts: `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
      `,
        js: `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
      `,
      },
      App: `import {
  Link,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();

  return (
    // this is example boiler plate code of routing.
    <div>
      <nav>
      <h2 style={{
        marginBottom:"0.5rem"
      }}>Navigation Buttons 👇</h2>
        <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"1.25rem"
      }}>
            <Link
              style={{
                color: "white",
              }}
              to="/"
            >
          <button style={{
            borderBottom:
                  location.pathname === "/" ? "4px solid white" : "none",
          }}>
              Home
          </button>
            </Link>
            <Link
              style={{
                color: "white",
                }}
                to="/about"
                >
              <button style={{
                borderBottom:
                  location.pathname === "/about" ? "4px solid white" : "none",
              }}>
              About
          </button>
            </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* you can also add Dynamic path like this 👇 */}
        {/* <Route path=":id" element={<h1>ID Route</h1>} /> */}
      </Routes>
    </div>
  );
};

export default App;
`,
      Home: {
        ts: `
        
        
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { decrement, increment } from "../features/counter/counterSlice";
import '../App.css';

function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div
     style={{
        height:"75vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        marginTop:"3rem"
      }}
    >
      <div  style={{
      display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
      }}>
        <a className="block" href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className="block" href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>Redux + Router enabled!</h3>
      <div className="card">
        <h2 style={{
          marginBottom:"1.125rem",
          fontSize:"1.3rem",
          lineHeight:"1.75"
        }}>
          count is <span style={{
            fontWeight:"bold",
            color:"oklch(62.3% 0.214 259.815)"
          }}>{count}</span>
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          }}>
          <button onClick={()=>dispatch(increment())}>➕</button>
          <button onClick={()=>dispatch(decrement())}>➖</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Home;
        

        `,
        js: `
        
        
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/counter/counterSlice";
import '../App.css';

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div
     style={{
        height:"75vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        marginTop:"3rem"
      }}
    >
      <div  style={{
      display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
      }}>
        <a className="block" href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className="block" href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>Redux + Router enabled!</h3>
      <div className="card">
        <h2 style={{
          marginBottom:"1.125rem",
          fontSize:"1.3rem",
          lineHeight:"1.75"
        }}>
          count is <span style={{
            fontWeight:"bold",
            color:"oklch(62.3% 0.214 259.815)"
          }}>{count}</span>
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          }}>
          <button onClick={()=>dispatch(increment())}>➕</button>
          <button onClick={()=>dispatch(decrement())}>➖</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Home;
        

        `,
      },
      About: `      
const About = () => {
  return (
    <div
      style={{
        height:"75vh",
        display:'flex',
        flexDirection:"column",
        alignItems:'center',
        justifyContent:"center"
      }}
    >
        <h1>About Page</h1>
        <p>This is the about page of the application. And you are in the <span style={{
            fontWeight:"bold",
            color:"oklch(62.3% 0.214 259.815)"
          }}>'/about'</span> route</p>
    </div>
  )
}

export default About
      `,
      // path: src/store.js or store.ts
      store: "same as -> redux.store.ts or redux.store.js",
      // path: src/features/counterSlice.ts or counterSlice.js
      counter_slice:
        "same as -> redux.counter_slice.js or redux.counter_slice.ts",
    },
    tailwind_router_redux: {
      indexCss: "same as -> tailwind.indexCss",
      App: `import {
  Link,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();

  return (
    // this is example boiler plate code of routing.
    <div className="max-h-9">
      <nav>
      <h2 className="mb-2">Navigation Buttons 👇</h2>
        <div className="flex align-center justify-center gap-5" >
            <Link
              style={{
                color: "white",
              }}
              to="/"
            >
          <button style={{
            borderBottom:
                  location.pathname === "/" ? "4px solid white" : "none",
          }}>
              Home
          </button>
            </Link>
            <Link
              style={{
                color: "white",
                }}
                to="/about"
                >
              <button style={{
                borderBottom:
                  location.pathname === "/about" ? "4px solid white" : "none",
              }}>
              About
          </button>
            </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* you can also add Dynamic path like this 👇 */}
        {/* <Route path=":id" element={<h1>ID Route</h1>} /> */}
      </Routes>
    </div>
  );
};

export default App;
`,
      // path: src/pages/Home.tsx or Home.jsx
      Home: {
        ts: `      
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { decrement, increment } from "../features/counter/counterSlice";
import '../App.css';

function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        height: "90vh",
      }}
    >
      <div className="flex items-center justify-center">
        <a className="block" href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className="block" href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>Tailwind + Redux + Router enabled!</h3>
      <div className="card">
        <h2 className="mb-4 text-lg">
          count is <span className="font-bold text-blue-500">{count}</span>
        </h2>
        <div className="flex items-center justify-center gap-5">
          <button onClick={()=>dispatch(increment())}>➕</button>
          <button onClick={()=>dispatch(decrement())}>➖</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Home;
        `,
        js: `
        
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useDispatch, useSelector } from "react-redux";

import { decrement, increment } from "../features/counter/counterSlice";
import '../App.css';

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        height: "90vh",
      }}
    >
      <div className="flex items-center justify-center">
        <a className="block" href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className="block" href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>Tailwind + Redux + Router enabled!</h3>
      <div className="card">
        <h2 className="mb-4 text-lg">
          count is <span className="font-bold text-blue-500">{count}</span>
        </h2>
        <div className="flex items-center justify-center gap-5">
          <button onClick={()=>dispatch(increment())}>➕</button>
          <button onClick={()=>dispatch(decrement())}>➖</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Home;

        `,
      },
      //path: src/pages/About.tsx or About.jsx
      About: `      
const About = () => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height:"75vh",
      }}
    >
        <h1>About Page</h1>
        <p>This is the about page of the application. And you are in the <span className="font-bold text-blue-500">'/about'</span> route</p>
    </div>
  )
}

export default About
      `,
      // path src/main
      main: {
        js: `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
      `,
        ts: `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
      `,
      },
      // path: src/store.js or store.ts
      store: "same as -> redux.store.ts or redux.store.js",
      // path: src/features/counterSlice.ts or counterSlice.js
      counter_slice:
        "same as -> redux.counter_slice.js or redux.counter_slice.ts",
    },
  },
};
