// React
import * as React from "react";

// Material UI
import Typography from "@material-ui/core/Typography";

// Models
import { AppBarTexts, ClassesAndDefs } from "../Models/texts";

// withState
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Actions
import { setTitleAction } from "../GlobalContext/actions";

interface IClassDescriptionProps extends IInjectWithState {}

const descriptionDivStyles = {
  paddingLeft: "30px",
};

/**
 * Displays the class description screen
 */
class ClassDescription extends React.Component<IClassDescriptionProps> {
  public componentDidMount() {
    window.scroll(0, 0);

    const { globalState } = this.props;
    globalState.dispatch(setTitleAction(AppBarTexts.Descriptions));
  }

  public render(): JSX.Element {
    return (
      <>
        <Typography className={"instruction"} align={"center"}>
          {ClassesAndDefs.Instruction}
        </Typography>
        <div style={descriptionDivStyles}>
          <Typography className={"category"}>
            {ClassesAndDefs.Positive + ":"}
          </Typography>
          <Typography className={"description"}>
            {ClassesAndDefs.PositiveDesc}
          </Typography>
          <Typography className={"category"}>
            {ClassesAndDefs.Negative + ":"}
          </Typography>
          <Typography className={"description"}>
            {ClassesAndDefs.NegativeDesc}
          </Typography>
        </div>
      </>
    );
  }
}

export default withState(ClassDescription);
