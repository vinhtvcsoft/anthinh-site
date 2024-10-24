/** @format */
const themes = {
  typography: {
    fontFamily: `"Lexend", "Roboto", "Helvetica", "Arial", sans-serif`,
    color: '#181A20',
  },

  components: {
    // Inputs
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: '#2C2C2C',
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: '#2C2C2C',
            },
          }
        },
      }
    }
  }

};
// const themes = {
//   MAIN: {
//     // palette: {
//     //   primary: {
//     //     main: "#1976D2",
//     //   },
//     // },
//   },
// };
const defaultStyle = {
  textField: {
    '&:hover fieldset': {
      borderColor: '#2C2C2C !important'
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#2C2C2C !important'
      },
    }
  }
}
export { themes, defaultStyle };
