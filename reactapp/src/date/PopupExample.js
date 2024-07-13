import React, { useState } from "react";
import "./Tooltip.css"; // Add styles for the tooltip

const PopupExample = () => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const handleTextboxClick = () => {
        setTooltipVisible(!isTooltipVisible);
    };

    return (
        <div>
            <input
                type="text"
                onClick={handleTextboxClick}
                placeholder="Click me for tooltip"
            />
            {isTooltipVisible && (
                <div className="tooltip">
                    {/* Tooltip content goes here */}
                    This is a tooltip!
                </div>
            )}
        </div>
    );
};

export default PopupExample;
