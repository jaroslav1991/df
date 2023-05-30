import ModalChooseTraining from "./ModalChooseTraining";
import {useState} from "react";


const ModalTrainingFn = ({onClose, setListWords, setWords, onForm}) => {
    const [openForm, setOpenForm] = useState(null)

    const clickWord = () => {
        setOpenForm("openWordTraining");
    }

    return (
        <div className="modal">
            <div className="modal_content">
                <button className="btn_training" onClick={clickWord}>Training with words</button>
                <button className="btn_training">Training with translate</button>
                <button className="btn_training" onClick={onClose}>Close</button>
                {openForm === "openWordTraining" &&
                    <ModalChooseTraining onClick={onClose} onClose2={() => setOpenForm(null)} setWords={setWords}
                                         setList={setListWords} onTest={onForm}/>}

            </div>
        </div>
    );
}

export default ModalTrainingFn;