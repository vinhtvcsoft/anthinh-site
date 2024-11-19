import React, {
    memo,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    Autocomplete as MuiAutocomplete,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid2,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { debounce, isNullOrEmpty } from "utils";
import { ILocationItem, IHouseItem } from "types";
import { Apartment, Close } from "@mui/icons-material";
import {
    UseFormReturn,
    useWatch
} from "react-hook-form"; 'react-hook-form';
import { Autocomplete } from 'components';
import { useLocation } from 'hooks';
import { defaultStyles } from 'theme';

interface IAddressDialogProps {
    open: boolean;
    form: UseFormReturn<IHouseItem>;
    handleOk: () => void;
}

const AddressDialog: React.FC<IAddressDialogProps> = ({ open, form, handleOk }) => {
    const {
        locations,
        districts,
        wards,
        streets,
        projects,
        getLocation,
        getDistrict,
        getWard,
        getStreet,
        getProject,
    } = useLocation();

    const { getValues, setValue, register } = form;
    const addressRef = useRef({
        districtId: getValues('districtId'),
        wardId: getValues('wardId'),
        streetId: getValues('streetId'),
        projectId: getValues('projectId'),
    }).current;

    const [active, setActive] = useState(!Object.keys(addressRef).find((f) => !isNullOrEmpty(addressRef[f as keyof typeof addressRef])) ? 0 : 1);

    const wardId = useWatch({ control: form.control, name: 'wardId' });
    const projectId = useWatch({ control: form.control, name: 'projectId' });
    const address = useWatch({ control: form.control, name: 'address' });
    useWatch({ control: form.control, name: 'districtId' });
    useWatch({ control: form.control, name: 'streetId' });

    const handleSuggestChange = (keyword: string) => {
        if (keyword && keyword !== '') {
            getLocation({ keyword });
        }
    };

    const debouncedHandleSuggestChange = debounce(handleSuggestChange, 700);

    useEffect(() => {
        getDistrict({ cityId: 'SG' });
    }, []);

    return (
        <Dialog
            open={open}
            disableEscapeKeyDown

            onClose={(event, reason) => {
                if (reason === 'backdropClick') {
                    return;
                }
            }}
            PaperProps={{
                sx: {
                    width: '660px',
                    height: '100vh',
                    overflowX: 'hidden !important',
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
                    Xác nhận địa chỉ
                </DialogTitle>
                <Box sx={{ ml: 'auto', mr: 2, alignContent: 'center' }}>
                    <Close sx={{ color: '#FFF' }} onClick={() => {
                        setValue('districtId', addressRef.districtId);
                        setValue('wardId', addressRef.wardId);
                        setValue('streetId', addressRef.streetId);
                        setValue('projectId', addressRef.projectId);
                        handleOk();
                    }} />
                </Box>
            </Box>

            <DialogContent sx={{ p: 0 }}>
                {active === 0 && (
                    <Box justifyItems={'center'} p={4}>
                        <MuiAutocomplete
                            fullWidth
                            options={locations}
                            autoHighlight
                            freeSolo
                            clearOnBlur
                            getOptionLabel={(option: string | ILocationItem) => typeof option === 'string' ? option : option.locationname}
                            renderOption={(props: object, option: ILocationItem) => {
                                const { locationId, locationname } = option;
                                return (
                                    <Stack
                                        key={locationId}
                                        direction={'row'}
                                        p={1}
                                        columnGap={1}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#F2F2F2',
                                            }
                                        }}
                                        onClick={() => {
                                            const { districtId, wardId, streetId, projectId } = option;
                                            setValue('districtId', districtId);
                                            setValue('wardId', wardId);
                                            setValue('streetId', streetId);
                                            setValue('projectId', projectId);

                                            getWard({ districtId });
                                            wardId && getStreet({ wardId: wardId.toString() });

                                            wardId && getProject({ districtId, wardId });

                                            const projectname = option.project?.projectname;
                                            const streetname = option.street?.streetname;
                                            const wardname = option.ward?.wardname;
                                            const districtname = option.district?.districtname;

                                            const address = `${projectname}, ${streetname}, ${wardname}, ${districtname}`;
                                            setValue('projectName', projectname);
                                            setValue('address', address);
                                            setActive(1);
                                        }}
                                    >
                                        <Apartment></Apartment>
                                        <Typography>{locationname}</Typography>
                                    </Stack>
                                )
                            }}
                            renderInput={(params: any) => (
                                <TextField
                                    {...params}
                                    placeholder={'Nhập tên dự án hoặc tên quận/huyện, phường/xã để tìm kiếm'}
                                    onChange={(event) => {
                                        debouncedHandleSuggestChange(event.target.value);
                                    }}
                                />
                            )}
                        />
                        <Typography sx={{ my: 3 }} >Hoặc</Typography>
                        <Button
                            sx={{
                                ...defaultStyles.btn,
                                fontSize: '16px',
                                fontWeight: 700,
                                height: '65px',
                                width: '200px'
                            }}
                            onClick={() => {
                                setActive(1);
                            }}
                        >
                            Chọn địa chỉ
                        </Button>
                    </Box>
                )}
                {active === 1 && (
                    <Box display="flex" flexDirection="column" height="100%">
                        <Grid2 container spacing={2} p={4}>
                            <Grid2 size={12}>
                                <Autocomplete
                                    fullWidth
                                    label={'Chọn Quận / Huyện'}
                                    defaultValue={getValues('districtId')}
                                    store={{
                                        mode: 'local',
                                        data: districts,
                                    }}
                                    idField="districtId"
                                    textField="districtname"
                                    {...register('districtId', {
                                        onChange: (e) => {
                                            const districtId = e.target.value;
                                            if (districtId) {
                                                getWard({ districtId });
                                                getProject({ districtId });
                                            }

                                            setValue('wardId', undefined);
                                            setValue('streetId', undefined);
                                            setValue('projectId', undefined);
                                            setValue('address', '');
                                        }
                                    })}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <Autocomplete
                                    fullWidth
                                    label={'Chọn Phường / Xã'}
                                    defaultValue={getValues('wardId')}
                                    disabled={!isNullOrEmpty(projectId)}
                                    store={{
                                        mode: 'local',
                                        data: wards,
                                    }}
                                    idField="wardId"
                                    textField="wardname"
                                    {...register('wardId',
                                        {
                                            onChange: (e) => {
                                                setValue('streetId', undefined);
                                                setValue('projectId', undefined);
                                                if (e.target.rec) {
                                                    const { wardId, districtId } = e.target.rec;
                                                    if (wardId) {
                                                        getStreet({ wardId: wardId.toString() });
                                                        getProject({ districtId, wardId });
                                                    }

                                                }
                                            }
                                        }
                                    )}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <Autocomplete
                                    fullWidth
                                    label={'Chọn Đường / Phố'}
                                    defaultValue={getValues('streetId')}
                                    store={{
                                        mode: 'local',
                                        data: streets,
                                    }}
                                    idField="streetId"
                                    textField="streetname"
                                    disabled={!isNullOrEmpty(projectId)}
                                    {...register('streetId')}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <Autocomplete
                                    fullWidth
                                    label={'Chọn Dự án'}
                                    defaultValue={getValues('projectId')}
                                    store={{
                                        mode: 'local',
                                        data: projects,
                                    }}
                                    idField="projectId"
                                    textField="projectname"
                                    disabled={isNullOrEmpty(wardId)}
                                    {...register('projectId', {
                                        onChange: (e) => {
                                            const rec = e.target.rec;

                                            if (rec) {
                                                const projectname = rec.projectname;
                                                const streetname = streets.find((item) => item.streetId === rec.streetId)?.streetname;
                                                const wardname = wards.find((item) => item.wardId === rec.wardId)?.wardname;
                                                const distrctname = districts.find((item) => item.districtId === rec.districtId)?.districtname;

                                                const address = `${projectname}, ${streetname}, ${wardname}, ${distrctname}`;

                                                setValue('districtId', rec.districtId);
                                                setValue('wardId', rec.wardId);
                                                setValue('streetId', rec.streetId);
                                                setValue('address', address);

                                                setValue('projectName', projectname);
                                                setValue('wardName', wardname);
                                                setValue('districtName', distrctname);
                                            }
                                            else {
                                                setValue('address', '');
                                            }
                                        }
                                    })}
                                />
                            </Grid2>
                            <Grid2 size={12}>
                                <TextField
                                    fullWidth
                                    label={'Địa chỉ'}
                                    disabled={isNullOrEmpty(wardId) || !isNullOrEmpty(projectId)}
                                    defaultValue={getValues('address')}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: address ? true : false
                                        }
                                    }}
                                    {...register('address')}
                                />
                            </Grid2>
                        </Grid2>
                        <Box display={'flex'} mt={'auto'} px={4} py={2}>
                            <Button sx={{
                                ...defaultStyles.btnPrimary,
                                ml: 'auto',
                                width: '130px',
                                height: '45px',
                                flex: 'none'
                            }}
                                onClick={() => {
                                    handleOk()
                                }}>Xác nhận</Button>
                        </Box>
                    </Box>
                )}
            </DialogContent>
        </Dialog >
    );
};

export default memo(AddressDialog);