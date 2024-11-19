import React, { memo, useEffect, useMemo } from "react";
import {
    Filter
} from 'components'
import {
    Box,
    Container,
    Typography,
    Stack,
    Pagination,
} from "@mui/material";
import { useFilter, useHouse } from 'hooks';
import { ESearchType } from 'types';
import Item from './components/Item';

const ListCard: React.FC = () => {
    const { tsearch, locations, } = useFilter();
    const { get: getHouse, houseRecords } = useHouse();
    const title = useMemo(() => {
        let text = '';

        if (tsearch === ESearchType.B) text = 'Căn hộ bán tại';
        else text = 'Căn hộ cho thuê tại';

        if (locations.length > 0) {
            if (locations.length === 1) text += ` dự án${locations[0].matchname}`;
            else {
                text += ' các dự án';
                locations.forEach(location => text += ` ${location.matchname},`);
                text = text.substring(0, text.length - 1);
            }
        }
        else {
            text += ' thành phố Hồ Chí Minh';
        }

        return text
    }, [tsearch, locations]);

    useEffect(() => {
        if (tsearch) {
            getHouse({ t: tsearch, p: 1, ps: 10 });
        }
    }, [
        tsearch,
        locations,
    ]);

    return (
        <Container maxWidth={'lg'} sx={{ overflow: 'hidden' }}>
            <Box
                id='filter-box'
                sx={{
                    py: '24px !important',
                    borderBottom: '1px solid #e0e0e0',
                }}
            >
                <Filter />
            </Box>
            <Stack py={'12px'} rowGap={1}>
                {title && <Typography sx={{ fontSize: '24px', fontWeight: 700 }}>{title}</Typography>}
            </Stack>
            <Box width={1} display={'flex'}>
                <Box flex={7.5}>
                    {houseRecords && houseRecords.map((house) => (
                        <Item house={house} key={house.houseid} />
                    ))}
                </Box>
                <Box flex={2.5} ml={2}>
                    <Box sx={{
                        height: '350px',
                        width: 1,
                        backgroundColor: '#F2F2F2',
                        p: 2,
                        borderRadius: '8px',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, lineHeight: '20px' }}>Bán căn hộ chung cư tại Quận Tân Phú</Typography>
                        <Stack spacing={1} mt={1}>
                            <Typography sx={{ color: '#505050', fontSize: '14px', lineHeight: '20px' }}>Lostus Garden (8)</Typography>
                            <Typography sx={{ color: '#505050', fontSize: '14px', lineHeight: '20px' }}>Trung Đông Plaza (3)</Typography>
                            <Typography sx={{ color: '#505050', fontSize: '14px', lineHeight: '20px' }}>Khang Phú (5)</Typography>
                            <Typography sx={{ color: '#505050', fontSize: '14px', lineHeight: '20px' }}>Sài Gòn Tower (10)</Typography>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Stack spacing={2}>
                <Pagination sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
                    count={10}
                    variant="outlined"
                    shape="rounded" />
            </Stack>
        </Container>
    );
};

export default memo(ListCard);