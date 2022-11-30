import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { updateTaskDescriptionAPI } from '../../../features/board/boardAPI';
import { TaskDTO } from '../../../types/task';
import styles from './task-edit-description.module.css';

interface TaskEditDescriptionProps {
  listId: string;
  taskId: string;
  description: string;
}

function TaskEditDescription({ listId, taskId, description }: TaskEditDescriptionProps) {
  if (description === null) {
    description = '';
  }
  const dispatch = useAppDispatch();
  const [descInput, setDescInput] = useState<string>(description);
  const [showSaveBtn, setSaveBtn] = useState<boolean>(false);

  function handleChangeDescInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!showSaveBtn) {
      setSaveBtn(true);
    }
    setDescInput(e.target.value);
  }

  async function handleDescSave() {
    try {
      const data: TaskDTO = await updateTaskDescriptionAPI(listId, taskId, descInput);
      dispatch({
        type: 'board/updateTaskDesc',
        payload: { listId: data.listId, id: data.id, description: data.description },
      });
    } catch (e: any) {
      alert(e.toString());
    } finally {
      setSaveBtn(false);
    }
  }

  function handleDescCancel() {
    setDescInput(description);
    setSaveBtn(false);
  }

  return (
    <div className={styles.container}>
      <h4>Description</h4>
      <textarea
        className={styles.textinput}
        placeholder="Add a more detailed description..."
        value={descInput}
        onChange={handleChangeDescInput}
        spellCheck="false"
      />
      {showSaveBtn && (
        <div className={styles.btns}>
          <button className={styles.btns_save} onClick={handleDescSave}>
            Save
          </button>
          <button className={styles.btns_cancel} onClick={handleDescCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskEditDescription;
