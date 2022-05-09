import * as React from "react";

// withState
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Material UI
import { Typography } from "@material-ui/core";
import { pushData } from "../GlobalContext/actions";

const verticalAlignStyle = {
  maxWidth: "75%",
  paddingLeft: "calc(25%/2)",
  top: "50%",
};

interface IFinishPageProps extends IInjectWithState {}

/**
 * The last page the user is shown
 */
class FinishPage extends React.Component<IFinishPageProps> {
  public constructor(props: IFinishPageProps) {
    super(props)

    props.globalState.dispatch(pushData)
  }

  public render() {
    return (
      <div style={verticalAlignStyle}>
        <Typography align={"center"} className={"welcome-text"}>
          {" "}
          Thank You!{" "}
        </Typography>
      </div>
    );
  }
}

export default withState<IFinishPageProps>(FinishPage);
