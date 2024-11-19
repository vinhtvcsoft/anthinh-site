import React, { memo, useEffect, useRef } from "react";
import {
    Grid2,
    Typography,
    Container,
    Box,
    Button,
} from "@mui/material";
import { Filter } from "components";
import { useHouse } from 'hooks';
import HouseItem from './HouseItem';
// import createStyle from "./styles";


const HomePage: React.FC = () => {
    // const styles = createStyle();
    const refPage = useRef(1);
    const { houseRecords, totalHouse, get } = useHouse();

    useEffect(() => {
        get({
            p: refPage.current,
            ps: 8
        });
    }, []);

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
                        {/* <Box ml='auto' display={'flex'}>
                            <Typography sx={{ fontSize: '14px', lineHeight: '32px' }}>Căn hộ bán</Typography>
                            <Typography sx={{ fontSize: '14px', lineHeight: '32px' }}>Căn hộ cho thuê</Typography>
                        </Box> */}
                    </Box>
                    <Grid2 container margin={0}
                        spacing={{ xs: 2, md: 3 }}
                    >
                        {houseRecords && houseRecords.map((house) => (
                            <HouseItem house={house} key={house.houseid} />
                        ))}

                    </Grid2>
                    {totalHouse > refPage.current * 8 && (
                        <Box my='24px' display={'flex'}>
                            <Button sx={{ mx: 'auto', width: '155px', borderRadius: '6px', border: '1px solid #2C2C2C', backgroundColor: 'white', color: '#2C2C2C', lineHeight: '24px' }}>
                                Xem thêm
                            </Button>
                        </Box>
                    )}

                </Box>
            </Container>
        </React.Fragment>
    )
};

export default memo(HomePage);