import React, {
    memo,
    useState,
    useMemo,
    useEffect,
} from "react";
import {
    Box,
    Container,
    Stepper,
    Step,
    Button,
    Typography,
    AppBar,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { IHouseItem, defaultHouseRecord } from 'types';
import { defaultStyles } from 'theme';
import { useForm, useWatch } from 'react-hook-form';
import { isNullOrEmpty, getHouseTitle } from 'utils'
import { useHouse } from 'hooks';
import {
    addAppListener,
    useAppDispatch,
    UnsubscribeListener,
} from "store/listenerMiddleware";
import { saveSuccess } from "store/house/reducer";
import Infomation from './components/Infomation';
import Media from './components/Media';

const Consigment: React.FC = () => {
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const steps = [0, 1, 2];
    const [btnDisable, setBtnDisable] = useState(true);

    const [activeStep, setActiveStep] = useState(1);
    const stepLabel = useMemo(() => {
        let label = '';
        if (activeStep === 1) label = `Bước ${activeStep}: Thông tin BĐS`;
        else if (activeStep === 2) label = `Bước ${activeStep}: Hình ảnh BĐS`;
        return label;
    }, [activeStep]);

    const form = useForm<IHouseItem>({
        defaultValues: defaultHouseRecord
    });
    const { handleSubmit, control } = form;

    const consigmentname = useWatch({ control, name: 'consigmentname' });
    const consigmentphone = useWatch({ control, name: 'consigmentphone' });
    const demandtype = useWatch({ control, name: 'demandtype' });
    const housetype = useWatch({ control, name: 'housetype' });
    const area = useWatch({ control, name: 'area' });
    const price = useWatch({ control, name: 'price' });
    const address = useWatch({ control, name: 'address' });
    const attachments = useWatch({ control, name: 'attachments' });

    const { add } = useHouse();

    useEffect(() => {
        const unsubscribe = appDispatch(
            addAppListener({
                actionCreator: saveSuccess,
                effect: () => {
                    navigate('/');
                },
            })
        );
        return unsubscribe as unknown as UnsubscribeListener;
    }, []);

    useEffect(() => {
        (!isNullOrEmpty(consigmentname) &&
            !isNullOrEmpty(consigmentphone) && !isNullOrEmpty(demandtype) &&
            !isNullOrEmpty(housetype) &&
            !isNullOrEmpty(area) &&
            !isNullOrEmpty(price) &&
            !isNullOrEmpty(address)) ? setBtnDisable(false) : setBtnDisable(true);
    }, [demandtype, housetype, area, price, address, consigmentname, consigmentphone]);

    return (
        <Box sx={{
            height: '100vh',
        }}>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: '#FFF',
                    boxShadow: 'none'
                }}
            >
                <Box display={'flex'} p={2}>
                    <Box alignContent={'center'}>
                        <Typography color={'#0D1011'} fontSize="16px" fontWeight={700} >{stepLabel}</Typography>
                    </Box>

                    {/* Chú ý khi thoát có trả về filter trước khi ký gửi không */}
                    <Button sx={{
                        ml: 'auto',
                        border: '1px solid #2C2C2C',
                        borderRadius: '8px',
                        color: '#2C2C2C',
                        textTransform: 'none',
                        width: '100px',
                        '&:hover': {
                            backgroundColor: '#C80001',
                        }
                    }} onClick={() => navigate('/')}> Thoát </Button>
                </Box>

                <Stepper
                    activeStep={activeStep}
                    sx={{
                        height: '20px',
                        '& .MuiStep-root': {
                            display: 'none'
                        },
                        '& .MuiStepConnector-line': {
                            borderTopWidth: '4px',
                            borderRadius: '5px',

                        },
                        '& .Mui-active .MuiStepConnector-line, & .Mui-completed .MuiStepConnector-line': {
                            borderTopColor: '#C80001'
                        }
                    }}

                >
                    {steps.map((label, _index) => {
                        const stepProps: { completed?: boolean } = {};
                        return (
                            <Step key={label} {...stepProps}>
                            </Step>
                        );
                    })}
                </Stepper>
            </AppBar>
            <Container maxWidth='md'
                sx={{
                    overflowX: 'hidden',
                    mt: '106px',
                }}>
                {activeStep === 1 && (<Infomation form={form} />)}
                {activeStep === 2 && (<Media form={form} />)}
                <Box display={'flex'} justifyContent={'end'} py={2}>
                    {activeStep === 1 && (<Button
                        disabled={btnDisable}
                        sx={{
                            ...(btnDisable === true ? defaultStyles.btnDisabled : defaultStyles.btnPrimary),
                            ml: 'auto',
                            width: '100px',
                        }}
                        onClick={() => {
                            setActiveStep(activeStep + 1);
                        }}
                    > Tiếp tục </Button>)}
                    {activeStep === 2 && (<Button
                        disabled={attachments.length === 0}
                        sx={{
                            ...(attachments.length === 0 ? defaultStyles.btnDisabled : defaultStyles.btnPrimary),
                            // ml: 'auto',
                            width: '100px',

                        }}
                        onClick={() => {
                            // handleSubmit((o) => {
                            //     o.title = getHouseTitle(o);
                            //     add(o);
                            // }, (error) => {
                            //     console.log(error);
                            // })();
                        }}
                    > Quay lại </Button>)}
                    {activeStep === 2 && (<Button
                        disabled={attachments.length === 0}
                        sx={{
                            ...(attachments.length === 0 ? defaultStyles.btnDisabled : defaultStyles.btnPrimary),
                            // ml: 'auto',
                            width: '100px',
                        }}
                        onClick={() => {
                            handleSubmit((o) => {
                                o.title = getHouseTitle(o);
                                add(o);
                            }, (error) => {
                                console.log(error);
                            })();
                        }}
                    > Ký gửi </Button>)}

                </Box>
            </Container>
        </Box>

    );
};

export default memo(Consigment);