import React, {
  memo,
  useMemo
} from "react";
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { EAppBarButton, } from "./type";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems, ESearchType } from 'types';
import { useFilter } from 'hooks';
import createStyle from "./styles";

const AppBar: React.FC = () => {
  const styles = createStyle();
  const { pathname } = useLocation();
  const { updateFilter } = useFilter();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const buttons = useMemo(
    () => [
      { key: EAppBarButton.SALES, value: "Bán" },
      { key: EAppBarButton.RENT, value: "Cho thuê" },
      { key: EAppBarButton.NEWS, value: "Tin tức" },
      { key: EAppBarButton.UTILITIES, value: "Tiện ích" },
      { key: EAppBarButton.CONTACT, value: "Liên hệ" },
    ],
    []
  );

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        boxShadow: pathname === '/' ? 'unset' : '0 3px 5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar
        disableGutters
        sx={{ px: "15px !important", py: "17px", backgroundColor: "white" }}>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(event) => {
              setAnchorElNav(event.currentTarget);
            }}
            color="inherit">
            <MenuIcon sx={{ color: "#C80001" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={() => {
              setAnchorElNav(null);
            }}
            sx={{ display: { xs: "block", md: "none" } }}>
            {buttons.map((button) => (
              <MenuItem
                key={button.key}
                onClick={() => {
                  setAnchorElNav(null);
                }}>
                <Typography sx={{ textAlign: "center" }}>
                  {button.value}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ mx: { xs: "auto", md: "0" }, cursor: 'pointer' }} onClick={() => {
          navigate('/');
        }}>
          <img height={"40px"} src="/logo.png" />
        </Box>
        <Stack
          sx={{ display: { xs: "none", md: "inherit" } }}
          justifyContent={"center"}
          direction={'row'}
          columnGap={{ xs: 0, md: 6 }}
          flex={1}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              sx={{ ...styles.appBarText, ...(pathname === item.to ? styles['appBarText-select'] : {}) }}
              onClick={() => {
                navigate(item.to);
                if (item.id === 'bancanho' || item.id === 'chothuecanho') {
                  updateFilter({ tsearch: item.id === 'bancanho' ? ESearchType.B : ESearchType.T });
                }
              }}
            >{item.label}</Button>
          ))}
        </Stack>
        <Button
          variant="contained"
          sx={{
            width: '140px',
            textTransform: "none",
            backgroundColor: "#C80001",
            fontWeight: 600,
          }}>
          Ký gửi căn hộ
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
};

export default memo(AppBar);
