import React, {
    memo,
    useCallback,
    useEffect,
    useRef,
    // useEffect,
    useState,
} from "react";
import {
    Tabs,
    Tab,
    Button,
    Box,
    TextField,
    Autocomplete,
    // Checkbox,
    Stack,
    Chip,
    Typography,
} from "@mui/material";
import {
    LocationOnOutlined,
    ArrowDropDown
} from "@mui/icons-material";
import {
    ILocationItem,
    ESearchType,
    defaultPrices,
    defaultArea,
    defaultDirection
} from 'types';
import { useFilter } from 'hooks';
import PricePopover from './PricePopover';
import AreaPopover from './AreaPopover';
import BedroomPopover from './BedroomPopover';
import DirectionPopover from './DirectionPopover';
import { convertNumberToVNDString, filterPriceText, filterAreaText, filterBedroomText, filterDirectionText } from 'utils/helper';
import { debounce } from 'utils/helper';
import { Apartment } from '@mui/icons-material';
import { defaultStyles } from 'theme/themes'
import createStyle from "./styles";

interface IFilterProps {
    isHomePage?: boolean;
}

const Filter: React.FC<IFilterProps> = ({ isHomePage = false }) => {
    const styles = createStyle();
    const {
        locations,
        tsearch,
        price,
        area,
        bedroom,
        mainDirection,
        updateFilter,
        suggest,
        options,
    } = useFilter();
    const { fArea, tArea } = defaultArea;
    const { fPrice, tPrice } = defaultPrices;
    const [demand, setDemand] = useState(tsearch ?? ESearchType.B);
    const [locationSelected, setLocationSelected] = useState<ILocationItem[]>(locations);

    const searchBoxRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState<{
        priceAnchorEl: HTMLElement | null,
        areaAnchorEl: HTMLElement | null,
        bedroomAnchorEl: HTMLElement | null,
        directionAnchorEl: HTMLElement | null,
    }>({
        priceAnchorEl: null,
        areaAnchorEl: null,
        bedroomAnchorEl: null,
        directionAnchorEl: null,
    });
    const [filterText, setFilterText] = useState<{
        priceText: string,
        areaText: string,
        bedroomText: string,
        directionText: string,
    }>({
        priceText: filterPriceText,
        areaText: filterAreaText,
        bedroomText: filterBedroomText,
        directionText: filterDirectionText,
    });

    const handleSuggestChange = (keyword: string) => {
        if (keyword && keyword !== '') {
            suggest({ keyword });
        }
    };

    const debouncedHandleSuggestChange = debounce(handleSuggestChange, 700);

    const updateAnchorEl = useCallback((name?: 'priceAnchorEl' | 'areaAnchorEl' | 'bedroomAnchorEl' | 'directionAnchorEl', anchorEl?: HTMLElement | null) => {
        if (name && anchorEl) {
            setAnchorEl({
                priceAnchorEl: null,
                areaAnchorEl: null,
                bedroomAnchorEl: null,
                directionAnchorEl: null,
                [name]: anchorEl,
            });
        }
        else {
            setAnchorEl({
                priceAnchorEl: null,
                areaAnchorEl: null,
                bedroomAnchorEl: null,
                directionAnchorEl: null,
            });
        }
    }, []);

    const handleToggleDropDown = useCallback(
        (v?: boolean) => () => {
            setOpen((isO) => v ?? !isO);
        },
        []
    );

    useEffect(() => {
        setLocationSelected(locations);

        if (price[0] === fPrice && price[1] === tPrice) {
            setFilterText(o => ({ ...o, priceText: filterPriceText }));
        }
        else {
            setFilterText(o => ({ ...o, priceText: convertNumberToVNDString(price[0]) + ' - ' + convertNumberToVNDString(price[1]) }));
        }

        if (area[0] === fArea && area[1] === tArea) {
            setFilterText(o => ({ ...o, areaText: filterAreaText }));
        }
        else {
            setFilterText(o => ({ ...o, areaText: `${area[0]} m²` + ' - ' + `${area[1]} m²` }))
        }

        if (bedroom.length > 0) {
            setFilterText(o => ({ ...o, bedroomText: `${bedroom.join(', ')} phòng ngủ` }));
        }
        else {
            setFilterText(o => ({ ...o, bedroomText: filterBedroomText }));
        }
        if (mainDirection.length > 0) {
            setFilterText(o => ({ ...o, directionText: `${mainDirection.map(f => defaultDirection.find(v => v.id === f)?.label).join(', ')}` }));
        }
        else {
            setFilterText(o => ({ ...o, directionText: filterDirectionText }));
        }
    }, [locations, price, area, bedroom, mainDirection]);


    return (
        <React.Fragment>
            <Box
                sx={{
                    borderRadius: "8px 8px 0px 0px",
                    width: "180px",
                    display: "flex",
                    background: "white",
                }}>
                {isHomePage && (
                    <Tabs
                        value={demand}
                        onChange={(event, newValue) => {
                            setDemand(newValue);
                            // updateFilter({ tsearch: newValue });
                        }}
                        aria-label="basic tabs example"
                        sx={{
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#C80001",
                            },
                        }}>
                        <Tab
                            sx={styles.tab}
                            label="Bán"
                            value={ESearchType.B}
                        />
                        <Tab
                            sx={styles.tab}
                            label="Cho thuê"
                            value={ESearchType.T}
                        />
                    </Tabs>
                )}
            </Box>
            <Box

                sx={{
                    borderRadius: "0px 8px 8px 8px",
                    ...isHomePage ? { p: '32px' } : {},
                    backgroundColor: "#FFF",
                }}>
                <Box
                    id='searchbox-ref'
                    ref={searchBoxRef}
                    sx={{
                        display: 'flex',
                        flex: 1,
                        border: isHomePage ? '1px solid #2C2C2C' : '1px solid #F2F2F2',
                        borderRadius: '8px',
                        px: '12px',
                        backgroundColor: isHomePage ? '#FFF' : '#F2F2F2',
                    }}>
                    <LocationOnOutlined sx={{ fontSize: '32px', color: '#636363', my: 'auto' }} />
                    <Autocomplete
                        id="search-field"
                        open={open}
                        fullWidth
                        multiple
                        options={options}
                        disableClearable
                        autoHighlight
                        freeSolo
                        onClose={handleToggleDropDown(false)}
                        onOpen={handleToggleDropDown(true)}
                        // isOptionEqualToValue={(option: ILocationItem, value: ILocationItem) => option.locationId === value.locationId}
                        defaultValue={[]}
                        clearOnBlur
                        value={locationSelected}
                        slotProps={{
                            paper: {
                                sx: {
                                    mt: '5px',
                                    p: 2
                                }
                            }
                        }}
                        getOptionLabel={(option: string | ILocationItem) => typeof option === 'string' ? option : option.locationname}
                        renderTags={(selectedOptions, getTagProps) => {
                            const displayedTags = selectedOptions.slice(0, 2); // Display only the first 2 selected items
                            const remainingCount = selectedOptions.length - 2;
                            return (
                                <>
                                    {displayedTags.map((option, index) => (
                                        <Chip
                                            label={(selectedOptions[index] as ILocationItem)?.matchname}
                                            {...getTagProps({ index })}
                                            key={index}
                                        />
                                    ))}
                                    {remainingCount > 0 && <Chip label={`+${remainingCount} địa điểm`} />}
                                </>
                            );
                        }}
                        onChange={(event, value) => {
                            const selected = value as ILocationItem[];
                            // updateFilter({ locations: selected });
                            setLocationSelected(selected);

                        }}
                        renderOption={(props, option) => {
                            const locationId = (option as ILocationItem).locationId;
                            const locationname = (option as ILocationItem).locationname;
                            return (
                                <Stack
                                    key={locationId}
                                    direction={'row'}
                                    p={1}
                                    columnGap={1}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#F2F2F2',
                                        }
                                    }}
                                    onClick={() => {
                                        if (locationSelected.filter((item) => item.locationId === locationId).length === 0) {
                                            if (locationSelected.length < 5) {
                                                // updateFilter({ locations: [...locations, { ...option as ILocationItem }] });
                                                setLocationSelected(old => [...old, { ...option as ILocationItem }]);
                                            }
                                            else
                                                // updateFilter({ locations: locations.filter((item) => item.locationId !== locationId) });
                                                setLocationSelected(old => old.filter((item) => item.locationId !== locationId));
                                            setOpen(false);
                                        }


                                    }}
                                >
                                    <Apartment></Apartment>
                                    <Typography>{locationname}</Typography>
                                </Stack>
                            )
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={locationSelected.length === 0 ? 'Nhập tên dự án. Ví dụ: Carillon 7, Lotus Garden' : ''}
                                sx={{
                                    '& fieldset': {
                                        border: 'none'
                                    }
                                }}
                                onChange={(event) => {
                                    debouncedHandleSuggestChange(event.target.value);
                                }}
                            />
                        )}
                    />
                    <Button
                        sx={{
                            ...defaultStyles.btnPrimary,
                            borderRadius: '5px',
                            width: '120px',
                            height: '35px',
                            fontWeight: 'unset',
                            my: 'auto'
                        }}
                        onClick={() => {
                            if (demand) {
                                updateFilter({ locations: locationSelected, tsearch: demand });
                            }
                        }}>
                        Tìm kiếm
                    </Button>
                </Box>
                <Stack sx={{ mt: '12px' }} direction={'row'} columnGap={2} >
                    <Button
                        sx={{
                            ...styles.buttonFilter,
                            ...filterText.priceText === filterPriceText ? { color: 'rgb(13,16,17,0.5) !important' } : {}
                        }}
                        endIcon={<ArrowDropDown />}
                        onClick={(event) => {
                            updateAnchorEl('priceAnchorEl', event.currentTarget);
                        }}
                    >
                        {filterText.priceText}
                    </Button>
                    <Button
                        sx={{
                            ...styles.buttonFilter,
                            ...filterText.areaText === filterAreaText ? { color: 'rgb(13,16,17,0.5) !important' } : {}
                        }}
                        endIcon={<ArrowDropDown />}
                        onClick={(event) => {
                            updateAnchorEl('areaAnchorEl', event.currentTarget);
                        }}
                    >
                        {filterText.areaText}
                    </Button>
                    {!isHomePage && (
                        <Button
                            sx={{
                                ...styles.buttonFilter,
                                ...filterText.bedroomText === filterBedroomText ? { color: 'rgb(13,16,17,0.5) !important' } : {}
                            }}
                            endIcon={<ArrowDropDown />}
                            onClick={(event) => {
                                updateAnchorEl('bedroomAnchorEl', event.currentTarget);
                            }}
                        >
                            {filterText.bedroomText}
                        </Button>
                    )}
                    {!isHomePage && (
                        <Button
                            sx={{
                                ...styles.buttonFilter,
                                ...filterText.directionText === filterDirectionText ? { color: 'rgb(13,16,17,0.5) !important' } : {}
                            }}
                            endIcon={<ArrowDropDown />}
                            onClick={(event) => {
                                updateAnchorEl('directionAnchorEl', event.currentTarget);
                            }}
                        >
                            {filterText.directionText}
                        </Button>
                    )}
                </Stack>
            </Box>
            {anchorEl.priceAnchorEl != null && (
                <PricePopover
                    anchorEl={anchorEl.priceAnchorEl}
                    handleOk={(values) => {
                        updateFilter({ price: values });
                        updateAnchorEl();
                    }}
                    handleClose={() => {
                        updateFilter({ price });
                        updateAnchorEl()
                    }
                    }
                />
            )}
            <AreaPopover
                anchorEl={anchorEl.areaAnchorEl}
                handleOk={(values) => {
                    updateFilter({ area: values });
                    updateAnchorEl();

                }}
                handleClose={() => updateAnchorEl()}
            />
            <BedroomPopover
                anchorEl={anchorEl.bedroomAnchorEl}
                handleOk={(values) => {
                    updateFilter({ bedroom: values });
                    updateAnchorEl();
                }}
                handleClose={() => updateAnchorEl()}
            />
            <DirectionPopover
                anchorEl={anchorEl.directionAnchorEl}
                handleOk={(values) => {
                    updateFilter({ mainDirection: values });
                    updateAnchorEl();
                }}
                handleClose={() => updateAnchorEl()}
            />
        </React.Fragment>
    );
};

export default memo(Filter);

