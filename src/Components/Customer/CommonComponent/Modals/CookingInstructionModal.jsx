import React, { useEffect, useState } from 'react';

const CookingInstructionModal = ({ show, onClose, onAdd, instruction, setInstruction }) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (show) setVisible(true);
    }, [show]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => onClose(), 300); // Match the CSS transition duration
    };

    if (!show) return null;

    return (
        <div className={`cooking-popup-overlay ${visible ? '' : 'hidden'}`} onClick={handleClose}>
            <div className={`cooking-popup-box text-center ${visible ? '' : 'hidden'}`} onClick={(e) => e.stopPropagation()}>
                <div className="cooking-popup-header them-bg-black text-white">Cooking Instruction</div>

                <input
                    type="text"
                    className="form-control cooking-popup-input"
                    placeholder="Cooking Instruction"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                />

                <div className="d-flex justify-content-center">
                    <button className="cooking-popup-add-btn them-bg-black text-white w-auto" onClick={() => onAdd(instruction)}>
                        ADD
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CookingInstructionModal;