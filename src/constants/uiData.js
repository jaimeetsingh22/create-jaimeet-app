export const uiData = {
  base: "no need to setup because use default vite react",
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
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className="flex flex-col gap-6 items-center justify-center flex-grow p-8 text-center">
        <div className="relative w-[170px] h-[179px] mx-auto">
          <img src={heroImg} className="absolute inset-x-0 mx-auto z-0" width="170" height="179" alt="" />
          <img src={reactLogo} className="absolute inset-x-0 mx-auto z-10 top-[34px] h-[28px] drop-shadow-lg" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)" }} alt="React logo" />
          <img src={viteLogo} className="absolute inset-x-0 mx-auto z-0 top-[107px] h-[26px] w-auto drop-shadow-md" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)" }} alt="Vite logo" />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Get started</h1>
          <p className="text-gray-400">
            Edit <code className="bg-white/10 px-1 py-0.5 rounded">src/App.jsx</code> and save to test <code className="bg-white/10 px-1 py-0.5 rounded">HMR</code>
          </p>
        </div>
        
        <button type="button" className="text-base px-3 py-1.5 rounded-md bg-[#1a1a1a] border-2 border-transparent hover:border-[#646cff] transition-colors mb-6" onClick={() => setCount((count) => count + 1)}>Count is {count}</button>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>

      <section className="flex flex-col lg:flex-row text-left w-full max-w-5xl mx-auto">
        <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-[#333]">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Documentation</h2>
          <p className="text-gray-400 mb-6">Your questions, answered</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4 w-4" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Connect with us</h2>
          <p className="text-gray-400 mb-6">Join the Vite community</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>
      <section className="h-12 lg:h-24"></section>
    </>
  )
}

