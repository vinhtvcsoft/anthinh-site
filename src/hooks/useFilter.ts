import { updFilterRequest } from 'store/filter/reducer';
import {
    locations as locationsSel,
    tsearch as tsearchSel,
    price as priceSel,
    area as areaSel,
    bedroom as bedroomSel,
    mainDirection as mainDirectionSel,
    balconyDirection as balconyDirectionSel
} from 'store/filter/selector';
import { useDispatch, useSelector } from 'react-redux';
import { ESearchType, ILocationModel, EDirection } from 'types';

export function useFilter() {
    const dispatch = useDispatch();
    const locations = useSelector(locationsSel);
    const tsearch = useSelector(tsearchSel);
    const price = useSelector(priceSel);
    const area = useSelector(areaSel);
    const bedroom = useSelector(bedroomSel);
    const mainDirection = useSelector(mainDirectionSel);
    const balconyDirection = useSelector(balconyDirectionSel);

    const updateFilter = (data: {
        locations?: ILocationModel[],
        tsearch?: ESearchType,
        price?: number[],
        area?: number[],
        bedroom?: number[],
        mainDirection?: EDirection[]
        balconyDirection?: EDirection[]
    }) => {
        dispatch(updFilterRequest(data));
    };

    return {
        locations,
        tsearch,
        price,
        area,
        bedroom,
        mainDirection,
        balconyDirection,
        updateFilter,
    }
}