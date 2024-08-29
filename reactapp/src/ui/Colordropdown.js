import React, { useState } from 'react';

const ColorDropdown = () => {
    // Define the color array with their respective hex values
    const colors = [
        '#FF0000', // Red
        '#00FF00', // Green
        '#0000FF', // Blue
        '#FFFF00', // Yellow
        '#800080', // Purple
    ];

    // State to manage the selected color
    const [selectedColor, setSelectedColor] = useState('');

    // Handle color selection
    const handleColorSelect = (event) => {
        setSelectedColor(event.target.value);
    };

    return (
        <div>
            {/* Dropdown menu displaying only color swatches */}
            <select
                value={selectedColor}
                onChange={handleColorSelect}
                style={{
                    width: '60px',
                    height: '40px',
                    backgroundColor: selectedColor,
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    padding: '0',
                }}
            >
                <option value="" disabled>Select a color</option>
                {colors.map((color, index) => (
                    <option
                        key={index}
                        value={color}
                        style={{
                            backgroundColor: color,
                            color: color, // Hide text by setting the text color same as background
                        }}
                    >
                        &#x25A0; {/* Unicode for a square, to indicate the color */}
                    </option>
                ))}
            </select>

            {/* Display the selected color's hex value */}
            {selectedColor && (
                <div style={{ marginTop: '20px', fontSize: '18px' }}>
                    Selected Color: <span style={{ color: selectedColor }}>{selectedColor}</span>
                </div>
            )}
        </div>
    );
};

export default ColorDropdown;
