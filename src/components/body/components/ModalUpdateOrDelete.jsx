import {useEffect, useRef} from "react";
import {deleteWord, updateWord} from "../../../shared/api/api";

const ModalUpdateOrDelete = ({word, onClose, onRefreshList}) => {
  const wordRef = useRef();
  const translateRef = useRef();

  const onUpdate = async () => {
    const data = {
      id: word.id,
      word: wordRef.current.value,
      translate: translateRef.current.value
    }
    console.log('data', data)
    const response = await updateWord(data)
    onRefreshList();
    onClose();
  }

  const onDelete = async () => {
    const response = await deleteWord(word.id)
    onRefreshList();
    onClose();
  }

  useEffect(() => {
    wordRef.current.value = word.word;
    translateRef.current.value = word.translate
  }, [word])

  return (
    <div className="modal">
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <input ref={wordRef} />
        <input ref={translateRef} />
        <button onClick={onUpdate}>Update</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ModalUpdateOrDelete;
