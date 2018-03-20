export const WUMPUS_INIT = "WUMPUS_INIT";
export const WUMPUS_MOVE = "WUMPUS_MOVE";

const initialState = {
  caveIndex: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WUMPUS_INIT:
      const caveIndex = Math.trunc(Math.random() * state.mazeData.maze.length);
      return {
        caveIndex
      };
    default: 
      return state;
  }
}

export const wumpusInit = () => {
  return {
    type: WUMPUS_INIT
  };
}