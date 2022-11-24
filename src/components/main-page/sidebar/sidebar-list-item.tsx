import styles from './sidebar.module.css';

interface SidebarListItemProps {
  idx: number;
  id: string;
  title: string;
  handleClick: Function;
  isSelected: boolean;
}

function SidebarListItem(props: SidebarListItemProps) {
  const { idx, id, title, handleClick, isSelected } = props;

  return (
    <li className={isSelected ? styles.selected : ''} onClick={() => handleClick(idx)} data-boardid={id}>
      {title}
    </li>
  );
}

export default SidebarListItem;
