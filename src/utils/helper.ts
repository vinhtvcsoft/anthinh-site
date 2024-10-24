export const convertNumberToVNDString = (num: number) => {
    if (num < 1000) {
        return `${num} triệu`;
    } else {
        const x = num % 1000;
        return x !== 0 ? `${(num / 1000).toFixed(1)} tỷ` : `${num / 1000} tỷ`;
    }
};

export const filterPriceText = 'Mức giá';
export const filterAreaText = 'Diện tích';
export const filterBedroomText = 'Số phòng ngủ';
export const filterDirectionText = 'Hướng nhà';