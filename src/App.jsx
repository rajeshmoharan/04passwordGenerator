import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!~@#$%^&*)";
    }
    // loop
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

// use ref
const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
},[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div>
        <h1 className="text-white text-center mt-7 text-5xl font-bold">
          Welcome to Password Generator
        </h1>
      </div>
      <div className="text-center justify-center m-10 text-3xl rounded-md">
        <div>
          <input
            className="p-2 rounded-lg text-3xl"
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="text-white rounded-lg bg-blue-600 p-2 text-center text-3xl cursor-pointer"
            onClick={copyPassword}
          >
            copy
          </button>
        </div>
        {/* range div */}
        <div className="flex justify-center mt-6">
          {/* range div */}
          <div className="">
            <input
              className="cursor-pointer"
              type="range"
              min={8}
              max={100}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-orange-500 text-2xl font-bold">
              Length:{length}
            </label>
          </div>
          <div className="ml-5">
            <input
              className="size-4"
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((pre) => !pre)}
            />
            <label className="text-orange-500 font-bold text-2xl">Number</label>
          </div>
          <div className="ml-5">
            <input
              className="size-4"
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((pre) => !pre)}
            />
            <label className="text-orange-500 font-bold text-2xl">
              Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
