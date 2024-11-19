import React, { memo } from "react";
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { convertNumberToVNDString, attachPath } from 'utils';
import { IHouseInfo } from 'types';
import { defaultStyles } from 'theme/themes';
import createStyle from "../styles";
import { Bathroom, Bed, LocationOn } from "@mui/icons-material";

interface ItemProps {
    house: IHouseInfo
}

const Item: React.FC<ItemProps> = ({ house }) => {
    const styles = createStyle();

    return (
        <Box sx={styles.card}>
            <Box sx={{
                display: 'flex',
            }}>
                <Box aria-description="images-container">
                    <Box width='363px' height='164px' mb={'1px'}>
                        <img
                            style={{ objectFit: 'cover', height: '100%', width: '100%', borderTopLeftRadius: '8px' }}
                            src={attachPath + house.avatarUrl}
                        />
                    </Box>
                    <Box sx={{ width: '363px', display: 'flex', flexWrap: 'wrap', gap: '1px' }}>
                        <img
                            style={{ objectFit: 'cover', width: ' 120px', height: '90px' }}
                            src={attachPath + house.avatarUrl}
                        />
                        <img
                            style={{ objectFit: 'cover', width: ' 120px', height: '90px' }}
                            src={attachPath + house.avatarUrl}
                        />
                        <img
                            style={{ objectFit: 'cover', width: ' 120px', height: '90px' }}
                            src={attachPath + house.avatarUrl}
                        />
                    </Box>
                </Box>
                <Box width={1} py={0.5} pl={3}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, mt: 1 }}>
                        {house.title}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1}>
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
                    <Stack direction={'row'} spacing={1} mt={1}>
                        <Box display={'flex'} alignContent={'center'}>
                            <LocationOn sx={{ fontSize: '18px', color: '#505050' }} />
                        </Box>
                        <Typography sx={{ fontSize: '14px', my: 1, color: '#505050' }}>
                            {`${house.ward?.wardname}, ${house.district?.districtname}`}
                        </Typography>
                    </Stack>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                borderTop: '1px solid #F2F2F2',
                px: 2,
                py: 1,
            }}>
                <Box>
                    <Stack direction={'row'} spacing={1} >
                        <Avatar sx={{ backgroundColor: '#C80001' }}>A</Avatar>
                        <Box display={'flex'} alignContent={'center'}>
                            <Typography sx={{ fontSize: '14px', my: 1, color: '#505050' }}>
                                Admin
                            </Typography>
                        </Box>
                    </Stack>
                    <Box mt={0.5}>
                        <Typography sx={{ fontSize: '12px', color: '#505050' }}>
                            Đăng 23/12/2024
                        </Typography>
                    </Box>
                </Box>
                <Box alignContent={'center'} ml={'auto'}>
                    <Button sx={{ ...defaultStyles.btnPrimary, p: 1, borderRadius: '8px' }}>
                        Gọi ngay: 0936 730 067
                    </Button>
                </Box>
            </Box>
            {/* <Box px={2}>
                    
                </Box> */}
        </Box>
    );
};

export default memo(Item);