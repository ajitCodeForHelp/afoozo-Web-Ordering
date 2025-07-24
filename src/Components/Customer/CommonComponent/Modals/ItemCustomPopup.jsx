import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PopupModal from './PopUpModal';

const ItemCustomPopup = ({ show, onClose, data, dispatch, id, cart }) => {
    const [customOption, setCustomOption] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [error, setError] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        if (show && data?.customization) {
            setCustomOption(data.customization);
            const initSelected = {};
            data.customization.forEach(group => {
                initSelected[group.recordId] = group.customizationType === 'MultiSelection' ? [] : null;
            });
            setSelectedOptions(initSelected);
            setError('');
        }
    }, [show, data]);

    // Calculate total price
    useEffect(() => {
        let base = Number(data?.finalPrice) || 0;
        let addOns = 0;

        Object.entries(selectedOptions).forEach(([recordId, selected]) => {
            const group = customOption.find(c => c.recordId === Number(recordId));
            if (group?.customizationType === 'MultiSelection' && Array.isArray(selected)) {
                selected.forEach(id => {
                    const opt = group.customizationOptions.find(o => o.id === id);
                    addOns += opt?.price || 0;
                });
            } else if (group?.customizationType === 'SingleSelection' && selected !== null) {
                const opt = group.customizationOptions.find(o => o.id === selected);
                addOns += opt?.price || 0;
            }
        });

        setTotalPrice(base + addOns);
    }, [selectedOptions, customOption, data]);

    const handleChange = (group, optionId, isChecked) => {
        const { recordId, customizationType } = group;

        setSelectedOptions(prev => {
            const current = prev[recordId];

            if (customizationType === 'MultiSelection') {
                let updated = current || [];
                if (isChecked) {
                    if (updated.length < group.maxSelection) {
                        return { ...prev, [recordId]: [...updated, optionId] };
                    }
                    return prev;
                } else {
                    return { ...prev, [recordId]: updated.filter(id => id !== optionId) };
                }
            } else {
                return { ...prev, [recordId]: optionId };
            }
        });
    };

    const validateSelections = () => {
        for (let group of customOption) {
            const selected = selectedOptions[group.recordId];
            if (group.minSelection > 0) {
                if (group.customizationType === 'MultiSelection' && (!selected || selected.length < group.minSelection)) {
                    return `Select at least ${group.minSelection} from ${group.title}`;
                }
                if (group.customizationType === 'SingleSelection' && selected === null) {
                    return `Select 1 option for ${group.title}`;
                }
            }
        }
        return '';
    };
    const handleConfirm = () => {
        dispatch({ type: 'CLEAR_CART' });
        setModalVisible(false);
        handleAddItem();
    };

    const handleAddItem = () => {
        const validationError = validateSelections();
        if (validationError) {
            setError(validationError);
            return;
        }

        const finalCustomization = customOption.map(group => {
            const selected = selectedOptions[group.recordId];
            const selectedOpts = group.customizationOptions.filter(opt =>
                group.customizationType === 'MultiSelection'
                    ? selected.includes(opt.id)
                    : opt.id === selected
            );

            return {
                recordId: group.recordId,
                active: group.active,
                title: group.title,
                customizationType: group.customizationType,
                minSelection: group.minSelection,
                maxSelection: group.maxSelection,
                customizationOptions: selectedOpts
            };
        });

        const itemToAdd = {
            ...data,
            // uuid: data.uuid,
            customization: finalCustomization,
            restaurant: { restaurantUuid: id }
        };
        const currentRestaurant = cart.restaurant;
        if (cart.items.length > 0 && currentRestaurant?.restaurantUuid !== id) {
            setModalVisible(true);
        } else {
            dispatch({
                type: 'ADD_CUSTOMIZABLE_ITEM',
                payload: {
                    item: itemToAdd,
                    customization: finalCustomization,
                }
            });
        }

        onClose();
    };

    return (
        <>
            <div className={`popup-overlay ${show ? 'show' : ''}`} onClick={onClose} />

            <div className={`popup-box ${show ? 'show' : ''}`}>
                <div className="popup-content">
                    <h5 className="fw-bold p-3 bg-dark text-white">{data?.title}</h5>

                    <div className="overflow-auto hv-60">
                        {customOption.map(group => (
                            <div key={group.recordId} className="mb-3 px-3">
                                <div className="fw-semibold">{group.title}</div>
                                {group.customizationOptions.map(option => {
                                    const isSelected = group.customizationType === 'MultiSelection'
                                        ? selectedOptions[group.recordId]?.includes(option.id)
                                        : selectedOptions[group.recordId] === option.id;

                                    return (
                                        <div className="form-check" key={option.id}>
                                            <input
                                                className="form-check-input"
                                                type={group.customizationType === 'MultiSelection' ? 'checkbox' : 'radio'}
                                                name={`group-${group.recordId}`}
                                                id={`opt-${group.recordId}-${option.id}`}
                                                checked={isSelected}
                                                onChange={(e) =>
                                                    handleChange(group, option.id, e.target.checked)
                                                }
                                            />
                                            <label className="form-check-label" htmlFor={`opt-${group.recordId}-${option.id}`}>
                                                {option.name} ( ₹{option.price.toFixed(2)} )
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {error && <div className="text-danger text-center">{error}</div>}

                    <div className="bottom-bar d-flex justify-content-between align-items-center p-3 border-top">
                        <div className="fw-bold">Item Total ₹{totalPrice.toFixed(2)}</div>
                        <button className="btn btn-warning" onClick={handleAddItem}>Add Item</button>
                    </div>
                </div>
            </div>
            <PopupModal
                show={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleConfirm}
                title="Confirm Action"
                message={"You already have items from another restaurant. Clear the cart and add this item?"}
                confirmText="Yes"
                cancelText="Cancel"
                type="confirm" // or "message"
            />
        </>
    );
};

export default ItemCustomPopup;
