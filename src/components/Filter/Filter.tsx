import React, {
    memo,
    useCallback,
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
    Checkbox,
    Stack,
    Chip,
} from "@mui/material";
import {
    LocationOnOutlined,
    ArrowDropDown
} from "@mui/icons-material";
import {
    ILocationModel,
    storeRoute,
    ESearchType,
    defaultPrices,
    defaultArea,
} from 'types';
import { useFilter } from 'hooks';
import PricePopover from './PricePopover';
import AreaPopover from './AreaPopover';
import BedroomPopover from './BedroomPopover';
import DirectionPopover from './DirectionPopover';
import { convertNumberToVNDString, filterPriceText, filterAreaText, filterBedroomText, filterDirectionText } from 'utils/helper';
import { useNavigate } from "react-router-dom";
import createStyle from "./styles";

interface IFilterProps {
    isHomePage?: boolean;
}

const Filter: React.FC<IFilterProps> = ({ isHomePage = false }) => {
    const styles = createStyle();
    const navigate = useNavigate();
    const {
        locations,
        tsearch,
        // price,
        // area,
        updateFilter,
    } = useFilter();

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
                        value={tsearch}
                        onChange={(event, newValue) => {
                            updateFilter({ tsearch: newValue });
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
                <Box sx={{
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
                        // open={true}
                        fullWidth
                        multiple
                        options={storeRoute}
                        autoHighlight
                        freeSolo
                        disableCloseOnSelect
                        defaultValue={[]}
                        clearOnBlur
                        value={locations}
                        renderTags={(selectedOptions, getTagProps) => {
                            const displayedTags = selectedOptions.slice(0, 2); // Display only the first 2 selected items
                            const remainingCount = selectedOptions.length - 2;

                            return (
                                <>
                                    {displayedTags.map((option, index) => (
                                        <Chip
                                            label={option.label}
                                            {...getTagProps({ index })}
                                            key={index}
                                        />
                                    ))}
                                    {remainingCount > 0 && <Chip label={`+${remainingCount} địa điểm`} />}
                                </>
                            );
                        }}
                        onChange={(event, value) => {
                            const selected = value as ILocationModel[];
                            updateFilter({ locations: selected });

                        }}
                        renderOption={(props, option) => (
                            <Box key={option.code}>
                                <Checkbox
                                    style={{ marginRight: 8 }}
                                    checked={locations.some((item) => item.code === option.code)}
                                    onChange={(event, checked) => {
                                        if (checked) {
                                            if (locations.length < 5) {
                                                updateFilter({ locations: [...locations, option] });
                                            }
                                        } else {
                                            updateFilter({ locations: locations.filter((item) => item.code !== option.code) });
                                        }
                                    }}
                                />
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={locations.length === 0 ? 'Nhập quận hoặc dự án. Ví dụ: Quận Tân Phú, Quận Bình Tân' : ''}
                                sx={{
                                    '& fieldset': {
                                        border: 'none'
                                    }
                                }}
                            />
                        )}
                    />
                    <Button
                        sx={{
                            bgcolor: '#C80001',
                            color: '#FFF', textTransform: 'none',
                            width: '120px',
                            height: '35px',
                            my: 'auto'
                        }}
                        onClick={() => {
                            if (locations.length > 0) {
                                const path = locations[locations.length - 1].shortlink;
                                navigate(`/${path}`)
                            }
                        }}>
                        Tìm kiếm
                    </Button>
                </Box>
                <Stack sx={{ mt: '12px' }} direction={'row'} columnGap={2} >
                    <Button
                        sx={styles.buttonFilter}
                        endIcon={<ArrowDropDown />}
                        onClick={(event) => {
                            updateAnchorEl('priceAnchorEl', event.currentTarget);
                        }}
                    >
                        {filterText.priceText}
                    </Button>
                    <Button
                        sx={styles.buttonFilter}
                        endIcon={<ArrowDropDown />}
                        onClick={(event) => {
                            updateAnchorEl('areaAnchorEl', event.currentTarget);
                        }}
                    >
                        {filterText.areaText}
                    </Button>
                    {!isHomePage && (
                        <Button
                            sx={styles.buttonFilter}
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
                            sx={styles.buttonFilter}
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
            <PricePopover
                anchorEl={anchorEl.priceAnchorEl}
                handleOk={(price) => {
                    updateFilter({ price });
                    updateAnchorEl();
                    if (price[0] === defaultPrices.bFromPrice && price[1] === defaultPrices.bToPrice)
                        setFilterText(o => ({ ...o, priceText: filterPriceText }));
                    else setFilterText(o => ({ ...o, priceText: convertNumberToVNDString(price[0]) + ' - ' + convertNumberToVNDString(price[1]) }));

                }}
                handleClose={() => updateAnchorEl()}
            />
            <AreaPopover
                anchorEl={anchorEl.areaAnchorEl}
                handleOk={(area) => {
                    updateFilter({ area });
                    updateAnchorEl();
                    if (area[0] === defaultArea.from && area[1] === defaultArea.to)
                        setFilterText(o => ({ ...o, areaText: filterAreaText }));
                    else setFilterText(o => ({ ...o, areaText: `${area[0]} m²` + ' - ' + `${area[1]} m²` }));

                }}
                handleClose={() => updateAnchorEl()}
            />
            <BedroomPopover
                anchorEl={anchorEl.bedroomAnchorEl}
                handleOk={(area) => {
                    updateFilter({ area });
                    updateAnchorEl();
                    if (area[0] === defaultArea.from && area[1] === defaultArea.to)
                        setFilterText(o => ({ ...o, bedroomText: filterBedroomText }));
                    else setFilterText(o => ({ ...o, bedroomText: filterBedroomText }));

                }}
                handleClose={() => updateAnchorEl()}
            />
            <DirectionPopover
                anchorEl={anchorEl.directionAnchorEl}
                handleOk={(directs) => {
                    updateFilter({ mainDirection: directs });
                    updateAnchorEl();
                    // if (area[0] === defaultArea.from && area[1] === defaultArea.to)
                    //     setFilterText(o => ({ ...o, directionText: filterDirectionText }));
                    // else setFilterText(o => ({ ...o, directionText: filterDirectionText }));

                }}
                handleClose={() => updateAnchorEl()}
            />
        </React.Fragment>
    );
};

export default memo(Filter);

