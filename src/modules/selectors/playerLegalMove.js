import { createSelector } from 'reselect';
import boardData from '../../components/Board2/board.json';

const getMaze = (state) => {
  return state.mazeData.maze;
}

const getBoardRooms = () => {
  return boardData.rooms;
}

const getPlayerCurrentRoom = (state) => {
  return state.player.currentRoom;
}

const getGameOverState = (state) => {
  return state.globalState.gameOver;
}

export const playerLegalMoves = createSelector(
  [ getPlayerCurrentRoom, getMaze, getBoardRooms, getGameOverState ],
  (playerRoom, maze, board, isGameOver) => {
    if (isGameOver) {
      return [];
    }
    if (playerRoom === '') {
      // return array of all rooms
      const all = [];
      for (let i = 1; i <= maze.length; i++) {
        all.push(i);
      }
      return all;
    } else {
      const connections = maze[playerRoom - 1].connections;
      return connections.map(roomIndex => roomIndex + 1);
    }
  }
)
