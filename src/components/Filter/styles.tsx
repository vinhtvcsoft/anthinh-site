export default () => {
    return {
        tab: {
            color: "#2C2C2C",
            textTransform: "none",
            fontWeight: 700,
            "&.Mui-selected": { color: "#C80001" },
        },
        buttonFilter: {
            // color: 'rgba(0, 0, 0, 0.87)',
            border: '1px solid rgba(0, 0, 0, 0.87)',
            textTransform: 'none',
            minWidth: '120px',
            fontWeight: 700,
        },
        formLabelPopover: {
            m: 0,
            width: '100%',
            '& .MuiTypography-root ': {
                flex: 1,
                fontSize: '14px'
            }
        },
        formLabel: {
            fontSize: '14px',
            fontWeight: 700,
        },
        textfieldPopver: {
            mt: '5px',
            '& input': {
                p: '8px',
                fontSize: '14px'
            },
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                display: 'none'
            },
            '& input[type=number]': {
                MozAppearance: 'textfield'
            },
        },
        bedroomBtn: {
            backgroundColor: '#E8E9EB',
            color: '#181A20 !important',
            '&:hover': {
                backgroundColor: '#E8E9EB',
                color: '#181A20 !important',
            }
        },
        bedroomBtnClicked: {
            backgroundColor: '#C80001',
            color: '#FFF !important',
        }

    };
};
