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
import { PieChart } from '@mui/x-charts';
import { Close } from '@mui/icons-material';
import {
    defaultDirection,
    EDirection
} from 'types';
import { useFilter } from 'hooks';
import { filterDirectionText } from 'utils/helper';
// import createStyle from './styles';


interface IDirectionPopover {
    handleOk: (directs: EDirection[]) => void;
    handleClose: () => void;
    anchorEl: HTMLElement | null;
}

const DirectionPopover: React.FC<IDirectionPopover> = ({ anchorEl, handleOk, handleClose }) => {
    // const styles = createStyle();

    const { mainDirection: reduxmainDirection } = useFilter();
    const [direct, setDirect] = useState<EDirection[]>([]);

    const [data, setData] = useState(defaultDirection);
    const [itemsClicked, setItemsClicked] = useState<EDirection[]>([]);
    // console.log(styles);

    useEffect(() => {
        setDirect(reduxmainDirection);
    }, [reduxmainDirection]);

    useEffect(() => {
        setData(old => {
            return old.map((item) => {
                if (itemsClicked.includes(item.id as EDirection)) {
                    return {
                        ...item,
                        color: '#C80001',

                    }
                }
                return {
                    ...item,
                    color: '#E8E9EB',
                }
            });
        });
    }, [itemsClicked]);


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
                    <Typography sx={{ fontWeight: 700, ml: 'auto' }} >{filterDirectionText}</Typography>
                    <Close
                        sx={{ fontSize: '18px', ml: 'auto', my: 'auto' }}
                        onClick={() => {
                            handleClose();
                        }}
                    />
                </Stack>
            </Box>
            <Box p={'16px'} borderBottom={'1px solid #E0E0E0'}>
                <Box width={1} height={240}>
                    <PieChart
                        series={
                            [{
                                data,

                                arcLabel: 'label',
                                arcLabelMinAngle: 18,
                                arcLabelRadius: '90%',
                                outerRadius: 120,
                                innerRadius: 40,
                                cx: '75%',
                                startAngle: -22,
                                endAngle: 338,
                                valueFormatter: () => {
                                    return '';
                                },
                                highlightScope: {
                                    fade: 'series',
                                },
                                type: 'pie'
                            }]
                        }
                        slotProps={{
                            legend: {
                                hidden: true,
                            },
                            pieArcLabel: {
                                fontSize: '12px',
                            },
                            popper: {
                                hidden: true,
                            },

                        }}

                        // colors={['#E8E9EB']}
                        // highlightedItem={{ dataIndex: 1 }}
                        onItemClick={(event, pieItemIdentifier, item) => {
                            setItemsClicked((old) => {
                                const itemId = item.id as EDirection;
                                const temp = [...old];
                                if (old.includes(itemId)) {
                                    const a = temp.find((i) => i === itemId);
                                    temp.splice(temp.indexOf(a as EDirection), 1);
                                }
                                else temp.push(itemId);
                                setDirect(temp);
                                return temp;
                            })
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
                    onClick={() => {
                        setItemsClicked([]);
                        setDirect([]);
                    }}
                >Đặt lại</Button>
                <Button
                    sx={{
                        backgroundColor: '#C80001',
                        color: '#FFF !important',
                        textTransform: 'none',
                        fontWeight: 700,
                        p: 0,
                        ml: 'auto',
                        width: '80px'
                    }}
                    onClick={() => {
                        handleOk(direct);
                    }}
                >Áp dụng</Button>
            </Box>
        </Box>

    </Popover>
};
export default memo(DirectionPopover);