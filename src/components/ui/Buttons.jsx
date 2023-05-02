import {useEffect, useState} from "react";

const Modal = ({selectedWord}) => {
    const [input, setInput] = useState([])

    useEffect(() => {
        setInput(selectedWord)
    }, [selectedWord])

    console.log("input =" + input.word)
    return (
        <div className="modal">
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <input defaultValue={input.word}/>
                <input defaultValue={input.translate}/>
                <button>Update</button>
                <button>Delete</button>
            </div>
        </div>
    );
}

export default Modal;