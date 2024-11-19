import {
    ESearchType,
    EDirection,
    EFurniture,
    ELegal,
    IDistrictItem,
    IWardItem,
    EDemand
} from 'types';

export interface IHouseItem {
    houseid?: number;
    housetype?: string;
    houseno?: string;
    demandtype?: string;
    shortlink?: string;
    projectId?: number;
    projectName?: string;
    streetId?: number;
    streetName?: string;
    wardId?: number;
    wardName?: string;
    districtId?: number;
    districtName?: string;
    cityId?: string;
    address?: string;
    area?: number;
    displayArea?: string;
    price?: number;
    displayPrice?: string;
    bedroom?: number;
    bathroom?: number;
    balcony?: string;
    directionhouse?: EDirection;
    directionbalcony?: EDirection;
    viewhouse?: string;
    furniture?: EFurniture | string;
    legal?: ELegal | string;
    title?: string;
    description?: string;
    sold?: string;
    consigmentname?: string;
    consigmentphone?: string;
    consigmentemail?: string;
    attachments: {
        filename: string;
        filetype: string;
        filedata: File
    }[];
}

export interface IHouseInfo {
    houseid?: number;
    housetype?: string;
    demandtype: EDemand;
    shortlink?: string;
    projectId?: number;
    streetId?: number;
    streetName?: string;
    wardId?: number;
    ward?: IWardItem;
    districtId?: number;
    district?: IDistrictItem;
    cityId?: string;
    address?: string;
    area?: number;
    displayArea?: string;
    price?: number;
    displayPrice?: string;
    bedroom?: number;
    bathroom?: number;
    balcony?: string;
    directionhouse?: EDirection;
    directionbalcony?: EDirection;
    viewhouse?: string;
    furniture?: EFurniture | string;
    legal?: ELegal | string;
    title?: string;
    description?: string;
    sold?: string;
    // filetype: string;
    avatarUrl: string;
}

export const defaultHouseRecord: IHouseItem = {
    houseid: 0,
    housetype: '',
    demandtype: '',
    shortlink: '',
    projectId: undefined,
    projectName: '',
    streetId: undefined,
    wardId: undefined,
    wardName: '',
    districtId: undefined,
    districtName: '',
    cityId: 'SG',
    address: '',
    area: undefined,
    displayArea: '',
    price: undefined,
    displayPrice: '',
    bedroom: 1,
    bathroom: 1,
    balcony: 'N',
    directionhouse: undefined,
    directionbalcony: undefined,
    viewhouse: '',
    furniture: '',
    legal: '',
    title: '',
    description: '',
    sold: 'N',
    consigmentname: '',
    consigmentphone: '',
    consigmentemail: '',
    attachments: []
};

export const houseTypes = [
    { code: 'CH', label: 'Căn hộ', isproject: true },
    { code: 'PH', label: 'Pen house', isproject: true },
    { code: 'SH', label: 'Shop house', isproject: true },
    { code: 'NP', label: 'Nhà mặt phố', isproject: false },
    { code: 'NR', label: 'Nhà riêng', isproject: false }
]

export const houseLegals = [
    { code: 'SH', label: 'Sổ hồng/Sổ đỏ' },
    { code: 'HDMB', label: 'Hợp đồng mua bán', },
    { code: 'CS', label: 'Đang chờ sổ', },
    { code: 'VB', label: 'Vi bằng', },
]

export const houseFurniture = [
    { code: 'D', label: 'Đầy đủ' },
    { code: 'C', label: 'Cơ bản', },
    { code: 'K', label: 'Không nội thất', },
]

export const houseDirections = [
    { code: EDirection.N, label: 'Bắc' },
    { code: EDirection.NE, label: 'Đông Bắc', },
    { code: EDirection.E, label: 'Đông', },
    { code: EDirection.SE, label: 'Đông Nam', },
    { code: EDirection.S, label: 'Nam', },
    { code: EDirection.SW, label: 'Tây Nam', },
    { code: EDirection.W, label: 'Tây', },
    { code: EDirection.NW, label: 'Tây Bắc', },
];

export interface IHouseQuey {
    t?: ESearchType;
    gt?: number;
    gd?: number;
    dt?: number; //area from
    dd?: number; //area to
    p: number; //page
    ps: number; //pagesie
}