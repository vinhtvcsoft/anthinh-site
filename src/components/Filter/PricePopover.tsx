import React, {
    memo,
    useEffect,
    useState
} from 'react';
import { Box, Popover, Stack, Typography, Slider, FormControlLabel, Radio, Button, } from '@mui/material';
import { Close } from '@mui/icons-material';
import {
    defaultPrices
} from 'types';
import { convertNumberToVNDString, filterPriceText } from 'utils/helper';
import { useFilter } from 'hooks';
import createStyle from './styles';


interface IPricePopover {
    handleOk: (price: number[]) => void;
    handleClose: () => void;
    anchorEl: HTMLElement | null;
}

const PricePopover: React.FC<IPricePopover> = ({ anchorEl, handleOk, handleClose }) => {
    const styles = createStyle();

    const { price: reduxPrice } = useFilter();
    const [price, setPrice] = useState<number[]>([defaultPrices.bFromPrice, defaultPrices.bToPrice]);
    const [priceText, setPriceText] = useState<string[]>(['0', '10 tỷ']);
    const [checkPrice, setCheckPrice] = useState({
        all: true,
        one2two: false,
        two2three: false,
        three2five: false,
    });
    const handleCheckPrice = (f?: 'all' | 'one2two' | 'two2three' | 'three2five') => {
        const obj = {
            all: false,
            one2two: false,
            two2three: false,
            three2five: false,
        }
        if (f) obj[f] = true;
        return obj;
    };

    useEffect(() => {
        setPriceText([convertNumberToVNDString(price[0]), convertNumberToVNDString(price[1])]);
        if (price[0] === defaultPrices.bFromPrice && price[1] === defaultPrices.bToPrice) {
            setCheckPrice(handleCheckPrice('all'));
        }

    }, [price]);

    useEffect(() => {
        const obj = {
            all: false,
            one2two: false,
            two2three: false,
            three2five: false,
        }
        if (reduxPrice[0] === defaultPrices.bFromPrice && reduxPrice[1] === defaultPrices.bToPrice) obj.all = true;
        else if (reduxPrice[0] >= 1000 && reduxPrice[1] <= 2000) obj.one2two = true;
        else if (reduxPrice[0] >= 2000 && reduxPrice[1] <= 3000) obj.two2three = true;
        else if (reduxPrice[0] >= 3000 && reduxPrice[1] <= 5000) obj.three2five = true;
        setCheckPrice(obj);

        setPrice(reduxPrice);
    }, [reduxPrice]);


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
                    <Typography sx={{ fontWeight: 700, ml: 'auto' }} >{filterPriceText}</Typography>
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
                        <Typography sx={{ ...styles.formLabel, color: '#1976D2' }}>{priceText[0]}</Typography>
                    </Stack>
                    <Stack flex={1} direction={'row'} columnGap={1}>
                        <Typography sx={styles.formLabel}>Đến: </Typography>
                        <Typography sx={{ ...styles.formLabel, color: '#1976D2' }}>{priceText[1]}</Typography>
                    </Stack>
                </Stack>
                <Box sx={{ py: '8px', px: '12px' }}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={price}
                        disableSwap
                        onChange={(event, value) => {
                            const values = value as number[];
                            setPrice(values);
                            setCheckPrice(handleCheckPrice())

                        }}
                        valueLabelDisplay="off"
                        step={100}
                        min={defaultPrices.bFromPrice}
                        max={defaultPrices.bToPrice}
                    />
                </Box>
                <Box>
                    <FormControlLabel
                        sx={{ ...styles.formLabelPopover }}
                        label={<span style={{ color: checkPrice.all ? '#1976D2' : '#2C2C2C' }}>Tất cả mức giá</span>}
                        labelPlacement='start'
                        control={
                            <Radio sx={{ px: 0 }} checked={checkPrice.all} />
                        }
                        onChange={() => {
                            setCheckPrice(handleCheckPrice('all'));
                            handleOk([0, 10000]);
                        }}
                    />
                    <FormControlLabel
                        sx={styles.formLabelPopover}
                        label={<span style={{ color: checkPrice.one2two ? '#1976D2' : '#2C2C2C' }}>1 - 2 tỷ</span>}
                        labelPlacement='start'
                        control={
                            <Radio sx={{ px: 0 }} checked={checkPrice.one2two} />
                        }
                        onChange={() => {
                            setCheckPrice(handleCheckPrice('one2two'));
                            handleOk([1000, 2000]);
                        }}
                    />
                    <FormControlLabel
                        sx={styles.formLabelPopover}
                        label={<span style={{ color: checkPrice.two2three ? '#1976D2' : '#2C2C2C' }}>2 - 3 tỷ</span>}
                        labelPlacement='start'
                        control={
                            <Radio sx={{ px: 0 }} checked={checkPrice.two2three} />
                        }
                        onChange={() => {
                            setCheckPrice(handleCheckPrice('two2three'));
                            handleOk([2000, 3000]);
                        }}
                    />
                    <FormControlLabel
                        sx={styles.formLabelPopover}
                        label={<span style={{ color: checkPrice.three2five ? '#1976D2' : '#2C2C2C' }}>3 - 5 tỷ</span>}
                        labelPlacement='start'
                        control={
                            <Radio sx={{ px: 0 }} checked={checkPrice.three2five} />
                        }
                        onChange={() => {
                            setCheckPrice(handleCheckPrice('three2five'));
                            handleOk([3000, 5000]);
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
                    onClick={() => setPrice([defaultPrices.bFromPrice, defaultPrices.bToPrice])}
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
                        handleOk(price);
                    }}
                >Áp dụng</Button>
            </Box>
        </Box>

    </Popover>
};
export default memo(PricePopover);