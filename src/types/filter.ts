export enum EPrefixPath {
    B = 'ban-can-ho',
    T = 'cho-thue-can-ho'
}
export enum ELocationType {
    D = 'district',
    P = 'project',
}

export enum ESearchType {
    B = 'B',
    T = "T",
}

export enum ELegal {
    SH = 'SH',
    HDMB = "HDMB",
    VB = "VB",
}


export enum EDirection {
    N = 'N',
    S = 'S',
    E = 'E',
    W = 'W',
    NE = 'NE',
    NW = 'NW',
    SE = 'SE',
    SW = 'SW',
}

export enum EFurniture {
    B = 'B',
    F = 'F',
    O = 'O',
}

export const defaultDirection = [
    { id: EDirection.N, value: 12.5, label: 'Bắc', color: '#E8E9EB' },
    { id: EDirection.NE, value: 12.5, label: 'Đông Bắc', color: '#E8E9EB' },
    { id: EDirection.E, value: 12.5, label: 'Đông', color: '#E8E9EB' },
    { id: EDirection.SE, value: 12.5, label: 'Đông Nam', color: '#E8E9EB' },
    { id: EDirection.S, value: 12.5, label: 'Nam', color: '#E8E9EB' },
    { id: EDirection.SW, value: 12.5, label: 'Tây Nam', color: '#E8E9EB' },
    { id: EDirection.W, value: 12.5, label: 'Tây', color: '#E8E9EB' },
    { id: EDirection.NW, value: 12.5, label: 'Tây Bắc', color: '#E8E9EB' },
];

export const defaultPrices = {
    fPrice: 0,
    tPrice: 10000,
};
export const defaultArea = {
    fArea: 0,
    tArea: 150,
};

export interface ILocationModel {
    code: number;
    label: string;
    shortlink: string;
    path: string;
    type?: ELocationType;
}

