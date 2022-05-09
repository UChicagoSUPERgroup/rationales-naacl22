import { createMuiTheme } from "@material-ui/core";

/**
 * This is where the styles for all material components go
 * All regular html elements are styled by the css for the respective component
 *
 * All of the material components are referenced by the className (which should be a string)
 *
 * Each component has it's own Mui object, and a root object inside, thats where you reference the component
 *
 * Example:
 *
 * //References App Bars, for every component, there is a MuiComponentName object
 * MuiAppBar: {
 * //Root object
 *  root: {
 *  // class names are referenced by '&.className' which is
 *  // akin to 'element.className' within a css file css
 *  '&.className': {
 *    // Css styles
 *   }
 *  }
 * }
 */

const appTheme = createMuiTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          "&.appBarBody": {
            backgroundColor: "#b30000",
            flexGrow: 1,
            zIndex: 10,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          "&.chosen": {
            "&:hover": {
              backgroundColor: "#00b2ff",
            },
            backgroundColor: "#00b2ff",
            color: "#fff",
          },
          "&.unchosen": {
            "&:hover": {
              backgroundColor: "#0082BA",
            },
            backgroundColor: "#959595",
            color: "#fff",
          },
          borderRadius: 20,
          height: '75px',
          width: '300px'
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          "&.back-button": {
            "&:hover": {
              background: "#830000",
            },
            background: "#b30000",
            bottom: 20,
            flexGrow: 2,
            left: 20,
            marginBottom: 5,
            position: "fixed",
          },
          "&.back-button-disabled": {
            "&:hover": {
              background: "#b30000",
            },
            background: "#b30000",
            bottom: 20,
            flexGrow: 2,
            left: 20,
            marginBottom: 5,
            position: "fixed",
          },
          "&.continue-button": {
            "&:hover": {
              background: "#830000",
            },
            background: "#b30000",
            bottom: 20,
            flex: 1,
            marginBottom: 5,
            position: "fixed",
            right: 20,
          },
          "&.continue-button-disabled": {
            "&:hover": {
              background: "#b30000",
            },
            background: "#b30000",
            bottom: 20,
            flex: 1,
            marginBottom: 5,
            position: "fixed",
            right: 20,
          },
          pointerEvents: 'auto',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          paddingBottom: 20
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&$active': {
            color: "#686868"
          },
          '&$focused': {
            color: "#686868"
          },
          color: '#686868',
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.additional-information-text": {
            color: "#454545",
            fontSize: 35,
            fontWeight: 'bold' as 'bold',
            paddingTop: 65,
          },
          "&.button-label": {
            fontSize: 20
          },
          "&.category": {
            color: "#686868",
            fontSize: 30,
            fontWeight: "bold",
          },
          "&.classes-bold": {
            color: "#686868",
            fontSize: 30,
            fontWeight: "bold",
            paddingBottom: 30,
            paddingTop: 30,
          },
          "&.confidence-text": {
            fontSize: 35,
          },
          "&.counter": {
            fontSize: 20,
          },
          "&.description": {
            color: "#686868",
            fontSize: 30,
            fontWeight: "lighter",
            paddingBottom: 40,
          },
          "&.instruction": {
            color: "#00b2ff",
            fontSize: 40,
            fontWeight: "800",
            paddingBottom: 20,
          },
          "&.instructions": {
            color: "#0082BA",
            fontSize: 30,
            fontWeight: "900",
            paddingBottom: 20,
          },
          "&.level-text": {
            color: "#939393",
            fontSize: 20,
            paddingBottom: 30,
          },
          "&.percentText": {
            fontSize: 45,
            fontWeight: 'bold' as 'bold'
          },
          "&.review": {
            color: "#2c2c2c",
            margin: 40,
            paddingBottom: 40,
          },
          "&.start-text": {
            color: "#444444",
            fontSize: 25,
            fontWeight: "lighter",
            paddingBottom: 20,
            paddingTop: 20,
          },
          "&.title": {
            flexGrow: 2,
            fontSize: 20,
          },
          "&.warning-text": {
            color: "#686868",
            fontSize: 23,
            fontWeight: "bold",
            paddingTop: 20,
          },
          "&.welcome-text": {
            // color: "#111111",
            fontFamily: "arial",
            fontSize: 50,
            paddingBottom: 50,
          },
          "fontFamily": "arial",
        },
      },
    },
  },
});

export default appTheme;
