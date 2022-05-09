import * as React from "react";

// Material UI
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";

// With State
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Actions
import {
  setCanContinue,
  setConfidenceData,
  setTooltip,
} from "../GlobalContext/actions";

// Models
import { TooltipTexts } from "../Models/texts";

interface IConfidenceProps extends IInjectWithState { }

interface IConfidenceState {
  labelRadioValue: number;
  selectionRadioValue: number;
}

// Styles
const verticalAlignStyle = {
  // maxWidth: "75%",
  // paddingLeft: "calc(25%/2)",
  margin: 60,
  textAlign: "left" as "left",
  // top: "50%",
};

const marks = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neither Agree or Disagree" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

class ConfidencePage extends React.Component<
  IConfidenceProps,
  IConfidenceState
> {
  constructor(props: IConfidenceProps) {
    super(props);
    const { confidenceData } = this.props.globalState.currentSessionData;
    const data =
      confidenceData[this.props.globalState.taskData.currentReviewIndex];

    this.state = {
      labelRadioValue: data[0],
      selectionRadioValue: data[1],
    };

    props.globalState.dispatch(setCanContinue(false));
    props.globalState.dispatch(
      setTooltip(TooltipTexts.BtnCantContinueConfidence)
    );
    this.dispatchChanges = this.dispatchChanges.bind(this);
    this.labelToNum = this.labelToNum.bind(this);
    this.numToLabel = this.numToLabel.bind(this);
    this.canContinue = this.canContinue.bind(this);
    this.canContinue();

    console.log(this.props.globalState.currentSessionData.draggedLists)
  }

  public render(): JSX.Element {
    return (
      <div style={verticalAlignStyle}>
        <Typography className={"instruction"}>
          {"Respond to the Following Statements: "}
        </Typography>
        <div>
          <FormControl component="fieldset" style={{ width: '100%' }}>
            <FormLabel component="legend">
              <Typography className={"confidence-text"}>
                {" "}
                {
                  "I am completely confident in my labeling of this review as Positive or Negative."
                }{" "}
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-label="label-confidence"
              name="label-confidence"
              value={this.state.labelRadioValue}
              style={this.getFormStyle()}
              onChange={(_, val: string) => {
                this.setState(
                  { labelRadioValue: parseInt(val, 10) },
                  this.dispatchChanges
                );
              }}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label={<span style={this.getFormLabelControlStyle()}>{this.numToLabel(1)}</span>}
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label={<span style={this.getFormLabelControlStyle()}>{this.numToLabel(2)}</span>}
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label={<span style={this.getFormLabelControlStyle()}>{this.numToLabel(3)}</span>}
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label={<span style={this.getFormLabelControlStyle()}>{this.numToLabel(4)}</span>}
              />
              <FormControlLabel
                value={5}
                control={<Radio />}
                label={<span style={this.getFormLabelControlStyle()}>{this.numToLabel(5)}</span>}
              />
            </RadioGroup>
          </FormControl>
          {!this.props.globalState.onlyLabel ?
            < FormControl component="fieldset" style={{ width: '100%' }}>
              <FormLabel component="legend">
                <Typography className={"confidence-text"}>
                  {" "}
                  {
                    this.props.globalState.params.instructions === 23 ? 
                    "I am completely confident in my selection of words." :
                    "I am completely confident in my selection of words and phrases."
                    
                  }{" "}
                </Typography>
              </FormLabel>
              <RadioGroup
                aria-label="selection-confidence"
                name="selection-confidence"
                value={this.state.selectionRadioValue}
                style={this.getFormStyle()}
                onChange={(_, val: string) => {
                  this.setState(
                    { selectionRadioValue: parseInt(val, 10) },
                    this.dispatchChanges
                  );
                }}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label={<span style={this.getFormLabelControlStyle()}>{this.numToLabel(1)}</span>}
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label={<span style={this.getFormLabelControlStyle()}>{this.numToLabel(2)}</span>}
                />
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label={<span style={this.getFormLabelControlStyle()}>{this.numToLabel(3)}</span>}
                />
                <FormControlLabel
                  value={4}
                  control={<Radio />}
                  label={<span style={this.getFormLabelControlStyle()}>{this.numToLabel(4)}</span>}
                />
                <FormControlLabel
                  value={5}
                  control={<Radio />}
                  label={<span style={this.getFormLabelControlStyle()}>{this.numToLabel(5)}</span>}
                />
              </RadioGroup>
            </FormControl>
            : null}
        </div>
      </div >
    );
  }

  /**
   * This is required to prevent constant dispatches and updates that overwhelms the
   * interactions and webapp
   *
   * @param _ The event associated with a mouse up change
   * @param __ The value of the radio form
   */
  public dispatchChanges() {
    this.props.globalState.dispatch(
      setConfidenceData([
        this.state.labelRadioValue,
        this.state.selectionRadioValue,
      ])
    );

    this.canContinue();

    console.log(this.props.globalState.currentSessionData);
  }

  /**
   * Sets whether or not the interface can continue or not
   */
  public canContinue() {
    if (this.state.labelRadioValue >= 1 && (this.props.globalState.onlyLabel ? true : this.state.selectionRadioValue >= 1))
      this.props.globalState.dispatch(setCanContinue(true));
  }

  /**
   * Converts the label to the numerical value of the label
   * @param label The label of the radio button
   * @returns The number representing the label
   */
  private labelToNum(label: string): number {
    return marks.filter((val) => val.label === label)[0].value;
  }

  /**
   * Converts the numerical value to the label
   * @param value The numerical value of the radio button
   * @returns The label representing the numerical value
   */
  private numToLabel(value: number): string {
    return marks.filter((val) => val.value === value)[0].label;
  }

  private getFormStyle(): object {
    return {
      backgroundColor: "#E3E3E3",
      borderRadius: 30,
      fill: "100%",
      fontSize: 100,
      margin: 10,
      padding: 40,
      textAlign: "left" as "left",
    };
  }

  private getFormLabelControlStyle(): object {
    return {
      color: "#333333",
      fontSize: 25,
    }
  }
}

export default withState<IConfidenceProps>(ConfidencePage);
