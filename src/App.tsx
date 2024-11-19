import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppBar, Footer } from "components";
import {
  Box
} from "@mui/material";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Home, ListCard, Consigment } from "pages";
import { storeRoute, EPrefixPath, defaultPrices, defaultArea, ESearchType, ILocationItem } from 'types';
import { getLocation } from 'services/api/location'
import { useFilter } from 'hooks';

const concatStr = (oriStr: string, v: string) => {
  if (oriStr === '') return v;
  return oriStr.indexOf('?') === -1 ? `${oriStr}?${v}` : `${oriStr}&${v}`;
};

function App() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const {
    tsearch,
    price,
    area,
    bedroom,
    locations,
    updateFilter
  } = useFilter();
  const refPopstate = useRef(false);

  useEffect(() => {
    if (refPopstate.current === true) {
      refPopstate.current = false;
      return;
    }

    let url = '';
    const { fPrice, tPrice } = defaultPrices;
    const { fArea, tArea } = defaultArea;

    if (tsearch === ESearchType.B) url = EPrefixPath.B;
    else if (tsearch === ESearchType.T) url = EPrefixPath.T;

    if (locations.length > 0) {
      if (locations.length === 1) {
        url += `-${locations[0].shortlink}`;
      }
      else {
        url += `-${locations[0].shortlink}`;
        url += `?ls=${locations.slice(1).map((location) => location.projectId).join(',')}`;
      }
    }

    if (price[0] !== fPrice || price[1] !== tPrice) {
      url = concatStr(url, `gt=${price[0]}`);
      url = concatStr(url, `gd=${price[1]}`);
    }
    if (area[0] !== fArea || area[1] !== tArea) {
      url = concatStr(url, `dt=${area[0]}`);
      url = concatStr(url, `dd=${area[1]}`);
    }
    if (bedroom.length > 0) {
      url = concatStr(url, `pn=${bedroom.join(',')}`);
    }

    // if (pathname === '/' && url === '') return;

    navigate(url);
  }, [price, area, bedroom, locations]);

  const [navigationDirection, setNavigationDirection] = useState<boolean | null>(null); // 'back' or 'forward'
  const [historyIndex, setHistoryIndex] = useState(window.history.state?.idx || 1000);

  useEffect(() => {
    const handlePopState = () => {
      const currentIndex = window.history.state?.idx || 0;
      setNavigationDirection(old => !old);
      refPopstate.current = true;
      setHistoryIndex(currentIndex);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [historyIndex]);

  const parseParamUrl = useCallback((searchText: string) => {
    const params = searchText.substring(1).split('&');
    const locations: number[] = [];
    const obj: any = {
      price: [defaultPrices.fPrice, defaultPrices.tPrice]
    };

    const path = pathname.substring(1);
    const item = storeRoute.find(f => f.shortlink === path);
    if (item) locations.push(item.code);

    if (path.startsWith('ban')) {
      obj.tsearch = ESearchType.B;
    }
    else if (path.startsWith('cho-thue')) {
      obj.tsearch = ESearchType.T;
    }

    Object.keys(params).forEach((key: any) => {
      const [k, v] = params[key].split('=');

      if (k === 'ls') {
        const arrLoc = v.split(',');
        arrLoc.forEach((loc: string) => {
          if (!isNaN(Number(loc))) {
            locations.push(Number(loc));
          }
        });
      }

      if (k === 'gt') {
        obj.price[0] = Number(v);
      }
      if (k === 'gd') {
        obj.price[1] = Number(v);
      }

    });

    if (locations.length > 0) {
      getLocation({ ids: locations }, (rp) => {
        const rs = rp.data;
        if (rs.success && rs.data.length > 0) {
          const items: ILocationItem[] = [];
          locations.forEach((id) => {
            rs.data.length > 0 && items.push(rs.data.find((f: ILocationItem) => f.locationId === id));
          });
          obj.locations = items;

          updateFilter({ ...obj })
        }
      })
    }
    else {
      updateFilter({ ...obj })
    }
  }, [tsearch, price, pathname]);

  useEffect(() => {
    parseParamUrl(location.search);
  }, [navigationDirection]);



  return pathname === '/ky-gui' ?
    (<Consigment />)
    :
    (
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <AppBar />
        <Box sx={{
          flexGrow: 1,
          my: '80px'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ban-can-ho" element={<ListCard />} />
            <Route path="/cho-thue-can-ho" element={<ListCard />} />
            <Route path="/tin-tuc" element={<div>tin tức</div>} />
            <Route path="/tien-ich" element={<div>tiện ích</div>} />
            <Route path="/lien-he" element={<div>liên hệ</div>} />
            {/* <Route path="/ky-gui" element={<Consigment />} /> */}

            {storeRoute.map((location) => (
              <Route key={location.code}
                path={`/${location.shortlink}`}
                element={<ListCard />}
              />))}
          </Routes>
        </Box>
        <Footer />
      </Box>
    )
}

export default App;
