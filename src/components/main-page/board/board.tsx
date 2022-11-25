import BoardHeader from './board-header';
import styles from './board.module.css';

function Board() {
  return (
    <main className={styles.main}>
      <BoardHeader />
      <ul>
        <li>list1</li>
        <li>list2</li>
        <li>list3</li>
      </ul>
    </main>
  );
}

export default Board;
