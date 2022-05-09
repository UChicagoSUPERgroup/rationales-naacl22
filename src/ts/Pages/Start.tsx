// React
import * as React from "react";

// Material Components
import Typography from "@material-ui/core/Typography";

// withState
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Texts
import { Titles } from "../Models/texts";

// Detect Device
import { BrowserView, MobileView } from "react-device-detect";

interface IStartPageProps extends IInjectWithState { }

const verticalAlignStyle = {
  maxWidth: "75%",
  // paddingLeft: 20,
  paddingLeft: "calc(25%/2)",
  top: "50%",
};

/**
 * The first introduction page
 *
 * @extends React.Component
 */
class StartPage extends React.Component<IStartPageProps> {
  public render() {
    return (
      <>
        <BrowserView>
          <div style={verticalAlignStyle}>
            <Typography variant="h1" align="center" className={"welcome-text"}>
              {Titles.StartIntroduction}
            </Typography>
            <Typography variant="body2" className={"start-text"}>
              {Titles.StartBrief4}
            </Typography>
            <Typography variant="body2" className={"start-text"}>
              {this.props.globalState.params.numReviews === 20 ? (Titles.StartBrief1TWE) : (Titles.StartBrief1TEN)}
            </Typography>
            <Typography variant="body2" className={"start-text"}>
              {!this.props.globalState.onlyLabel
                ? this.props.globalState.params.instructions === 23 ? Titles.StartBrief3NoPhrases : Titles.StartBrief3
                : null}
            </Typography>
            <Typography variant="body2" className={"start-text"}>
              {Titles.StartBrief5}
            </Typography>
          </div>
        </BrowserView>
        <MobileView>
          <div style={verticalAlignStyle}>
            <Typography variant="body2" align="center">
              {Titles.MobileText}
            </Typography>
          </div>
        </MobileView>
      </>
    );
  }
}

export default withState<IStartPageProps>(StartPage);
