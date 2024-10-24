import React, {
    memo,
    useEffect,
    useState
} from 'react';
import {
    Box,
    Popover,
    Stack,
    Typography,
    //  Slider, 
    //  FormControlLabel, 
    //  Radio, 
    Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFilter } from 'hooks';
import { filterBedroomText } from 'utils/helper';
import createStyle from './styles';


interface IBedroomPopover {
    handleOk: (bedroom: number[]) => void;
    handleClose: () => void;
    anchorEl: HTMLElement | null;
}

const BedroomPopover: React.FC<IBedroomPopover> = ({ anchorEl, handleOk, handleClose }) => {
    const styles = createStyle();

    const { bedroom: reduxBedroom } = useFilter();
    const [bedroom, setBedroom] = useState<number[]>([]);
    const [itemsClicked, setItemsClicked] = useState<number[]>([]);

    useEffect(() => {
        setBedroom(reduxBedroom);
    }, [reduxBedroom]);


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
        <Box sx={{ width: '240px' }}>
            <Box borderBottom={'1px solid #E0E0E0'}>
                <Stack
                    m='12px'
                    direction='row'
                    justifyContent={'center'}
                >
                    <Typography sx={{ fontWeight: 700, ml: 'auto' }} >{filterBedroomText}</Typography>
                    <Close
                        sx={{ fontSize: '18px', ml: 'auto', my: 'auto' }}
                        onClick={() => {
                            handleClose();
                        }}
                    />
                </Stack>
            </Box>
            <Box p={'16px'} borderBottom={'1px solid #E0E0E0'}>
                <Stack width={1} direction={'row'} columnGap={1} mx={'auto'}>
                    {[1, 2, 3].map((item) => (
                        <Button
                            key={item}
                            sx={itemsClicked.includes(item) ? styles.bedroomBtnClicked : styles.bedroomBtn}
                            onClick={() => {
                                setItemsClicked((old) => {
                                    const temp = [...old];
                                    if (old.includes(item)) {
                                        const a = temp.find((i) => i === item);
                                        a && temp.splice(temp.indexOf(a), 1);
                                    }
                                    else temp.push(item);
                                    return temp;
                                })
                            }}
                        >
                            {item === 3 ? `${item}+` : item}
                        </Button>
                    ))}
                </Stack>
            </Box>
            <Box p={'16px'} display={'flex'}>
                <Button
                    sx={{
                        color: '#2C2C2C',
                        textTransform: 'none',
                        fontWeight: 700,
                        p: 0
                    }}
                    onClick={() => setBedroom([])}
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
                        handleOk(bedroom);
                    }}
                >Áp dụng</Button>
            </Box>
        </Box>

    </Popover>
};
export default memo(BedroomPopover);