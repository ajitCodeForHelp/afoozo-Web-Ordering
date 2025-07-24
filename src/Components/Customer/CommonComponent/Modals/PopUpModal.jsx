import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal as BootstrapModal } from 'bootstrap';

const PopupModal = ({ show, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "confirm" }) => {
    const modalRef = useRef(null);
    const bsModalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current && !bsModalRef.current) {
            bsModalRef.current = new BootstrapModal(modalRef.current, {
                backdrop: 'static',
                keyboard: true,
            });

            modalRef.current.addEventListener('hidden.bs.modal', () => {
                onClose?.();
            });
        }

        if (bsModalRef.current) {
            show ? bsModalRef.current.show() : bsModalRef.current.hide();
        }
    }, [show]);

    return (
        <div className="modal fade" tabIndex="-1" ref={modalRef}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-5">
                    {title && <div className="modal-header bg-dark text-white text-center justify-content-center rounded-top-5 rounded-bottom-0">
                        <h5 className="modal-title bg-dark text-white text-center">Afoozo</h5>
                    </div>}
                    <div className="modal-body pb-0">
                        {/* <button type="button" className="btn-close" onClick={onClose}></button> */}
                        <p className='text-center fw-semibold'>{message}</p>
                    </div>
                    <div className="modal-footer border-0 d-flex justify-content-center align-items-center">
                        {type === 'confirm' && (
                            <>
                                <button type="button" className="btn btn-secondary bg-white text-dark" onClick={onClose}>
                                    {cancelText}
                                </button>
                                <button type="button" className="btn btn-primary bg-dark text-white border-0" onClick={onConfirm}>
                                    {confirmText}
                                </button>
                            </>
                        )}
                        {type === 'message' && (
                            <button type="button" className="btn btn-primary bg-dark text-white border-0" onClick={onClose}>
                                OK
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupModal;