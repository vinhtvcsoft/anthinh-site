import React from "react";
import { AppBar, Footer } from "components";
import {
  Box
} from "@mui/material";
import { Routes, Route } from 'react-router-dom'
import { Home, ListCard } from "pages";
import { storeRoute } from 'types'


function App() {

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar />
      <Box sx={{
        flexGrow: 1,
        mt: '80px'

      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ban-can-ho" element={<ListCard />} />
          <Route path="/cho-thue-can-ho" element={<div>căn hộ cho thuê</div>} />
          <Route path="/tin-tuc" element={<div>tin tức</div>} />
          <Route path="/tien-ich" element={<div>tiện ích</div>} />
          <Route path="/lien-he" element={<div>liên hệ</div>} />

          {storeRoute.map((location) => (
            <Route key={location.code}
              path={`/${location.shortlink}`}
              element={<ListCard />}
            />))}
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
