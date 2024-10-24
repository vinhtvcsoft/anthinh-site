import React, { memo, useEffect, useMemo } from "react";
import {
    Breadcrumbs,
    Filter
} from 'components'
import { get } from 'services/api/common';
import {
    Box,
    Container,
    Typography,
    Stack,
    Button,
} from "@mui/material";
import { useFilter } from 'hooks';
import { useLocation } from 'react-router-dom';
import { ESearchType } from 'types';

const ListCard: React.FC = () => {
    const { tsearch } = useFilter();
    const { pathname } = useLocation();
    const title = useMemo(() => {
        if (tsearch === ESearchType.B) return 'Căn hộ bán tại thành phố Hồ Chí Minh';
        else return 'Căn hộ cho thuê tại thành phố Hồ Chí Minh';
    }, [tsearch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        get();
    }, []);

    return (
        <Container sx={{ overflow: 'hidden' }}>
            <Box
                id='filter-box'
                sx={{
                    py: '24px !important',
                    borderBottom: '1px solid #e0e0e0',
                }}
            >
                <Filter />
            </Box>
            <Stack id='breadcrumbs-box' py={'12px'} rowGap={1}>
                {title && <Typography variant="h1" sx={{ fontSize: '24px' }}>{title}</Typography>}
                <Breadcrumbs />
            </Stack>
            <Box id='items-box'>
                <Box display={'flex'}>
                    {/* Loop Items */}
                    <Box id='avatar-property'></Box>
                    <Box id='item-content'> </Box>
                </Box>
                <Box my='24px' display={'flex'}>
                    <Button sx={{ mx: 'auto', width: '155px', borderRadius: '6px', border: '1px solid #2C2C2C', backgroundColor: 'white', color: '#2C2C2C', lineHeight: '24px' }}>
                        Xem thêm
                    </Button>
                </Box>
            </Box>

        </Container>
    );
};

export default memo(ListCard);