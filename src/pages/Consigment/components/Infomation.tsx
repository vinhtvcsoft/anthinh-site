import React, {
    memo,
    useState,
} from "react";
import {
    Stack,
    Grid2,
    ToggleButton,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import { Search, Edit } from '@mui/icons-material'
import { EDemand, IHouseItem, houseTypes, houseLegals, houseFurniture, houseDirections } from 'types';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { defaultStyles } from 'theme';
import { isNullOrEmpty, numberToVietnameseCurrencyText } from 'utils';
import { Autocomplete, ButtonCounter, Number } from 'components';
import createStyle from '../styles'
import AddressDialog from "./AddressDialog";


interface IInfomationProps {
    form: UseFormReturn<IHouseItem>;
}

const Infomation: React.FC<IInfomationProps> = ({ form }) => {
    const styles = createStyle();
    const { getValues, setValue, register, control } = form;
    const demandtype = useWatch({ control, name: 'demandtype' });
    const projectId = useWatch({ control, name: 'projectId' });
    const address = useWatch({ control, name: 'address' });

    const [textPrice, setTextPrice] = useState<string>('');

    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <Grid2 container spacing={2}>
                <Grid2
                    container
                    size={12}
                    spacing={2}
                    sx={{
                        p: 3,
                        border: '1px solid #C2C2C2',
                        borderRadius: '16px'
                    }}
                >
                    <Grid2 size={12}>
                        <Typography sx={{ fontWeight: 700 }}>Nhu cầu</Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <Stack direction={'row'} px={6} columnGap={2}>
                            <ToggleButton
                                selected={demandtype === EDemand.B}
                                value={EDemand.B}
                                sx={{ ...defaultStyles.btn, ...styles.buttonDemand }}
                                onClick={() => {
                                    setValue('demandtype', EDemand.B);
                                }}
                            >
                                Bán
                            </ToggleButton >
                            <ToggleButton
                                selected={demandtype === EDemand.T}
                                value={EDemand.T}
                                sx={{ ...defaultStyles.btn, ...styles.buttonDemand }}
                                onClick={() => {
                                    setValue('demandtype', EDemand.T);
                                }}
                            >
                                Cho thuê
                            </ToggleButton >
                        </Stack>
                    </Grid2>
                </Grid2>

                <Grid2
                    container
                    size={12}
                    spacing={2}
                    sx={{
                        p: 3,
                        border: '1px solid #C2C2C2',
                        borderRadius: '16px'
                    }}
                >
                    <Grid2 size={12}>
                        <Typography sx={{ fontWeight: 700 }}>Thông tin người ký gửi</Typography>
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            required
                            fullWidth
                            label={'Họ và tên'}
                            {...register('consigmentname', {
                                required: 'Họ và tên không được để trống'
                            })}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            type='phone'
                            required
                            fullWidth
                            label={'Số điện thoại'}
                            {...register('consigmentphone', {
                                required: 'Số điện thoại không được để trống'
                            })}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            type="email"
                            label={'Email'}
                            {...register('consigmentemail')}
                        />
                    </Grid2>
                </Grid2>
                <Grid2
                    container
                    size={12}
                    spacing={2}
                    sx={{
                        p: 3,
                        border: '1px solid #C2C2C2',
                        borderRadius: '16px'
                    }}
                >
                    <Box display={'flex'} width={1}>
                        <Typography sx={{ fontWeight: 700, width: '100%' }}>Địa chỉ BĐS (*)</Typography>
                        {!isNullOrEmpty(address) && (
                            <Box ml={'auto'}>
                                <Edit sx={{ cursor: 'pointer' }} onClick={() => {
                                    setOpen(true);
                                }} />
                            </Box>
                        )}
                    </Box>

                    {isNullOrEmpty(address) ?
                        (
                            <TextField
                                fullWidth
                                slotProps={{
                                    input: {
                                        startAdornment: <Search />,
                                        readOnly: true
                                    }
                                }}
                                placeholder={'Chọn địa chỉ'}
                                sx={{
                                    '& input': { cursor: 'pointer' },
                                    '& label.Mui-focused': { color: '#C80001' },
                                    '& fieldset': { borderColor: 'rgb(0,0,0,0.8) !important' }
                                }}
                                onClick={() => {
                                    setOpen(true);
                                }}
                            />
                        ) :
                        (
                            <Typography>{address}</Typography>
                        )}
                </Grid2>
                <Grid2
                    container
                    size={12}
                    spacing={2}
                    sx={{
                        p: 3,
                        border: '1px solid #C2C2C2',
                        borderRadius: '16px'
                    }}
                >
                    <Grid2 size={12}>
                        <Typography sx={{ fontWeight: 700 }}>Thông tin BĐS</Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            label={'Mã căn hộ'}
                            {...register('houseno')}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Autocomplete
                            fullWidth
                            label={'Loại BĐS'}
                            defaultValue={getValues('housetype')}
                            store={{
                                mode: 'local',
                                data: projectId ? houseTypes.filter(item => item.isproject) : houseTypes.filter(item => !item.isproject),
                            }}
                            idField="code"
                            textField="label"
                            required
                            {...register('housetype')}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Number
                            fullWidth
                            required
                            label={'Diện tích'}
                            unitText={<Typography>m<sup>2</sup></Typography>}
                            {...register('area')}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Number
                            required
                            label={'Mức giá'}
                            unitText="VND"
                            helperText={textPrice}
                            {...register('price', {
                                onChange: (e) => {
                                    const v = e.target.value;
                                    if (v) {
                                        setTextPrice(numberToVietnameseCurrencyText(v) || '');
                                    }
                                    else setTextPrice('');
                                }
                            })}
                        />
                    </Grid2>

                </Grid2>
                <Grid2
                    container
                    size={12}
                    spacing={2}
                    sx={{
                        p: 3,
                        border: '1px solid #C2C2C2',
                        borderRadius: '16px'
                    }}
                >
                    <Grid2 size={12}>
                        <Typography sx={{ fontWeight: 700 }}>Thông tin khác</Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <Autocomplete
                            fullWidth
                            label={'Giấy tờ pháp lý'}
                            defaultValue={getValues('legal')}
                            store={{
                                mode: 'local',
                                data: houseLegals,
                            }}
                            idField="code"
                            textField="label"
                            allowAddOption
                            textAddTitle="Thêm Giấy tờ pháp lý"
                            {...register('legal')}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Autocomplete
                            fullWidth
                            label={'Nội thất'}
                            defaultValue={getValues('furniture')}
                            store={{
                                mode: 'local',
                                data: houseFurniture,
                            }}
                            idField="code"
                            textField="label"
                            allowAddOption
                            textAddTitle="Thêm Nội thất"
                            {...register('furniture')}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Box display={'flex'}>
                            <Box alignContent={'center'}>
                                <Typography sx={{ flex: 1 }}>Số phòng ngủ</Typography>
                            </Box>
                            <Box ml='auto'>
                                <ButtonCounter
                                    defaultValue={getValues('bedroom')}
                                    {...register('bedroom')}
                                />
                            </Box>

                        </Box>
                    </Grid2>
                    <Grid2 size={12}>
                        <Box display={'flex'}>
                            <Box alignContent={'center'}>
                                <Typography sx={{ flex: 1 }}>Số phòng tắm, vệ sinh</Typography>
                            </Box>
                            <Box ml='auto'>
                                <ButtonCounter
                                    defaultValue={getValues('bathroom')}
                                    {...register('bathroom')}
                                />
                            </Box>

                        </Box>
                    </Grid2>
                    <Grid2 size={12}>
                        <Autocomplete
                            fullWidth
                            label={'Hướng nhà'}
                            defaultValue={getValues('directionhouse')}
                            store={{
                                mode: 'local',
                                data: houseDirections,
                            }}
                            idField="code"
                            textField="label"
                            {...register('directionhouse')}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Autocomplete
                            fullWidth
                            label={'Hướng ban công'}
                            defaultValue={getValues('directionbalcony')}
                            store={{
                                mode: 'local',
                                data: houseDirections,
                            }}
                            idField="code"
                            textField="label"
                            {...register('directionbalcony')}
                        />
                    </Grid2>
                </Grid2>
            </Grid2>
            {open && (
                <AddressDialog
                    open={open}
                    form={form}
                    handleOk={() => {
                        setOpen(false)
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default memo(Infomation);