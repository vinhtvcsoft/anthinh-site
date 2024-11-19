import React, {
    memo,
    useEffect,
    useState,
    forwardRef,
    useRef,
    useCallback,
} from "react";
import {
    TextField,
    Autocomplete as MuiAutocomplete,
    AutocompleteProps,
    Radio,
    Dialog,
    Box,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Button,
} from "@mui/material/";
import { Add, Close } from '@mui/icons-material';
import { debounce, } from "utils";
import { defaultStyles } from 'theme'
import { UseFormRegister } from 'react-hook-form';

type IAutocomplete = Omit<
    AutocompleteProps<any, false, boolean, any>,
    "options" | "renderInput"
> &
    ReturnType<UseFormRegister<any>> & {
        label?: string;
        idField?: string;
        textField?: string;
        error?: boolean;
        helperText?: string;
        store: {
            data?: any[];
            params?: any;
            fnGetData?: (params: any, onSuccess?: any) => void;
            mode?: "local" | "remote";
        };
        inputRef?: React.Ref<any>;
        forceSelection?: boolean;
        allowAddOption?: boolean;
        textAddTitle?: string;
    };


const Autocomplete = forwardRef<HTMLInputElement, IAutocomplete>(
    function Input(
        {
            defaultValue = null,
            label = "",
            // addPopup,
            name = "",
            idField = "id",
            textField = "text",
            store,
            onChange,
            // onBlur,
            // onFocus,
            // logKey = "",
            required = false,
            autoFocus,
            // forceSelection = false,
            // onInitDefaultRecord,
            // reducerSyncStore,
            allowAddOption = false,
            textAddTitle = '',
            ...props
        },
        ref
    ) {
        const { mode } = store;
        const [openDialog, setOpenDialog] = useState(false);
        const inputRef = useRef<HTMLInputElement>();

        // const listboxRef = useRef<HTMLInputElement>();

        const defaultRef = useRef<any>({
            reason: "",
            timeoutRef: "",
            totalCount: 0,
        }).current;
        const [open, setOpen] = useState(false);
        const [options, setOptions] = useState<any[]>([]);
        const [page, setPage] = useState(0);
        const pageSize = 7;

        const [ipValue, setIpValue] = useState<any>(null);
        const preForceValue = useRef<any>(null);

        const [highlightedOption, setHighlightedOption] = useState<any>(null);


        // const [loading, setLoading] = useState(false);
        // const [autoHighlight, setAutoHighlight] = useState(false);

        // const [err, setErr] = useState({
        //   error: false,
        //   helperText: "",
        // });

        const handleChange: AutocompleteProps<
            any,
            true,
            undefined,
            undefined
        >["onChange"] = (_e, v: any, _details) => {
            if (v === null) {
                setIpValue(v);
                // setAutoHighlight(false);
            } else {
                setIpValue(v);
                preForceValue.current = v;

            }
            onChange({
                target: {
                    name,
                    value: v ? v[idField] : null,
                    rec: v,
                },
            } as any);
        };



        const handleInputChange = (e: any) => {
            const { value } = e.target;
            if (!value) {
                setIpValue(null);
            }
            const { fnGetData, params } = store;
            if (fnGetData) {
                // setLoading(true);
                let filter: any = [];
                if (params && params.filter) filter = [...params.filter];
                if (value) filter.push({ property: textField, value, method: "like" });

                fnGetData(
                    { ...params, filter, page: 0, pageSize },
                    (result: any) => {
                        // setLoading(false);
                        if (result.data) {
                            const { data, total } = result.data;
                            if (data && Array.isArray(data)) setOptions(data);
                            defaultRef.totalCount = total;
                        }
                    }
                );
                setPage(0);
            }
        };
        const debouncedHandleInputChange = debounce(handleInputChange, 700);

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "ArrowDown") setOpen((s) => !s || true);
                // if (e.key === "Tab") {
                //     if (listboxRef) {
                //         const ele = listboxRef.current?.querySelector("li.Mui-focused");
                //         if (ele) {
                //             const v = options.find((f) => f[textField] === ele.textContent);
                //             if (v) {
                //                 setIpValue(v);
                //                 onChange({
                //                     target: {
                //                         name,
                //                         value: v ? v[idField] : null,
                //                         rec: v,
                //                     },
                //                 } as any);
                //                 preForceValue.current = v;
                //             }
                //         }
                //     }
                // }
            },
            [options, idField, textField]
        );

        const handleToggleDropDown = useCallback(
            (v?: boolean) => () => {
                setOpen((isO) => v ?? !isO);
            },
            []
        );

        useEffect(() => {
            if (mode === undefined || mode === "remote") {
                const { fnGetData, params } = store;
                if (fnGetData) {
                    if (defaultValue) {
                        // const searchString = 
                        //     defaultValue ? defaultValue : null;
                        let filter: any = [];
                        if (params && params.filter) filter = [...params.filter];
                        // if (searchString) {
                        //     if (isValidUUID(searchString)) filter.push({ property: idField, value: searchString, method: "eq" });
                        //     else filter.push({ property: textField, value: searchString, method: "like" });
                        // }
                        // setLoading(true);
                        fnGetData({ ...params, filter, page, pageSize }, (result: any) => {
                            // setLoading(false);
                            if (result.data) {
                                const { data, total } = result.data;
                                if (data && Array.isArray(data)) setOptions(data);
                                defaultRef.totalCount = total;
                                const item = data.filter((i: any) => i[idField] === defaultValue);
                                if (item.length > 0) {
                                    setIpValue(item[0]);
                                    preForceValue.current = item[0];

                                } else setIpValue(null);
                            }
                        });
                    } else {
                        // setLoading(true);
                        fnGetData({ ...params, page, pageSize }, (result: any) => {
                            // setLoading(false);
                            if (result.data) {
                                const { data, total } = result.data;
                                if (data && Array.isArray(data)) setOptions(data);
                                defaultRef.totalCount = total;
                            }
                        });
                        setIpValue(null);
                    }
                }
            } else {
                if (store.data) {
                    !allowAddOption ? setOptions(store.data) : setOptions([...store.data, { [idField]: 'add', [textField]: 'Thêm' }]);
                    if (defaultValue) {
                        const v = store.data.find((d) => d[idField] === defaultValue);
                        if (v) {
                            setIpValue(v);
                            preForceValue.current = v;
                        }
                    } else {
                        setIpValue(null);
                    }
                }
            }
        }, [defaultValue]);

        //Change Store fixed
        useEffect(() => {
            if (store.mode === "local" && Array.isArray(store.data)) {
                !allowAddOption ? setOptions(store.data) : setOptions([...store.data, { [idField]: 'add', [textField]: 'Thêm' }]);
                // setIpValue(ipValue);
            }
        }, [JSON.stringify(store)]);

        useEffect(() => {
            if (options.length > 0 && defaultValue && options.find((option) => option[idField] === defaultValue)) {
                const v = options.find((d) => d[idField] === defaultValue);
                if (v) {
                    setIpValue(v);
                } else {
                    setIpValue(null);
                }
            }
        }, [options, idField]);

        return (
            <React.Fragment>
                <MuiAutocomplete
                    ref={ref}
                    name={name}
                    {...(props as any)}
                    open={open}
                    defaultValue={defaultValue === "" ? null : defaultValue}
                    value={ipValue}
                    onChange={handleChange}
                    fullWidth
                    options={options}
                    autoFocus={autoFocus}
                    freeSolo
                    clearOnBlur
                    getOptionLabel={(option: any) => {
                        if (typeof option === "string") {
                            return option;
                        }
                        if (option["inputValue"]) {
                            return `${option[textField]}`;
                        }
                        if (typeof option === "object") {
                            return option ? option[textField] : "";
                        }
                        return "";
                    }}
                    onHighlightChange={(e, option: any) => {
                        setHighlightedOption(option);
                    }}
                    onKeyDown={handleKeyDown}
                    onClose={handleToggleDropDown(false)}
                    onOpen={handleToggleDropDown(true)}

                    renderOption={(props, option: any) => {
                        props.key = option[idField];
                        return option[idField] === 'add' ? (
                            <li  {...props} onClick={() => {
                                setOpenDialog(true);
                            }} >
                                <Add />
                                <span style={{ flex: 1, }}>{option[textField]}</span>
                            </li>
                        )
                            :
                            (
                                <li {...props} >

                                    <span style={{ flex: 1, }}>{option[textField]}</span>
                                    <Radio
                                        checked={highlightedOption ? option[idField] === highlightedOption[idField] : false}
                                        sx={{
                                            p: 0,
                                            '&.Mui-checked': {
                                                color: highlightedOption === option ? '#C80001' : 'inherit',
                                            },
                                        }} ></Radio>
                                </li>

                            )
                    }}
                    renderInput={(params: any) => (
                        <TextField
                            {...params}
                            label={label}
                            required={required}
                            onChange={(e) => {
                                debouncedHandleInputChange(e);
                            }}
                        />
                    )}
                />
                {openDialog && (
                    <Dialog
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        PaperProps={{
                            sx: {
                                width: '4450px',
                                overflow: 'hidden !important',
                                borderRadius: '16px',
                            }
                        }}
                    >
                        <Box display={'flex'} width={'100%'} bgcolor={'#1C1F22'}>
                            <DialogTitle
                                sx={{
                                    color: '#FFF',
                                    flex: 1
                                }}
                            >
                                {textAddTitle}
                            </DialogTitle>
                            <Box sx={{ ml: 'auto', mr: 2, alignContent: 'center' }}>
                                <Close sx={{ color: '#FFF' }} onClick={() => setOpenDialog(false)} />
                            </Box>
                        </Box>
                        <DialogContent sx={{ p: 2 }}>
                            <FormControlLabel
                                labelPlacement="top"
                                sx={{ width: 1, m: 0, alignItems: 'flex-start', '& span': { mb: '8px', fontWeight: 700 } }}
                                label={label}
                                control={
                                    <TextField
                                        inputRef={inputRef}
                                        fullWidth
                                    />}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                sx={{ ...defaultStyles.btnPrimary, width: '100px' }}
                                onClick={() => {
                                    const temp = options.filter((o) => o[idField] !== 'add');
                                    const newItem = {
                                        [idField]: inputRef.current?.value,
                                        [textField]: inputRef.current?.value,
                                    };
                                    temp.push(newItem);

                                    setOptions(temp);
                                    setIpValue(newItem);
                                    setOpenDialog(false);
                                }}
                            >Thêm </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </React.Fragment>
        );
    }
);

export default memo(Autocomplete);
