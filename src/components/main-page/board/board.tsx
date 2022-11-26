import BoardHeader from './board-header';
import styles from './board.module.css';
import Lists from './lists';

function Board() {
  return (
    <main className={styles.main}>
      <BoardHeader />
      <Lists />
    </main>
  );
}

export default Board;
