export default () => {
  return {
    appBarText: {
      // ml: "28px",
      color: "#2C2C2C",
      fontSize: "14px",
      fontWeight: 600,
      textTransform: "none",
      borderBottom: "2px solid white",
      borderRadius: 0,
      '&:hover': {
        borderBottom: "2px solid #C80001",
      },
    },
    'appBarText-select': {
      borderBottom: "2px solid #C80001",
    }
  };
};
