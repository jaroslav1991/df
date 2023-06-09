import {useRef, useState} from "react";
import {createWord} from "../../../shared/api/word";
import "../styles/modal_create_word.css"

const ModalCreateFn = ({onClose, onRefreshList}) => {
    const wordRef = useRef()
    const translateRef = useRef()
    const [error, setError] = useState(null)

    const onCreate = async () => {
        const data = {
            word: wordRef.current.value,
            translate: translateRef.current.value
        }
        const response = await createWord(data);
        if (response.status === "success") {
            onRefreshList();
            onClose();
            setError(null)
            console.log(response.data)
        } else {
            setError(response.data.error)
        }
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
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
}

export default ModalCreateFn;