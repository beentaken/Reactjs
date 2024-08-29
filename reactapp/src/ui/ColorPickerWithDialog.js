import React, { useState } from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Box,
} from '@mui/material';

const colorOptions = [
    '#ff0000', // Red
    '#00ff00', // Green
    '#0000ff', // Blue
    '#ffff00', // Yellow
    '#ff00ff', // Magenta
    '#00ffff', // Cyan
];

function ColorPickerWithDialog() {
    const [color, setColor] = useState('#0000ff');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleColorSelect = (selectedColor) => {
        setColor(selectedColor);
        handleClose();
    };

    return (
        <>
            <TextField
                // value={color} //
                onClick={handleOpen}
                variant="outlined"
                InputProps={{
                    readOnly: true,
                    style: { backgroundColor: color },
                }}
            />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Select a Color</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {colorOptions.map((option) => (
                            <Grid item xs={4} key={option}>
                                <Box
                                    onClick={() => handleColorSelect(option)}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        backgroundColor: option,
                                        cursor: 'pointer',
                                        borderRadius: '50%',
                                        border: '2px solid #000',
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ColorPickerWithDialog;
