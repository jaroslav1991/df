import {useRef} from "react";
import {createWord} from "../../../shared/api/word";

const ModalCreateFn = ({onClose, onRefreshList}) => {
    const wordRef = useRef()
    const translateRef = useRef()

    const onCreate = async () => {
        const data = {
            word: wordRef.current.value,
            translate: translateRef.current.value
        }
        const response = await createWord(data);
        console.log(response.data)
        onRefreshList();
        onClose();
    }

    return (
        <div className="modal">
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <label>Word</label>
                <input ref={wordRef} />
                <label>Translate</label>
                <input ref={translateRef} />
                <button onClick={onCreate}>Add</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ModalCreateFn;