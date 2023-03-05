import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
} from "solid-js";
import { classList } from "solid-js/web";
import { classNames } from "./util";

const initialBoardSize = 25;

const App: Component = () => {
  const [boardSize, setBoardSize] = createSignal(initialBoardSize);

  const [tiles, setTiles] = createSignal<boolean[]>(
    Array(initialBoardSize ** 2).fill(false)
  );

  const [isRunning, setIsRunning] = createSignal(false);

  const [isMouseDown, setIsMouseDown] = createSignal(false);
  const onMouseOverTile = (index: number) => {
    if (isMouseDown()) {
      const newTiles = tiles().slice();
      newTiles[index] = true;
      setTiles(newTiles);
    }
  };

  const randomNumber = () => Math.floor(Math.random() * 14000000).toString(16);

  const step = () => {
    setTiles((prev) =>
      prev.map((isAlive, index) => {
        console.log(isAlive);

        // TODO: toss in some modulos
        const numberOfLiveNeighbors =
          Number(!!prev[index - boardSize() - 1]) +
          Number(!!prev[index - boardSize()]) +
          Number(!!prev[index - boardSize() + 1]) +
          Number(!!prev[index - 1]) +
          Number(!!prev[index + 1]) +
          Number(!!prev[index + boardSize() - 1]) +
          Number(!!prev[index + boardSize()]) +
          Number(!!prev[index + boardSize() + 1]);
        if (!isAlive) {
          return numberOfLiveNeighbors === 3;
        }
        if (numberOfLiveNeighbors < 2) {
          return !isAlive;
        }
        if (numberOfLiveNeighbors > 3) {
          return !isAlive;
        }
        if (numberOfLiveNeighbors === 2 || numberOfLiveNeighbors === 3) {
          return isAlive;
        }
      })
    );
  };

  setInterval(() => {
    if (isRunning()) {
      step();
    }
  }, 75);

  // createEffect(() => {
  //   if (isRunning()) {
  //     stepTimeout();
  //   }
  // });

  // const stepTimeout = () => {
  //   step();
  //   setTimeout(stepTimeout, 75);
  // };

  const buttonClasses =
    "border rounded-full px-7 py-2 border-cyan-500 text-cyan-500";

  return (
    <div
      onMouseUp={() => setIsMouseDown(false)}
      class="w-full h-full flex flex-col justify-center items-center gap-y-3 mt-10"
    >
      <div
        onMouseDown={() => setIsMouseDown(true)}
        class="grid shadow-xl w-[30%] h-[30vw]"
        style={{
          "grid-template-columns": `repeat(${boardSize()}, 1fr)`,
          "grid-template-rows": `repeat(${boardSize()}, 1fr)`,
        }}
      >
        <For each={tiles()}>
          {(tile, index) => (
            <div
              onMouseOver={() => onMouseOverTile(index())}
              class="border border-cyan-500"
              style={{
                "background-color": tile ? `#${randomNumber()}` : "white",
              }}
            />
          )}
        </For>
      </div>

      <div class="flex gap-x-5 w-[30%] mt-5  justify-between">
        <button
          class={buttonClasses}
          onClick={() => setIsRunning(!isRunning())}
        >
          Start
        </button>
        <button class={buttonClasses}>Next</button>
        <button class={buttonClasses}>Clear</button>
      </div>
    </div>
  );
};

export default App;
