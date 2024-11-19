import React, { useState, memo } from "react";
import { Box, Grid2, Stack, Typography, Skeleton, Avatar, Tooltip } from '@mui/material';
import { convertNumberToVNDString, attachPath } from 'utils';
import { EDemand, IHouseInfo } from 'types';
import createStyle from "./styles";
import { Bathroom, Bed } from "@mui/icons-material";


interface ItemProps {
    house: IHouseInfo
}

const HouseItem: React.FC<ItemProps> = ({ house }) => {
    const styles = createStyle();

    const [loading, setLoading] = useState(true);

    return (
        <Grid2
            display={'flex'}
            justifyContent={'center'}
            sx={styles.card}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
            <Box sx={{
                width: '100%',
                pb: '8px',
                cursor: 'pointer',
            }}>
                {loading && <Skeleton
                    variant="rectangular"
                    sx={{
                        width: 'calc(100% - 32px);',
                        height: '193px',
                        m: 2
                    }} />
                }
                <img
                    width={'100%'}
                    height={'225px'}
                    hidden={loading}
                    src={attachPath + house.avatarUrl}
                    onLoad={() => {
                        setLoading(false)
                    }}
                    onError={() => {
                        setLoading(false)
                    }}
                />

                <Box px={2}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, my: 1 }}>
                        {house.title}
                    </Typography>
                    <Typography sx={{ fontSize: '14px', my: 1 }}>
                        {`${house.ward?.wardname}, ${house.district?.districtname}`}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1}>
                        <Stack direction="row" spacing={1}>
                            <Bed sx={{ color: 'rgb(0,0,0,0.4)' }} />
                            <Typography sx={{ fontSize: '14px' }}>
                                {`${house.bedroom} phòng ngủ`}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Bathroom sx={{ color: 'rgb(0,0,0,0.4)' }} />
                            <Typography sx={{ fontSize: '14px' }}>
                                {`${house.bathroom} toilets`}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Box mt={1} width={1} display={'flex'}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#C80001', mr: 1 }}>
                            {convertNumberToVNDString((house.price || 0) / 1000000)}
                        </Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#C80001' }}>
                            {`${house.area} m²`}
                        </Typography>
                        <Typography sx={{ fontSize: '14px', color: '#505050', mx: 1.5 }}>
                            -
                        </Typography>
                        <Typography sx={{ fontSize: '14px', color: '#505050' }}>
                            {`${convertNumberToVNDString(Math.round((house.price ?? 0) / (house.area ?? 0) / 100000) / 10)} tr/m²`}
                        </Typography>
                        <Tooltip
                            title={`Căn hộ ${house.demandtype === EDemand.B ? 'bán' : 'cho thuê'}`}>
                            <Avatar sx={{
                                backgroundColor: 'transparent',
                                color: 'rgb(0,0,0,0.4)',
                                fontWeight: 700,
                                fontSize: '14px',
                                height: '22px',
                                width: '14px',
                                ml: 'auto'
                            }}>
                                {EDemand[house.demandtype]}
                            </Avatar>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Grid2>
    );
};

export default memo(HouseItem);