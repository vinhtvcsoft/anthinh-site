import { IHouseItem } from 'types';
import dayjs from "dayjs";

export const emptyGuid = "00000000-0000-0000-0000-000000000000";
export const emptyDate = "1911-01-01";
export const attachPath = "https://localhost:7097/attachments/";

export const convertYMDtoSync = (date: Date | string, _hasTime?: boolean) => {
    if (!date) return "1911-01-01";
    const d = dayjs(date);
    if (d.format("YYYY-MM-DD") === "1911-01-01") return "1911-01-01";
    return d.format("YYYY-MM-DDTHH:mm:ssZ");
};

export const convertNumberToVNDString = (num: number) => {
    if (num < 1000) {
        return `${num} triệu`;
    } else {
        const x = num % 1000;
        return x !== 0 ? `${(num / 1000).toFixed(1)} tỷ` : `${num / 1000} tỷ`;
    }
};


export const numberToVietnameseCurrencyText = (number: number) => {
    const units = ["", "nghìn", "triệu", "tỷ"];

    if (number === 0) return "0 đồng";

    let result = '';
    let unitIndex = 0;

    while (number > 0) {
        const part = number % 1000;
        if (part > 0) {
            result = `${part} ${units[unitIndex]} ${result}`.trim();
        }
        number = Math.floor(number / 1000);
        unitIndex++;
    }

    return `${result} đồng`.trim();
};

export const filterPriceText = 'Mức giá';
export const filterAreaText = 'Diện tích';
export const filterBedroomText = 'Số phòng ngủ';
export const filterDirectionText = 'Hướng nhà';

export const debounce = (func: any, timeout = 300) => {
    let timer: any;
    return function (...args: any) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(debounce, args);
        }, timeout);
    };
};

export const transform2Submit = (
    key: string,
    value: any,
    guidFields?: string[],
    dateFields?: string[]
) => {
    if (guidFields?.includes(key)) {
        return value ? value : emptyGuid;
    } else if (dateFields?.includes(key)) {
        return value ? convertYMDtoSync(value) : emptyDate;
    }
    return value;
};

export const isNullOrEmpty = (value: any) => {
    return value === null || value === undefined || value === '';
}

export const convertString2Base64 = (binaryString: string, type: string) => {
    const binaryData = Uint8Array.from(atob(binaryString), (c) => c.charCodeAt(0));
    const blob = new Blob([binaryData], { type });
    return URL.createObjectURL(blob);
}

export const getHouseTitle = (o: IHouseItem) => {
    return `${o.projectName}, ${o.bedroom}PN, ${o.area}m²`;
};

export const fotmatNumber2 = (
    value: number,
    decimalPlace = 0,
    locale = "en-Us"
) => {
    return value != 0
        ? value.toLocaleString(locale, {
            minimumFractionDigits: decimalPlace,
            maximumFractionDigits: decimalPlace,
        })
        : "0";
};