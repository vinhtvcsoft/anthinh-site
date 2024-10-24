import React, {
    memo,
    useMemo
} from 'react';
import {
    Breadcrumbs as MuiBreadcrumbs,
    Typography,
    Link,
    Box
} from '@mui/material';
import {
    storeRoute,
    breadcrumbNameMap
} from 'types';
import { useLocation, Link as LinkRoute } from 'react-router-dom';
import { useFilter } from 'hooks';

// function handleClick(event) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }

const Breadcrumbs: React.FC = () => {
    const path = useLocation().pathname.substring(1);
    const { locations } = useFilter();

    const breadcrumbPath = useMemo(() => {
        let route = '';

        if (path === 'ban-can-ho') route = 'ban-can-ho/ho-chi-minh';
        else {
            if (locations.length > 1) {
                if (path.indexOf('ban-can-ho') !== -1) {
                    route = 'ban-can-ho/ho-chi-minh';
                }
            }
            else {
                const r = storeRoute.find((v) => {
                    if (v.shortlink === path) return v;
                });
                if (r) route = r.path;
            }
        }
        return route.split('/');
    }, [path, locations]);
    return (
        <Box role="presentation"
        // onClick={handleClick}
        >
            <MuiBreadcrumbs aria-label="breadcrumb">
                {breadcrumbPath.map((value, index) => {
                    const last = index === breadcrumbPath.length - 1;
                    const to = `/${breadcrumbPath.slice(0, index + 1).join('-')}`;
                    const text = `${breadcrumbPath.slice(0, index + 1).join('-')}`;

                    return last ? (
                        <Typography color='text.primary' key={to}>
                            {breadcrumbNameMap[text as keyof typeof breadcrumbNameMap] || value}
                        </Typography>
                    ) : (
                        <Link sx={{
                            color: '#AAAAAA',
                            textDecoration: 'none',
                            cursor: 'pointer !important',
                            '&:hover': {
                                color: 'text.primary',
                            }
                        }} component={LinkRoute} to={to} key={to}>
                            {breadcrumbNameMap[text as keyof typeof breadcrumbNameMap] || value}
                        </Link>
                    );
                })}
            </MuiBreadcrumbs>

        </Box>
    );
};

export default memo(Breadcrumbs);