import {
    error as errorSel,
    loading as loadingSel,
    saving as savingSel,
    houseData,
    houseCount,
} from 'store/house/selector';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, getHouseRequest } from 'store/house/reducer';
import { IHouseItem, IHouseQuey } from 'types';

export function useHouse() {
    const dispatch = useDispatch();
    const error = useSelector(errorSel);
    const loading = useSelector(loadingSel);
    const saving = useSelector(savingSel);
    const houseRecords = useSelector(houseData);
    const totalHouse = useSelector(houseCount);

    const get = (params: IHouseQuey) => {
        dispatch(getHouseRequest({ params }));
    };

    const add = (data: IHouseItem) => {
        dispatch(addRequest({ data }));
    };

    return {
        error,
        loading,
        saving,
        houseRecords,
        totalHouse,
        get,
        add,
    }
}