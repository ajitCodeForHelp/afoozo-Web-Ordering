import React from 'react';

const CookingInstruction = ({ value, onChange }) => {
  return (
    <div className="instruction-wrapper p-3 mb-4 shadow-sm checkout-card rounded">
      <input
        type="text"
        className="form-control instruction-input"
        placeholder="Cooking Instruction"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CookingInstruction;
