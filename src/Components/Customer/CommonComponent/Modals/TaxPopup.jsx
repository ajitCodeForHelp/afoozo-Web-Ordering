import React, { useEffect, useRef } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';

function TaxPopup({ show, onClose, taxJson }) {
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
        <>
            <div className="modal fade" tabIndex="-1" ref={modalRef}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-5">
                        {<div className="modal-header bg-dark text-warning text-center justify-content-center rounded-top-5 rounded-bottom-0">
                            <h5 className="modal-title bg-dark text-warning text-center">Taxes</h5>
                        </div>}
                        <div className="modal-body pb-0">
                            {taxJson?.map((itm) => {
                                return (
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className='m-0 text-muted'>{itm.key}</p>
                                        <p className='m-0 text-muted'>₹{itm.value}</p>
                                    </div>
                                )
                            })}

                        </div>
                        <div className="modal-footer border-0 d-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-primary bg-dark text-warning border-0" onClick={onClose}>
                                Closed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaxPopup;
