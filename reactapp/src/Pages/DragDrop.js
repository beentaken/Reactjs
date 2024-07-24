import React, { useState } from 'react';
import '../css/DragDrop.css';

const DragDrop = () => {
    const [boxes, setBoxes] = useState([]);

    const handleRightClick = (event) => {
        event.preventDefault();
        const newBox = {
            id: Date.now(),
            x: event.clientX,
            y: event.clientY,
            offsetX: 0,
            offsetY: 0,
        };
        setBoxes([...boxes, newBox]);
    };

    const deleteBox = (id) => {
        setBoxes(boxes.filter(box => box.id !== id));
    };

    const handleDragStart = (event, id) => {
        const box = boxes.find(box => box.id === id);
        box.offsetX = event.clientX - box.x;
        box.offsetY = event.clientY - box.y;
    };

    const handleDrag = (event, id) => {
        const box = boxes.find(box => box.id === id);
        if (box && event.clientX && event.clientY) {
            box.x = event.clientX - box.offsetX;
            box.y = event.clientY - box.offsetY;
            setBoxes([...boxes]);
        }
    };

    return (
        <div className="background" onContextMenu={handleRightClick}>
            {boxes.map(box => (
                <div
                    key={box.id}
                    className="box"
                    style={{ left: box.x, top: box.y }}
                    draggable
                    onDragStart={(event) => handleDragStart(event, box.id)}
                    onDrag={(event) => handleDrag(event, box.id)}
                >
                    <button className="delete-button" onClick={() => deleteBox(box.id)}>X</button>
                </div>
            ))}
        </div>
    );
};

export default DragDrop;
