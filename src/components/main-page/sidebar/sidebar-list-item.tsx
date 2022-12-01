import { Draggable } from 'react-beautiful-dnd';

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
    <Draggable key={id} draggableId={id} index={idx}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={isSelected ? styles.selected : ''}
          onClick={() => handleClick(idx)}
          data-boardid={id}
        >
          {title}
        </li>
      )}
    </Draggable>
  );
}

export default SidebarListItem;
