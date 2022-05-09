import * as React from "react";

// withState
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Actions
import {
  setCanContinue,
  setClassification,
  setTitleAction,
  setTooltip,
} from "../GlobalContext/actions";

// Models
import { AppBarTexts, ClassesAndDefs, TooltipTexts } from "../Models/texts";

// Material UI
import { Button, Tooltip, Typography } from "@material-ui/core";

interface IClassSelectionProps extends IInjectWithState { }

interface IClassSelectionState {
  selectedClass: number;
}

const classButtonStyle = {
  display: "table",
  width: "100%",
};

const tooltipStyle = {
  fontSize: 20,
}

const spanStyle = {
  display: "table-cell",
  textAlign: "center" as "center",
};

/**
 * Allows the labeler to select the class of the review
 * @param props The class selection props
 */
const ClassSelection = class extends React.Component<
  IClassSelectionProps,
  IClassSelectionState
> {
  constructor(props: IClassSelectionProps) {
    super(props);
    const { currentReviewIndex } = props.globalState.taskData;
    const { classificationData } = props.globalState.currentSessionData;

    this.state = {
      selectedClass: classificationData[currentReviewIndex],
    };

    this.onClick = this.onClick.bind(this);
    this.getClass = this.getClass.bind(this);
  }

  public componentDidMount() {
    window.scroll(0, 0);

    const { globalState } = this.props;

    const shouldContinue =
      globalState.currentSessionData.classificationData[
      globalState.taskData.currentReviewIndex
      ] !== -1;

    globalState.dispatch(setTitleAction(AppBarTexts.SelectClass));
    globalState.dispatch(setCanContinue(shouldContinue));
    globalState.dispatch(setTooltip(TooltipTexts.BtnCantContinueLabel));
  }

  public render(): JSX.Element {
    const { taskData } = this.props.globalState;
    return (
      <>
        <Typography className={"review"} align="center" style={this.getSelectionBlockStyle()}>
          {taskData.reviews[taskData.currentReviewIndex].review}
        </Typography>
        <div style={classButtonStyle}>
          <span style={spanStyle}>
            <div style={{ paddingRight: 10, display: 'inline-block' as 'inline-block' }}>
              <Tooltip title={<span style={tooltipStyle}>{ClassesAndDefs.PositiveDesc}</span>}>
                <Button
                  className={this.getClass(1)}
                  variant="contained"
                  onClick={() => this.onClick(1)}
                >
                  <Typography className="button-label">
                    {ClassesAndDefs.Positive}
                  </Typography>
                </Button>
              </Tooltip>
            </div>
            <div style={{ paddingLeft: 10, display: 'inline-block' as 'inline-block' }}>
              <Tooltip title={<span style={tooltipStyle}>{ClassesAndDefs.NegativeDesc}</span>}>
                <Button
                  className={this.getClass(0)}
                  variant="contained"
                  onClick={() => this.onClick(0)}
                >
                  <Typography className="button-label">
                    {ClassesAndDefs.Negative}
                  </Typography>
                </Button>
              </Tooltip>
            </div>
          </span>
        </div>
      </>
    );
  }

  /**
   * Takes the numerical representation of a class and return the string value
   * @param selectedClass The numerical representation of the class
   */
  private getClass(selectedClass: number): string {
    if (this.state.selectedClass === selectedClass) return "chosen";
    return "unchosen";
  }

  /**
   * Updates the selections when the user clicks on a button
   * @param selectedClass The numerical representation of the class that was selected
   */
  private onClick(selectedClass: number) {
    this.props.globalState.dispatch(setClassification(selectedClass));
    this.props.globalState.dispatch(setCanContinue(true));
    this.setState({
      selectedClass,
    });
  }

  private getSelectionBlockStyle(): object {
    return {
      backgroundColor: "#E3E3E3",
      borderRadius: 30,
      // color: "#2C2C2C",
      fontSize: 35,
      margin: 60,
      padding: 60,
      textAlign: "left" as "left",
    };
  }
};

export default withState(ClassSelection);
