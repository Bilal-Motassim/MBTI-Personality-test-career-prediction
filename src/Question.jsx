import * as React from 'react';
import Box from '@mui/material/Box';
import { Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

export default function Question(props) {
    const [checkedValue, setCheckedValue] = React.useState(null);

    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }));
    const handleRadioChange = (event) => {
        setCheckedValue(event.target.value);
        //console.log(event.target.value);
        props.handleRadio(event);
    };

    React.useEffect(() => {

        setCheckedValue(null);

    }, [props.page]);

    return (
        <Box component="section" sx={{ p: 2, border: '1px solid grey', marginTop:4, marginBottom:4 }}>
            <Div>{props.quest}</Div>
            <FormControl>
                <RadioGroup
                    column
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue="top"
                    onChange={handleRadioChange}
                    value={checkedValue}
                >
                    <FormControlLabel
                        value="A"
                        control={<Radio />}
                        label={props.A}
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="B"
                        control={<Radio />}
                        label={props.B}
                        labelPlacement="end"
                    />

                </RadioGroup>
            </FormControl>
        </Box>
    );
}