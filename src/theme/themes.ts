/** @format */
const themes = {
  typography: {
    fontFamily: `"Lexend", "Roboto", "Helvetica", "Arial", sans-serif`,
    color: '#0D1011',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-text': {
            textTransform: 'none',
            color: '#0D1011',
          }
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: '#2C2C2C',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#C80001',
          },
          "& .MuiInputBase-root.Mui-focused fieldset": {
            borderColor: '#C80001',
          },
          '& .Mui-disabled': {
            backgroundColor: '#F5F5F5',
          }
        },
      }
    }
  }
};

const defaultStyles = {
  btn: {
    textTransform: 'none',
    borderRadius: '16px',
    backgroundColor: 'white',
    border: '1px solid #2C2C2C',
    color: '#2C2C2C',
    '&:hover, &.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: '#C80001',
      color: '#FFF',
      border: 'none',
    }
  },
  btnPrimary: {
    textTransform: 'none',
    borderRadius: '16px',
    backgroundColor: '#C80001',
    fontWeight: 700,
    color: '#FFF !important',
    border: 'none',
  },
  btnDisabled: {
    textTransform: 'none',
    borderRadius: '16px',
    backgroundColor: '#EFF1F5',
    fontWeight: 700,
    color: '#737D87 !important',
    border: '1px solid #737D87',
  }
}

export { themes, defaultStyles };