export const storeRoute: ILocationModel[] = [
    // { code: 'Q1', shortlink: 'ban-can-ho-quan-1', path: 'ban-can-ho/quan-1', label: 'Quận 1', type: ELocationType.D },
    // { code: 'Q3', shortlink: 'ban-can-ho-quan-3', path: 'ban-can-ho/quan-3', label: 'Quận 3', type: ELocationType.D },
    // { code: 'Q4', shortlink: 'ban-can-ho-quan-4', path: 'ban-can-ho/quan-4', label: 'Quận 4', type: ELocationType.D },
    // { code: 'Q5', shortlink: 'ban-can-ho-quan-5', path: 'ban-can-ho/quan-5', label: 'Quận 5', type: ELocationType.D },
    // { code: 'Q6', shortlink: 'ban-can-ho-quan-6', path: 'ban-can-ho/quan-6', label: 'Quận 6', type: ELocationType.D },
    // { code: 'Q7', shortlink: 'ban-can-ho-quan-7', path: 'ban-can-ho/quan-7', label: 'Quận 7', type: ELocationType.D },
    // { code: 'Q8', shortlink: 'ban-can-ho-quan-8', path: 'ban-can-ho/quan-8', label: 'Quận 8', type: ELocationType.D },
    // { code: 'Q10', shortlink: 'ban-can-ho-quan-10', path: 'ban-can-ho/quan-10', label: 'Quận 10', type: ELocationType.D },
    // { code: 'Q11', shortlink: 'ban-can-ho-quan-11', path: 'ban-can-ho/quan-11', label: 'Quận 11', type: ELocationType.D },
    // { code: 'Q12', shortlink: 'ban-can-ho-quan-12', path: 'ban-can-ho/quan-12', label: 'Quận 12', type: ELocationType.D },
    // { code: 'TD', shortlink: 'ban-can-ho-thanh-pho-thu-đuc', path: 'ban-can-ho/thanh-pho-thu-đuc', label: 'Thành phố Thủ Đức', type: ELocationType.D },
    // { code: 'BT', shortlink: 'ban-can-ho-quan-binh-tan', path: 'ban-can-ho/quan-binh-tan', label: 'Quận Bình Tân', type: ELocationType.D },
    // { code: 'BH', shortlink: 'ban-can-ho-quan-binh-thanh', path: 'ban-can-ho/quan-binh-thanh', label: 'Quận Bình Thạnh', type: ELocationType.D },
    // { code: 'GV', shortlink: 'ban-can-ho-quan-go-vap', path: 'ban-can-ho/quan-go-vap', label: 'Quận Gò Vấp', type: ELocationType.D },
    // { code: 'PN', shortlink: 'ban-can-ho-quan-phu-nhuan', path: 'ban-can-ho/quan-phu-nhuan', label: 'Quận Phú Nhuận', type: ELocationType.D },
    // { code: 'TB', shortlink: 'ban-can-ho-quan-tan-binh', path: 'ban-can-ho/quan-tan-binh', label: 'Quận Tân Bình', type: ELocationType.D },
    // { code: 'TP', shortlink: 'ban-can-ho-quan-tan-phu', path: 'ban-can-ho/quan-tan-phu', label: 'Quận Tân Phú', type: ELocationType.D },
    // { code: 'BC', shortlink: 'ban-can-ho-huyen-binh-chanh', path: 'ban-can-ho/huyen-binh-chanh', label: 'Quận Bình Chánh', type: ELocationType.D },
    // { code: 'CG', shortlink: 'ban-can-ho-huyen-can-gio', path: 'ban-can-ho/huyen-can-gio', label: 'Huyện Cần Giờ', type: ELocationType.D },
    // { code: 'CC', shortlink: 'ban-can-ho-huyen-cu-chi', path: 'ban-can-ho/huyen-cu-chi', label: 'Huyện Củ Chi', type: ELocationType.D },
    // { code: 'HM', shortlink: 'ban-can-ho-huyen-hoc-mon', path: 'ban-can-ho/huyen-hoc-mon', label: 'Huyện Hóc Môn', type: ELocationType.D },
    // { code: 'NB', shortlink: 'ban-can-ho-huyen-nha-be', path: 'ban-can-ho/huyen-nha-be', label: 'Huyện Nhà Bè', type: ELocationType.D },
    { code: 1, shortlink: 'ban-can-ho-diamond-alnata-plus-celadon-city', path: 'ban-can-ho/diamond-alnata-plus-celadon-city', label: 'Diamond Alnata Plus - Celadon City', type: ELocationType.P },
    { code: 2, shortlink: 'ban-can-ho-ruby-celadon-city', path: 'ban-can-ho/ruby-celadon-city', label: 'Ruby - Celadon City', type: ELocationType.P },
    { code: 3, shortlink: 'ban-can-ho-emerald-celadon-city', path: 'ban-can-ho/emerald-celadon-city', label: 'Emerald - Celadon City', type: ELocationType.P },
    { code: 4, shortlink: 'ban-can-ho-diamond-alnata', path: 'ban-can-ho/diamond-alnata', label: 'Diamond Alnata', type: ELocationType.P },
    { code: 5, shortlink: 'ban-can-ho-diamond-brilliant', path: 'ban-can-ho/diamond-brilliant', label: 'Diamond Brilliant', type: ELocationType.P },
    { code: 6, shortlink: 'ban-can-ho-res-green-tower', path: 'ban-can-ho/res-green-tower', label: 'Res Green Tower', type: ELocationType.P },
    { code: 7, shortlink: 'ban-can-ho-carillon-7', path: 'ban-can-ho/carillon-7', label: 'Carillon 7', type: ELocationType.P },
    { code: 8, shortlink: 'ban-can-ho-chung-cu-khuong-viet', path: 'ban-can-ho/chung-cu-khuong-viet', label: 'Chung cư Khuông Việt', type: ELocationType.P },
    { code: 9, shortlink: 'ban-can-ho-tanibuilding-son-ky-2', path: 'ban-can-ho/tanibuilding-son-ky-2', label: 'TaniBuilding Sơn Kỳ 2', type: ELocationType.P },
    { code: 10, shortlink: 'ban-can-ho-tanibuilding-son-ky-1', path: 'ban-can-ho/tanibuilding-son-ky-1', label: 'TaniBuilding Sơn Kỳ 1', type: ELocationType.P },
    { code: 11, shortlink: 'ban-can-ho-topaz-garden', path: 'ban-can-ho/topaz-garden', label: 'Topaz Garden', type: ELocationType.P },
    { code: 12, shortlink: 'ban-can-ho-trung-dong-plaza', path: 'ban-can-ho/trung-dong-plaza', label: 'Trung Đông Plaza', type: ELocationType.P },
    { code: 13, shortlink: 'ban-can-ho-tan-huong-tower', path: 'ban-can-ho/tan-huong-tower', label: 'Tân Hương Tower', type: ELocationType.P },
    { code: 14, shortlink: 'ban-can-ho-an-gia-garden', path: 'ban-can-ho/an-gia-garden', label: 'An Gia Garden', type: ELocationType.P },
    { code: 15, shortlink: 'ban-can-ho-investco-babylon', path: 'ban-can-ho/investco-babylon', label: 'Investco Babylon', type: ELocationType.P },
    { code: 16, shortlink: 'ban-can-ho-sacomreal-hoa-binh', path: 'ban-can-ho/sacomreal-hoa-binh', label: 'Sacomreal - Hòa Bình', type: ELocationType.P },
    { code: 17, shortlink: 'ban-can-ho-sai-gon-apartment', path: 'ban-can-ho/sai-gon-apartment', label: 'Sài Gòn Apartment', type: ELocationType.P },
    { code: 18, shortlink: 'ban-can-ho-khu-can-ho-sacomreal-584', path: 'ban-can-ho/khu-can-ho-sacomreal-584', label: 'Khu căn hộ Sacomreal-584', type: ELocationType.P },
    { code: 19, shortlink: 'ban-can-ho-carillon-2', path: 'ban-can-ho/carillon-2', label: 'Carillon 2', type: ELocationType.P },
    { code: 20, shortlink: 'ban-can-ho-can-ho-quang-thai', path: 'ban-can-ho/can-ho-quang-thai', label: 'Căn hộ Quang Thái', type: ELocationType.P },
    { code: 21, shortlink: 'ban-can-ho-khang-gia-tan-huong-lucky-apartment', path: 'ban-can-ho/khang-gia-tan-huong-lucky-apartment', label: 'Khang Gia Tân Hương (Lucky Apartment)', type: ELocationType.P },
    { code: 22, shortlink: 'ban-can-ho-au-co-tower', path: 'ban-can-ho/au-co-tower', label: 'Âu Cơ Tower', type: ELocationType.P },
    { code: 23, shortlink: 'ban-can-ho-cao-oc-dai-thanh', path: 'ban-can-ho/cao-oc-dai-thanh', label: 'Cao ốc Đại Thành', type: ELocationType.P },
    { code: 24, shortlink: 'ban-can-ho-lotus-garden', path: 'ban-can-ho/lotus-garden', label: 'Lotus Garden', type: ELocationType.P },
    { code: 25, shortlink: 'ban-can-ho-valeo-dam-sen', path: 'ban-can-ho/valeo-dam-sen', label: 'Valeo Đầm Sen', type: ELocationType.P },
    { code: 26, shortlink: 'ban-can-ho-carillon-5', path: 'ban-can-ho/carillon-5', label: 'Carillon 5', type: ELocationType.P },
    { code: 27, shortlink: 'ban-can-ho-khu-can-ho-idico-tan-phu', path: 'ban-can-ho/khu-can-ho-idico-tan-phu', label: 'Khu căn hộ IDICO Tân Phú', type: ELocationType.P },
    { code: 28, shortlink: 'ban-can-ho-oriental-plaza-685-au-co', path: 'ban-can-ho/oriental-plaza-685-au-co', label: 'Oriental Plaza 685 Âu Cơ', type: ELocationType.P },
    { code: 29, shortlink: 'ban-can-ho-melody-residences', path: 'ban-can-ho/melody-residences', label: 'Melody Residences', type: ELocationType.P },
    { code: 30, shortlink: 'ban-can-ho-can-ho-8x-dam-sen', path: 'ban-can-ho/can-ho-8x-dam-sen', label: 'Căn hộ 8X Đầm Sen', type: ELocationType.P },
    { code: 31, shortlink: 'ban-can-ho-can-ho-584-lilama-shb', path: 'ban-can-ho/can-ho-584-lilama-shb', label: 'Căn hộ 584 Lilama SHB', type: ELocationType.P },
    { code: 32, shortlink: 'ban-can-ho-phu-thanh-apartment', path: 'ban-can-ho/phu-thanh-apartment', label: 'Phú Thạnh Apartment', type: ELocationType.P },
    { code: 33, shortlink: 'ban-can-ho-chung-cu-khang-phu', path: 'ban-can-ho/chung-cu-khang-phu', label: 'Chung cư Khang Phú', type: ELocationType.P },
    { code: 34, shortlink: 'ban-can-ho-fortuna-vuon-lai', path: 'ban-can-ho/fortuna-vuon-lai', label: 'Fortuna Vườn Lài', type: ELocationType.P },
    { code: 35, shortlink: 'ban-can-ho-can-ho-rich-star', path: 'ban-can-ho/can-ho-rich-star', label: 'Căn hộ Rich Star', type: ELocationType.P },
    { code: 36, shortlink: 'ban-can-ho-chung-cu-an-binh', path: 'ban-can-ho/chung-cu-an-binh', label: 'Chung cư An Bình', type: ELocationType.P },
];

