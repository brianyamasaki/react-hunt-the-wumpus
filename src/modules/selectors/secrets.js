import { createSelector } from 'reselect';

const getBats = (state) => {
  return state.bats.batRooms;
}

const getPlayer = (state) => {
  return state.player;
}

const getPits = (state) => {
  return state.pits.pitRooms;
}

const getWumpus = (state) => {
  return state.wumpus;
}

const getMaze = (state) => {
  return state.mazeData.maze;
}

const getBatRoom = (bats, player, pits, wumpus, maze) => {
  const room = bats.batRooms[Math.trunc(Math.random() * bats.batCount)];
  return `A Bat is in room ${room}`
};

const getPitRoom = (bats, player, pits, wumpus, maze) => {
  const room = pits.pitRooms[Math.trunc(Math.random() * pits.pitCount)];
  return `A Pit is in room ${room}`
};

const isWumpusClose = (bats, player, pits, wumpus, maze) => {
  const msgClose = 'The Wumpus is close';
  const msgFar = 'The Wumpus is not close';
  //create list of caves with distance one
  const caveLevelOne = maze[player.currentRoom].connections;
  if (caveLevelOne.indexOf(wumpus.currentRoom) !== -1)  {
    return msgClose;
  } else {
    let caveLevelTwo = [];
    // create list of caves with distance two
    caveLevelOne.forEach((cave) => {
      caveLevelTwo = caveLevelTwo.concat(maze[cave].connections);
    });
    if (caveLevelTwo.indexOf(wumpus.currentRoom) !== -1) {
      return msgClose;
    }
  }
  return msgFar;
};

const getWumpusRoom = (bats, player, pits, wumpus, maze) => {
  return `The Wumpus is in room ${wumpus.currentRoom}`;
};

const getPlayerRoom = (bats, player, pits, wumpus, maze) => {
  return `You are in room ${player.currentRoom}`
};

const secrets = [
  getBatRoom,
  getPitRoom,
  isWumpusClose,
  getWumpusRoom,
  getPlayerRoom
];


export const getSecret = createSelector(
  [ getBats, getPlayer, getPits, getWumpus, getMaze ],
  ( bats, player, pits, wumpus, maze ) => {
    const secretIndex = Math.trunc(Math.random() * secrets.length);
    return secrets[secretIndex](bats, player, pits, wumpus, maze);
  }
)