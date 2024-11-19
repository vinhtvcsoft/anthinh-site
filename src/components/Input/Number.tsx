import React, {
    memo,
    useState,
    forwardRef,
} from "react";
import {
    TextField,
} from "@mui/material/";
import { UseFormRegister } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

type INumber = NumericFormatProps &
    ReturnType<UseFormRegister<any>> & {
        label?: string;
        error?: boolean;
        helperText?: string;
        inputRef?: React.Ref<any>;
        fullWidth?: boolean;
        unitText?: string | React.ReactNode;
    };


const Number = forwardRef<HTMLInputElement, INumber>(
    function Input(
        {
            defaultValue = null,
            label = "",
            name = "",
            onChange,
            fullWidth = true,
            required = false,
            autoFocus,
            inputRef,
            unitText,
            ...props
        }
    ) {
        const [value, setValue] = useState(defaultValue);

        const handleChange = (values: any, params: any) => {
            if (params.source.toString() === "prop") return;
            onChange({
                target: {
                    name,
                    value: values.floatValue ?? 0,
                },
            } as any);
            setValue(values.floatValue);
        };

        return (
            <NumericFormat
                getInputRef={inputRef}
                // variant="standard"
                required={required}
                autoFocus={autoFocus}
                fullWidth={fullWidth}
                label={label}
                defaultValue={defaultValue}
                value={value}
                error={props.error}
                helperText={props.helperText}
                onValueChange={handleChange}
                thousandSeparator={','}
                decimalSeparator={'.'}
                decimalScale={0}
                customInput={TextField}
                slotProps={{
                    input: {
                        endAdornment: unitText
                    }
                }}
            />
        );
    }
);

export default memo(Number);