export const breadcrumbNameMap = {
    'ban-can-ho': 'Bán căn hộ',
    // 'ban-can-ho-quan-1': 'Quận 1',
};

export interface ISuggestSearchParam {
    keyword: string;
    districtId?: number;
}
export interface IDistrictParam {
    cityId: string;
}
export interface IWardParam {
    districtId: number;
}

export interface IStreetParam {
    wardId: string;
}

export interface IProjectParam {
    districtId: number;
    wardId?: number;
}

export interface ILocationItem {
    locationId: number | null;
    locationname: string;
    matchname?: string;
    shortlink?: string;
    categoryId?: number;
    projectId?: number;
    project: {
        projectname: string;
    }
    streetId?: number;
    street: {
        streetname: string;
    }
    wardId?: number;
    ward: {
        wardname: string;
    },
    districtId: number;
    district: {
        districtname: string;
    }
    cityId?: string;
    locationlevel?: number;
}

export interface IDistrictItem {
    districtId: number;
    districtname: string;
    cityId: string;
}

export interface IWardItem {
    wardId: number;
    wardname: string;
    districtId: string;
}

export interface IStreetItem {
    streetId: number;
    streetname: string;
    ward: string;
}

export interface IProjectItem {
    projectId: number,
    projectname: string,
    cityId: string,
    districtId: number,
    wardId: number,
    streetId: number,
}

export interface ILocationParam {
    keyword: string;
    projectId?: number;
    districtId?: number;
}