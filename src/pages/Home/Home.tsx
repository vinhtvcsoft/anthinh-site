import React, { memo } from "react";
import {
    Grid2,
    Typography,
    Container,
    Box,
    Stack,
    Button
} from "@mui/material";
import { Filter } from "components";
import { Bed, Bathroom } from '@mui/icons-material'
import createStyle from "./styles";


const HomePage: React.FC = () => {
    const styles = createStyle();
    return (
        <React.Fragment>
            <Box
                sx={{
                    height: { xs: "350px", sm: "500px", md: "520px", lg: "520px", xl: "520px" },
                    alignContent: "center",
                    backgroundImage: {
                        xs: `url(/images/cover.jpg)`,
                        md: `url(/images/cover.jpg)`,
                    },
                    backgroundSize: { xs: "100% 350px", sm: "100% 500px", md: "100% 620px", lg: "100% 620px", xl: "100% 620px" },
                    backgroundRepeat: "no-repeat",
                }}>
                <Box >
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Typography
                            variant="h5"
                            sx={{
                                color: "white",
                                textAlign: "center",
                            }}>
                            Cùng chúng tôi
                        </Typography>
                        <Typography
                            variant="h3"
                            mt="18px"
                            sx={{ color: "white", textAlign: "center", fontWeight: 700 }}>
                            tìm kiếm ngôi nhà mong ước của bạn
                        </Typography>
                        {/* <Typography
                mt="18px"
                variant="h6"
                sx={{
                  color: "white",
                  textAlign: "center",
                }}>
                Chúng tôi có hơn 100 căn hộ đang được ký gửi
              </Typography> */}
                    </Box>
                    <Box sx={{
                        mx: { xs: '5%', sm: '5%', md: '18%', lg: '18%', xl: '18%' },
                        mt: { xs: '0px%', sm: '0px%', md: '50px', lg: '50px', xl: '50px' },
                    }}>
                        <Filter isHomePage />
                    </Box>
                </Box>
            </Box>
            <Container sx={{ overflow: 'hidden' }}>
                <Box key={'sales'} sx={{
                    mt: 3,
                }}>
                    <Box display={'flex'} mb={2}>
                        <Typography sx={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700, }}>Căn hộ dành cho bạn</Typography>
                        <Box flex={1}></Box>
                        <Box ml='auto' display={'flex'}>
                            <Typography sx={{ fontSize: '14px', lineHeight: '32px' }}>Căn hộ bán</Typography>
                            <Typography sx={{ fontSize: '14px', lineHeight: '32px' }}>Căn hộ cho thuê</Typography>
                        </Box>
                    </Box>
                    <Grid2 container margin={0}
                        spacing={{ xs: 2, md: 3 }}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <Grid2
                                key={item}
                                display={'flex'}
                                justifyContent={'center'}
                                sx={styles.card}
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            >
                                <Box width={1}>
                                    <img width={'100%'} height={'225px'} src="https://fastly.picsum.photos/id/176/536/354.jpg?hmac=SBQIkLKEv8uNk-l_ddQiGjyjf7uBg_mF23b-5DvPnXc" />
                                    <Box px={2}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 700, my: 1 }}> Title Value</Typography>
                                        <Typography sx={{ fontSize: '14px', my: 1 }}> Hòa Thạnh, Tân Phú</Typography>
                                        <Stack direction="row" spacing={1} mt={1}>
                                            <Stack direction="row" spacing={1}>
                                                <Bed sx={{ color: 'rgb(0,0,0,0.4)' }} />
                                                <Typography sx={{ fontSize: '14px' }}>2 phòng ngủ</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Bathroom sx={{ color: 'rgb(0,0,0,0.4)' }} />
                                                <Typography sx={{ fontSize: '14px' }}>2 toilets</Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack direction="row" spacing={2} mt={1} width={1} display={'flex'}>
                                            <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#C80001' }}>1.5 tỷ</Typography>
                                            <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#C80001' }}>64m2 </Typography>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Grid2>
                        ))}

                    </Grid2>
                    <Box my='24px' display={'flex'}>
                        <Button sx={{ mx: 'auto', width: '155px', borderRadius: '6px', border: '1px solid #2C2C2C', backgroundColor: 'white', color: '#2C2C2C', lineHeight: '24px' }}>
                            Xem thêm
                        </Button>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    )
};

export default memo(HomePage);