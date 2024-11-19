import React from "react";
import {
    Typography,
    Box,
    Stack
} from "@mui/material";
import { LocalPhone, Email, Facebook, YouTube } from '@mui/icons-material'

const Footer: React.FC = () => {
    return (
        <Box component={'footer'} id='box-footer' py={'17px'} px='15px' width={1} height={'180px'} bgcolor={'#2C2C2C'}>
            <Box sx={{ display: { sm: 'block', md: 'flex' } }}>
                <Box>
                    <img height={"40px"} src="/logo.png" />
                </Box>
                <Box ml='auto' mr='24px' >
                    <Box display={'flex'} columnGap={3}>
                        <Stack direction={'row'} columnGap={1}>
                            <LocalPhone sx={{ fontSize: '32px', color: '#bebdbd' }} />
                            <Stack rowGap={0.5}>
                                <Typography sx={{ color: '#bebdbd', fontSize: '14px' }}>Liên hệ</Typography>
                                <Typography sx={{ color: '#fff', fontSize: '14px' }}>0987654321</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} columnGap={1}>
                            <Email sx={{ fontSize: '32px', color: '#bebdbd' }} />
                            <Stack rowGap={0.5}>
                                <Typography sx={{ color: '#bebdbd', fontSize: '14px' }}>Email</Typography>
                                <Typography sx={{ color: '#fff', fontSize: '14px' }}>anthinh.rs@gmail.com</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box display={'flex'} mt='12px'>
                        <Stack direction={'row'} columnGap={1} ml='auto'>
                            <Facebook sx={{ fontSize: '24px', color: '#bebdbd' }} />
                            <YouTube sx={{ fontSize: '24px', color: '#bebdbd' }} />
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                my: '24px',
                height: '1px',
                backgroundColor: 'rgb(255,255,255,0.1)',
            }} ></Box>
            <Box sx={{
                color: 'white'
            }}>
                <Typography fontSize={'12px'}>Copyright ©2025 mogianthinh.xyz</Typography>
            </Box>
        </Box>
    );
};

export default Footer;
