import {
    locations as locationsSel,
    districts as districtsSel,
    wards as wardsSel,
    streets as streetsSel,
    projects as projectsSel,
} from 'store/location/selector';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationRequest, getDistrictRequest, getWardRequest, getStreetRequest, getProjectRequest, } from 'store/location/reducer';
import { ILocationParam, IDistrictParam, IWardParam, IStreetParam, IProjectParam } from 'types';

export function useLocation() {
    const dispatch = useDispatch();
    const locations = useSelector(locationsSel);
    const districts = useSelector(districtsSel);
    const wards = useSelector(wardsSel);
    const streets = useSelector(streetsSel);
    const projects = useSelector(projectsSel);

    const getLocation = (params: ILocationParam) => {
        dispatch(getLocationRequest({ params }));
    };

    const getDistrict = (params: IDistrictParam) => {
        dispatch(getDistrictRequest({ params }));
    };

    const getWard = (params: IWardParam) => {
        dispatch(getWardRequest({ params }));
    };

    const getStreet = (params: IStreetParam) => {
        dispatch(getStreetRequest({ params }));
    };

    const getProject = (params: IProjectParam) => {
        dispatch(getProjectRequest({ params }));
    };

    return {
        locations,
        districts,
        wards,
        streets,
        projects,
        getLocation,
        getDistrict,
        getWard,
        getStreet,
        getProject,
    }
}