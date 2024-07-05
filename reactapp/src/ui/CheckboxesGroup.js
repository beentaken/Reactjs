import React from "react";
import {
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Checkbox,
} from '@mui/material';

import { styled } from '@mui/material/styles';

const useStyles = styled((theme) => ({
    root: {
        display: "flex",
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));
 const CheckboxesGroup = ( props) => {

    const classes = useStyles();
    const biooptions = props.biooptions;
    const [stateo, setStateo] = React.useState(
        biooptions.reduce((acc, option) => {
            acc[option.name] = option.bool;
            return acc;
        }, {})
    );

    //const handleoChange = (event) => {
    //    setStateo({ ...stateo, [event.target.name]: event.target.checked });
    //};

    const handleoChange = (event) => {
        setStateo((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.checked,
        }));
    };


    const pickedCount = Object.values(stateo).filter((v) => v).length;
    const oerror = pickedCount !== 2;

    return (
        <div className={classes.root}>
            <FormControl
                required
                error={oerror}
                component="fieldset"
                className={classes.formControl}
            >
                <FormLabel component="legend">Pick two</FormLabel>
                <FormGroup style={{ flexDirection: "row" }}>
                    {biooptions.map((option, index) => (
                        <FormControlLabel
                            key={option.id}
                            control={
                                <Checkbox
                                    checked={stateo[option.name]}
                                    onChange={handleoChange}
                                    name={option.name}
                                />
                            }
                            label={
                                <span style={{ display: "flex", alignItems: "center" }}>
                                    {option.name}
                                    {option.icon && <option.icon />}
                                </span>
                            }
                        />
                    ))}
                </FormGroup>
                <FormHelperText>
                    {oerror
                        ? "You must pick exactly two options."
                        : `Picked ${pickedCount} out of 2 options.`}
                </FormHelperText>
            </FormControl>
        </div>
    );
}
export default CheckboxesGroup;