export default App
`
  },
  router: {
    main: {
      ts: `import { StrictMode } from "react";
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
);`,
      js: `import { StrictMode } from "react";
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
);`
    },
    App: `import { Link, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();

  return (
    <div>
      <nav style={{ padding: "16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "center", gap: "16px", backgroundColor: "var(--social-bg)" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <button style={{ borderBottom: location.pathname === "/" ? "2px solid #646cff" : "none", background: "none", border: "none", padding: "8px", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            Home
          </button>
        </Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
          <button style={{ borderBottom: location.pathname === "/about" ? "2px solid #646cff" : "none", background: "none", border: "none", padding: "8px", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            About
          </button>
        </Link>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
`,
    Home: `import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../App.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        
        <button type="button" className="counter" onClick={() => setCount((count) => count + 1)}>Count is {count}</button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Home
`,
    About: `const About = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexGrow: 1, padding: "32px", textAlign: "center" }}>
      <h1 >About Page</h1>
      <p >This is the about page. You are currently on the <span style={{ color: "var(--accent)", fontWeight: "bold" }}>'/about'</span> route.</p>
    </div>
  )
}

export default About;
`
  },
  redux: {
    store: {
      ts: `import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch`,
      js: `import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})`
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
);`,
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
);`
    },
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

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer`,
      js: `import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
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

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer`
    },
    App: {
      ts: `import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";
import type { RootState } from "./store/store";

function App() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <h2>count is <span style={{ color: 'var(--accent)' }}>{count}</span></h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}><button className="counter" onClick={() => dispatch(increment())}>➕</button><button className="counter" onClick={() => dispatch(decrement())}>➖</button></div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
`,
      js: `import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <h2>count is <span style={{ color: 'var(--accent)' }}>{count}</span></h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}><button className="counter" onClick={() => dispatch(increment())}>➕</button><button className="counter" onClick={() => dispatch(decrement())}>➖</button></div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
`
    }
  },
  combinations: {
    tailwind_router: {
      main: {
        ts: `import { StrictMode } from "react";
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
);`,
        js: `import { StrictMode } from "react";
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
);`
      },
      App: `import { Link, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="p-4 border-b border-[#333] flex justify-center gap-4 bg-[#1a1a1a]">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <button style={{ borderBottom: location.pathname === "/" ? "2px solid #646cff" : "none", background: "none", border: "none", padding: "8px", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            Home
          </button>
        </Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
          <button style={{ borderBottom: location.pathname === "/about" ? "2px solid #646cff" : "none", background: "none", border: "none", padding: "8px", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            About
          </button>
        </Link>
      </nav>
      <div className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
`,
      Home: `import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../App.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className="flex flex-col gap-6 items-center justify-center flex-grow p-8 text-center">
        <div className="relative w-[170px] h-[179px] mx-auto">
          <img src={heroImg} className="absolute inset-x-0 mx-auto z-0" width="170" height="179" alt="" />
          <img src={reactLogo} className="absolute inset-x-0 mx-auto z-10 top-[34px] h-[28px] drop-shadow-lg" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)" }} alt="React logo" />
          <img src={viteLogo} className="absolute inset-x-0 mx-auto z-0 top-[107px] h-[26px] w-auto drop-shadow-md" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)" }} alt="Vite logo" />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Get started</h1>
          <p className="text-gray-400">
            Edit <code className="bg-white/10 px-1 py-0.5 rounded">src/App.jsx</code> and save to test <code className="bg-white/10 px-1 py-0.5 rounded">HMR</code>
          </p>
        </div>
        
        <button type="button" className="text-base px-3 py-1.5 rounded-md bg-[#1a1a1a] border-2 border-transparent hover:border-[#646cff] transition-colors mb-6" onClick={() => setCount((count) => count + 1)}>Count is {count}</button>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>

      <section className="flex flex-col lg:flex-row text-left w-full max-w-5xl mx-auto">
        <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-[#333]">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Documentation</h2>
          <p className="text-gray-400 mb-6">Your questions, answered</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4 w-4" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Connect with us</h2>
          <p className="text-gray-400 mb-6">Join the Vite community</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>
      <section className="h-12 lg:h-24"></section>
    </>
  )
}

export default Home
`,
      About: `const About = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">About Page</h1>
      <p className="text-gray-400">This is the about page. You are currently on the <span className="text-[#646cff] font-bold">'/about'</span> route.</p>
    </div>
  )
}

export default About;
`
    },
    tailwind_redux: {
      store: {
        js: "same as -> redux.store.js",
        ts: "same as -> redux.store.ts"
      },
      counter_slice: {
        js: "same as -> redux.counter_slice.js",
        ts: "same as -> redux.counter_slice.ts"
      },
      main: "same as -> redux.main.js or redux.main.ts",
      App: {
        ts: `import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";
import type { RootState } from "./store/store";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <section className="flex flex-col gap-6 items-center justify-center flex-grow p-8 text-center">
        <div className="relative w-[170px] h-[179px] mx-auto">
          <img src={heroImg} className="absolute inset-x-0 mx-auto z-0" width="170" height="179" alt="" />
          <img src={reactLogo} className="absolute inset-x-0 mx-auto z-10 top-[34px] h-[28px] drop-shadow-lg" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)" }} alt="React logo" />
          <img src={viteLogo} className="absolute inset-x-0 mx-auto z-0 top-[107px] h-[26px] w-auto drop-shadow-md" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)" }} alt="Vite logo" />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Get started</h1>
          <p className="text-gray-400">
            Edit <code className="bg-white/10 px-1 py-0.5 rounded">src/App.jsx</code> and save to test <code className="bg-white/10 px-1 py-0.5 rounded">HMR</code>
          </p>
        </div>
        <h2 className="mb-4 text-lg">count is <span className="font-bold text-[#646cff]">{count}</span></h2>
        <div className="flex gap-4 mb-6"><button className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border-2 border-transparent hover:border-[#646cff] transition-colors" onClick={() => dispatch(increment())}>➕</button><button className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border-2 border-transparent hover:border-[#646cff] transition-colors" onClick={() => dispatch(decrement())}>➖</button></div>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>

      <section className="flex flex-col lg:flex-row text-left w-full max-w-5xl mx-auto">
        <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-[#333]">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Documentation</h2>
          <p className="text-gray-400 mb-6">Your questions, answered</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4 w-4" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Connect with us</h2>
          <p className="text-gray-400 mb-6">Join the Vite community</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>
      <section className="h-12 lg:h-24"></section>
    </>
  )
}

export default App
`,
        js: `import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <section className="flex flex-col gap-6 items-center justify-center flex-grow p-8 text-center">
        <div className="relative w-[170px] h-[179px] mx-auto">
          <img src={heroImg} className="absolute inset-x-0 mx-auto z-0" width="170" height="179" alt="" />
          <img src={reactLogo} className="absolute inset-x-0 mx-auto z-10 top-[34px] h-[28px] drop-shadow-lg" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)" }} alt="React logo" />
          <img src={viteLogo} className="absolute inset-x-0 mx-auto z-0 top-[107px] h-[26px] w-auto drop-shadow-md" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)" }} alt="Vite logo" />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Get started</h1>
          <p className="text-gray-400">
            Edit <code className="bg-white/10 px-1 py-0.5 rounded">src/App.jsx</code> and save to test <code className="bg-white/10 px-1 py-0.5 rounded">HMR</code>
          </p>
        </div>
        <h2 className="mb-4 text-lg">count is <span className="font-bold text-[#646cff]">{count}</span></h2>
        <div className="flex gap-4 mb-6"><button className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border-2 border-transparent hover:border-[#646cff] transition-colors" onClick={() => dispatch(increment())}>➕</button><button className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border-2 border-transparent hover:border-[#646cff] transition-colors" onClick={() => dispatch(decrement())}>➖</button></div>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>

      <section className="flex flex-col lg:flex-row text-left w-full max-w-5xl mx-auto">
        <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-[#333]">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Documentation</h2>
          <p className="text-gray-400 mb-6">Your questions, answered</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4 w-4" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Connect with us</h2>
          <p className="text-gray-400 mb-6">Join the Vite community</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>
      <section className="h-12 lg:h-24"></section>
    </>
  )
}

export default App
`
      }
    },
    router_redux: {
      main: {
        ts: `import { StrictMode } from "react";
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
);`,
        js: `import { StrictMode } from "react";
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
);`
      },
      App: `import { Link, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();

  return (
    <div>
      <nav style={{ padding: "16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "center", gap: "16px", backgroundColor: "var(--social-bg)" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <button style={{ borderBottom: location.pathname === "/" ? "2px solid #646cff" : "none", background: "none", border: "none", padding: "8px", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            Home
          </button>
        </Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
          <button style={{ borderBottom: location.pathname === "/about" ? "2px solid #646cff" : "none", background: "none", border: "none", padding: "8px", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            About
          </button>
        </Link>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
`,
      Home: {
        ts: `import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/counter/counterSlice";
import type { RootState } from "../store/store";

function Home() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <h2>count is <span style={{ color: 'var(--accent)' }}>{count}</span></h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}><button className="counter" onClick={() => dispatch(increment())}>➕</button><button className="counter" onClick={() => dispatch(decrement())}>➖</button></div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Home
`,
        js: `import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/counter/counterSlice";

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <h2>count is <span style={{ color: 'var(--accent)' }}>{count}</span></h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}><button className="counter" onClick={() => dispatch(increment())}>➕</button><button className="counter" onClick={() => dispatch(decrement())}>➖</button></div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Home
`
      },
      About: `const About = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexGrow: 1, padding: "32px", textAlign: "center" }}>
      <h1 >About Page</h1>
      <p >This is the about page. You are currently on the <span style={{ color: "var(--accent)", fontWeight: "bold" }}>'/about'</span> route.</p>
    </div>
  )
}

export default About;
`,
      store: "same as -> redux.store.ts or redux.store.js",
      counter_slice: "same as -> redux.counter_slice.js or redux.counter_slice.ts"
    },
    tailwind_router_redux: {
      indexCss: "same as -> tailwind.indexCss",
      App: `import { Link, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="p-4 border-b border-[#333] flex justify-center gap-4 bg-[#1a1a1a]">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <button style={{ borderBottom: location.pathname === "/" ? "2px solid #646cff" : "none", background: "none", border: "none", padding: "8px", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            Home
          </button>
        </Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
          <button style={{ borderBottom: location.pathname === "/about" ? "2px solid #646cff" : "none", background: "none", border: "none", padding: "8px", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            About
          </button>
        </Link>
      </nav>
      <div className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
`,
      Home: {
        ts: `import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/counter/counterSlice";
import type { RootState } from "../store/store";

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <section className="flex flex-col gap-6 items-center justify-center flex-grow p-8 text-center">
        <div className="relative w-[170px] h-[179px] mx-auto">
          <img src={heroImg} className="absolute inset-x-0 mx-auto z-0" width="170" height="179" alt="" />
          <img src={reactLogo} className="absolute inset-x-0 mx-auto z-10 top-[34px] h-[28px] drop-shadow-lg" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)" }} alt="React logo" />
          <img src={viteLogo} className="absolute inset-x-0 mx-auto z-0 top-[107px] h-[26px] w-auto drop-shadow-md" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)" }} alt="Vite logo" />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Get started</h1>
          <p className="text-gray-400">
            Edit <code className="bg-white/10 px-1 py-0.5 rounded">src/App.jsx</code> and save to test <code className="bg-white/10 px-1 py-0.5 rounded">HMR</code>
          </p>
        </div>
        <h2 className="mb-4 text-lg">count is <span className="font-bold text-[#646cff]">{count}</span></h2>
        <div className="flex gap-4 mb-6"><button className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border-2 border-transparent hover:border-[#646cff] transition-colors" onClick={() => dispatch(increment())}>➕</button><button className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border-2 border-transparent hover:border-[#646cff] transition-colors" onClick={() => dispatch(decrement())}>➖</button></div>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>

      <section className="flex flex-col lg:flex-row text-left w-full max-w-5xl mx-auto">
        <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-[#333]">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Documentation</h2>
          <p className="text-gray-400 mb-6">Your questions, answered</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4 w-4" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Connect with us</h2>
          <p className="text-gray-400 mb-6">Join the Vite community</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>
      <section className="h-12 lg:h-24"></section>
    </>
  )
}

export default Home
`,
        js: `import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/counter/counterSlice";

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <section className="flex flex-col gap-6 items-center justify-center flex-grow p-8 text-center">
        <div className="relative w-[170px] h-[179px] mx-auto">
          <img src={heroImg} className="absolute inset-x-0 mx-auto z-0" width="170" height="179" alt="" />
          <img src={reactLogo} className="absolute inset-x-0 mx-auto z-10 top-[34px] h-[28px] drop-shadow-lg" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)" }} alt="React logo" />
          <img src={viteLogo} className="absolute inset-x-0 mx-auto z-0 top-[107px] h-[26px] w-auto drop-shadow-md" style={{ transform: "perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)" }} alt="Vite logo" />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Get started</h1>
          <p className="text-gray-400">
            Edit <code className="bg-white/10 px-1 py-0.5 rounded">src/App.jsx</code> and save to test <code className="bg-white/10 px-1 py-0.5 rounded">HMR</code>
          </p>
        </div>
        <h2 className="mb-4 text-lg">count is <span className="font-bold text-[#646cff]">{count}</span></h2>
        <div className="flex gap-4 mb-6"><button className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border-2 border-transparent hover:border-[#646cff] transition-colors" onClick={() => dispatch(increment())}>➕</button><button className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border-2 border-transparent hover:border-[#646cff] transition-colors" onClick={() => dispatch(decrement())}>➖</button></div>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>

      <section className="flex flex-col lg:flex-row text-left w-full max-w-5xl mx-auto">
        <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-[#333]">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Documentation</h2>
          <p className="text-gray-400 mb-6">Your questions, answered</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <img className="h-4 w-4" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8">
          <svg className="w-6 h-6 mb-4" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2 className="text-xl font-semibold mb-2">Connect with us</h2>
          <p className="text-gray-400 mb-6">Join the Vite community</p>
          <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-shadow text-white no-underline">
                <svg className="h-4 w-4" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="relative w-full border-t border-[#333]"></div>
      <section className="h-12 lg:h-24"></section>
    </>
  )
}

export default Home
`
      },
      About: `const About = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">About Page</h1>
      <p className="text-gray-400">This is the about page. You are currently on the <span className="text-[#646cff] font-bold">'/about'</span> route.</p>
    </div>
  )
}

export default About;
`,
      main: {
        ts: `import { StrictMode } from "react";
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
);`,
        js: `import { StrictMode } from "react";
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
);`
      },
      store: "same as -> redux.store.ts or redux.store.js",
      counter_slice: "same as -> redux.counter_slice.js or redux.counter_slice.ts"
    }
  }
};