export enum ELocationType {
    D = 'district',
    P = 'project',
}

export enum ESearchType {
    B = 'B',
    T = "T",
}

export enum EDirection {
    'N' = 'N',
    'S' = 'S',
    'E' = 'E',
    'W' = 'W',
    'NE' = 'NE',
    'NW' = 'NW',
    'SE' = 'SE',
    'SW' = 'SW',
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
    bFromPrice: 0,
    bToPrice: 10000,
    tFromPrice: 0,
    tToPrice: 50
};
export const defaultArea = {
    from: 0,
    to: 150,
};

export interface ILocationModel {
    code: string;
    label: string;
    shortlink: string;
    path: string;
    type?: ELocationType;
}

export const storeRoute: ILocationModel[] = [
    { code: 'Q1', shortlink: 'ban-can-ho-quan-1', path: 'ban-can-ho/quan-1', label: 'Quận 1', type: ELocationType.D },
    { code: 'Q3', shortlink: 'ban-can-ho-quan-3', path: 'ban-can-ho/quan-3', label: 'Quận 3', type: ELocationType.D },
    { code: 'Q4', shortlink: 'ban-can-ho-quan-4', path: 'ban-can-ho/quan-4', label: 'Quận 4', type: ELocationType.D },
    { code: 'Q5', shortlink: 'ban-can-ho-quan-5', path: 'ban-can-ho/quan-5', label: 'Quận 5', type: ELocationType.D },
    { code: 'Q6', shortlink: 'ban-can-ho-quan-6', path: 'ban-can-ho/quan-6', label: 'Quận 6', type: ELocationType.D },
    { code: 'Q7', shortlink: 'ban-can-ho-quan-7', path: 'ban-can-ho/quan-7', label: 'Quận 7', type: ELocationType.D },
    { code: 'Q8', shortlink: 'ban-can-ho-quan-8', path: 'ban-can-ho/quan-8', label: 'Quận 8', type: ELocationType.D },
    { code: 'Q10', shortlink: 'ban-can-ho-quan-10', path: 'ban-can-ho/quan-10', label: 'Quận 10', type: ELocationType.D },
    { code: 'Q11', shortlink: 'ban-can-ho-quan-11', path: 'ban-can-ho/quan-11', label: 'Quận 11', type: ELocationType.D },
    { code: 'Q12', shortlink: 'ban-can-ho-quan-12', path: 'ban-can-ho/quan-12', label: 'Quận 12', type: ELocationType.D },
    { code: 'TD', shortlink: 'ban-can-ho-thanh-pho-thu-đuc', path: 'ban-can-ho/thanh-pho-thu-đuc', label: 'Thành phố Thủ Đức', type: ELocationType.D },
    { code: 'BT', shortlink: 'ban-can-ho-quan-binh-tan', path: 'ban-can-ho/quan-binh-tan', label: 'Quận Bình Tân', type: ELocationType.D },
    { code: 'BH', shortlink: 'ban-can-ho-quan-binh-thanh', path: 'ban-can-ho/quan-binh-thanh', label: 'Quận Bình Thạnh', type: ELocationType.D },
    { code: 'GV', shortlink: 'ban-can-ho-quan-go-vap', path: 'ban-can-ho/quan-go-vap', label: 'Quận Gò Vấp', type: ELocationType.D },
    { code: 'PN', shortlink: 'ban-can-ho-quan-phu-nhuan', path: 'ban-can-ho/quan-phu-nhuan', label: 'Quận Phú Nhuận', type: ELocationType.D },
    { code: 'TB', shortlink: 'ban-can-ho-quan-tan-binh', path: 'ban-can-ho/quan-tan-binh', label: 'Quận Tân Bình', type: ELocationType.D },
    { code: 'TP', shortlink: 'ban-can-ho-quan-tan-phu', path: 'ban-can-ho/quan-tan-phu', label: 'Quận Tân Phú', type: ELocationType.D },
    { code: 'BC', shortlink: 'ban-can-ho-huyen-binh-chanh', path: 'ban-can-ho/huyen-binh-chanh', label: 'Quận Bình Chánh', type: ELocationType.D },
    { code: 'CG', shortlink: 'ban-can-ho-huyen-can-gio', path: 'ban-can-ho/huyen-can-gio', label: 'Huyện Cần Giờ', type: ELocationType.D },
    { code: 'CC', shortlink: 'ban-can-ho-huyen-cu-chi', path: 'ban-can-ho/huyen-cu-chi', label: 'Huyện Củ Chi', type: ELocationType.D },
    { code: 'HM', shortlink: 'ban-can-ho-huyen-hoc-mon', path: 'ban-can-ho/huyen-hoc-mon', label: 'Huyện Hóc Môn', type: ELocationType.D },
    { code: 'NB', shortlink: 'ban-can-ho-huyen-nha-be', path: 'ban-can-ho/huyen-nha-be', label: 'Huyện Nhà Bè', type: ELocationType.D },

];

export const breadcrumbNameMap = {
    'ban-can-ho': 'Bán',
    'ban-can-ho-ho-chi-minh': 'Căn hộ tại các khu vực Hồ Chí Minh',
    'ban-can-ho-quan-1': 'Quận 1',
};