import React, { useState, useEffect } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";

function LocationSearchDrawer({ isOpen, onClose, onSelect }) {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [autocompleteService, setAutocompleteService] = useState(null);

    useEffect(() => {
        if (!autocompleteService && window.google?.maps?.places) {
            setAutocompleteService(new window.google.maps.places.AutocompleteService());
        }
    }, []);

    useEffect(() => {
        if (input && autocompleteService) {
            autocompleteService.getPlacePredictions(
                { input },
                (results, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        setSuggestions(results);
                    } else {
                        setSuggestions([]);
                    }
                }
            );
        } else {
            setSuggestions([]);
        }
    }, [input, autocompleteService]);

    const handleSelect = (desc) => {
        onSelect(desc);
        setInput('');
        setSuggestions([]);
        onClose();
    };

    return (
        <div className={`lsd-overlay ${isOpen ? 'lsd-overlay--active' : ''}`} onClick={onClose}>
            <div
                className={`lsd-drawer ${isOpen ? 'lsd-drawer--open' : 'lsd-drawer--closed'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky-top">
                    <div className="promo-header them-bg-black d-flex align-items-center justify-content-between">
                        <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-white" onClick={onClose} role="button" />
                        <h5 className="text-white m-auto">Search Address</h5>
                        <span></span>
                    </div>
                    <div className="lsd-header">
                        <input
                            type="text"
                            placeholder="Search location..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="lsd-input"
                        />
                    </div>
                </div>

                <ul className="lsd-suggestion-list">
                    {suggestions.map((s) => (
                        <li key={s.place_id} onClick={() => handleSelect(s.description)} className="lsd-suggestion">
                            <strong>{s.structured_formatting.main_text}</strong>
                            <div className="lsd-secondary">{s.structured_formatting.secondary_text}</div>
                        </li>
                    ))}
                </ul>

                <div className="lsd-footer">Powered by <span>Google</span></div>
            </div>
        </div>
    );
}

export default LocationSearchDrawer;
