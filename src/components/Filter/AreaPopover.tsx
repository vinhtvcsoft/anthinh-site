import React, {
    memo,
    useEffect,
    useState
} from 'react';
import { Box, Popover, Stack, Typography, Slider, FormControlLabel, Radio, Button, } from '@mui/material';
import { Close } from '@mui/icons-material';
import {
    defaultArea
} from 'types';
import { useFilter } from 'hooks';
import { filterAreaText } from 'utils/helper';
import createStyle from './styles';


interface IAreaPopover {
    handleOk: (area: number[]) => void;
    handleClose: () => void;
    anchorEl: HTMLElement | null;
}

const AreaPopover: React.FC<IAreaPopover> = ({ anchorEl, handleOk, handleClose }) => {
    const styles = createStyle();

    const { area: reduxArea } = useFilter();
    const [area, setArea] = useState<number[]>([defaultArea.from, defaultArea.to]);
    const [areaText, setAreaText] = useState<string[]>(['0', '150 m²']);
    const [checkArea, setCheckArea] = useState({
        all: true,
        lt50: false,
        fifty2eighty: false,
        eighty2onehundred: false,
    });
    const handleCheckArea = (f?: 'all' | 'lt50' | 'fifty2eighty' | 'eighty2onehundred') => {
        const obj = {
            all: false,
            lt50: false,
            fifty2eighty: false,
            eighty2onehundred: false,
        }
        if (f) obj[f] = true;
        return obj;
    };

    useEffect(() => {
        setAreaText([`${area[0]} m²`, `${area[1]} m²`]);
        if (area[0] === defaultArea.from && area[1] === defaultArea.to) {
            setCheckArea(handleCheckArea('all'));
        }

    }, [area]);

    useEffect(() => {
        const obj = {
            all: false,
            lt50: false,
            fifty2eighty: false,
            eighty2onehundred: false,
        }
        if (reduxArea[0] === defaultArea.from && reduxArea[1] === defaultArea.to) obj.all = true;
        else if (reduxArea[0] >= 0 && reduxArea[1] <= 50) obj.lt50 = true;
        else if (reduxArea[0] >= 50 && reduxArea[1] <= 80) obj.fifty2eighty = true;
        else if (reduxArea[0] >= 80 && reduxArea[1] <= 100) obj.eighty2onehundred = true;
        setCheckArea(obj);

        setArea(reduxArea);
    }, [reduxArea]);


    return <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
            handleClose();
        }}
        disableScrollLock={true}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        slotProps={{
            paper: {
                sx: { mt: '3px' }
            }
        }}
    >
        <Box sx={{ width: '320px' }}>
            <Box borderBottom={'1px solid #E0E0E0'}>
                <Stack
                    m='12px'
                    direction='row'
                    justifyContent={'center'}
                >
                    <Typography sx={{ fontWeight: 700, ml: 'auto' }} >{filterAreaText}</Typography>
                    <Close
                        sx={{ fontSize: '18px', ml: 'auto', my: 'auto' }}
                        onClick={() => {
                            handleClose();
                        }}
                    />
                </Stack>
            </Box>
            <Box p={'16px'} borderBottom={'1px solid #E0E0E0'}>
                <Stack direction={'row'}>
                    <Stack flex={1} direction={'row'} columnGap={1}>
                        <Typography sx={styles.formLabel}>Từ: </Typography>
                        <Typography sx={{ ...styles.formLabel, color: '#1976D2' }}>{areaText[0]}</Typography>
                    </Stack>
                    <Stack flex={1} direction={'row'} columnGap={1}>
                        <Typography sx={styles.formLabel}>Đến: </Typography>
                        <Typography sx={{ ...styles.formLabel, color: '#1976D2' }}>{areaText[1]}</Typography>
                    </Stack>
                </Stack>
                <Box sx={{ py: '8px', px: '12px' }}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={area}
                        disableSwap
                        onChange={(event, value) => {
                            const values = value as number[];
                            setArea(values);
                            setCheckArea(handleCheckArea())

                        }}
                        valueLabelDisplay="off"
                        step={2}
                        min={defaultArea.from}
                        max={defaultArea.to}
                    />
                </Box>
                <Box>
                    <FormControlLabel
                        sx={{ ...styles.formLabelPopover }}
                        label={<span style={{ color: checkArea.all ? '#1976D2' : '#2C2C2C' }}>Tất cả diện tích</span>}
                        labelPlacement='start'
                        control={
                            <Radio sx={{ px: 0 }} checked={checkArea.all} />
                        }
                        onChange={() => {
                            setCheckArea(handleCheckArea('all'));
                            handleOk([0, 150]);
                        }}
                    />
                    <FormControlLabel
                        sx={styles.formLabelPopover}
                        label={<span style={{ color: checkArea.lt50 ? '#1976D2' : '#2C2C2C' }}>Dưới 50 m²</span>}
                        labelPlacement='start'
                        control={
                            <Radio sx={{ px: 0 }} checked={checkArea.lt50} />
                        }
                        onChange={() => {
                            setCheckArea(handleCheckArea('lt50'));
                            handleOk([0, 50]);
                        }}
                    />
                    <FormControlLabel
                        sx={styles.formLabelPopover}
                        label={<span style={{ color: checkArea.fifty2eighty ? '#1976D2' : '#2C2C2C' }}>50 - 80 m²</span>}
                        labelPlacement='start'
                        control={
                            <Radio sx={{ px: 0 }} checked={checkArea.fifty2eighty} />
                        }
                        onChange={() => {
                            setCheckArea(handleCheckArea('fifty2eighty'));
                            handleOk([50, 80]);
                        }}
                    />
                    <FormControlLabel
                        sx={styles.formLabelPopover}
                        label={<span style={{ color: checkArea.eighty2onehundred ? '#1976D2' : '#2C2C2C' }}>80 -100 m²</span>}
                        labelPlacement='start'
                        control={
                            <Radio sx={{ px: 0 }} checked={checkArea.eighty2onehundred} />
                        }
                        onChange={() => {
                            setCheckArea(handleCheckArea('eighty2onehundred'));
                            handleOk([80, 100]);
                        }}
                    />
                </Box>
            </Box>
            <Box p={'16px'} display={'flex'}>
                <Button
                    sx={{
                        color: '#2C2C2C',
                        textTransform: 'none',
                        fontWeight: 700,
                        p: 0
                    }}
                    onClick={() => setArea([defaultArea.from, defaultArea.to])}
                >Đặt lại</Button>
                <Button
                    sx={{
                        backgroundColor: '#C80001',
                        color: '#FFF',
                        textTransform: 'none',
                        fontWeight: 700,
                        p: 0,
                        ml: 'auto',
                        width: '80px'
                    }}
                    onClick={() => {
                        handleOk(area);
                    }}
                >Áp dụng</Button>
            </Box>
        </Box>

    </Popover>
};
export default memo(AreaPopover);