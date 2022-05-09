import * as React from "react";

// Material UI
import { Button, Tooltip, Typography } from "@material-ui/core";

// withState
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Actions
import {
  setCanContinue,
  setClassification,
  setDraggedList,
  setSelections,
  setTitleAction,
  setTooltip,
} from "../GlobalContext/actions";

// Texts
import {
  AppBarTexts,
  ClassesAndDefs,
  ClassificationTexts,
  TooltipTexts,
} from "../Models/texts";

import TextUtils from "../Models/textUtils";

interface ICombinedSelectionProps extends IInjectWithState { }

/**
 * State of the combined selection style
 */
interface ICombinedSelectionState {
  allSelections: number[][];
  attentionData: number[];
  currentSelection: ICurrentSelection;
  draggedIndices: number[][];
  review: string;
  selectedClass: number;
  wordArr: string[];
}

/**
 * Holds information about the indices of selection
 */
interface ICurrentSelection {
  start: number;
  end: number;
}

/**
 * Allows the labeler to select descriptive words
 */
class CombinedSelectionSelect extends React.Component<
  ICombinedSelectionProps,
  ICombinedSelectionState
> {
  constructor(props: ICombinedSelectionProps) {
    super(props);
    const { taskData, currentSessionData } = props.globalState;
    const { reviews, currentReviewIndex } = taskData;
    const { attentionData, classificationData, draggedLists } =
      currentSessionData;

    const reviewObj = reviews[currentReviewIndex];
    const { review } = reviewObj;

    const wordArr: string[] = TextUtils.split(review);

    this.state = {
      allSelections: [],
      attentionData: attentionData[currentReviewIndex],
      currentSelection: { end: -1, start: -1 },
      draggedIndices: draggedLists[currentReviewIndex],
      review,
      selectedClass: classificationData[currentReviewIndex],
      wordArr,
    };
    console.log(draggedLists[currentReviewIndex])

    this.onClick = this.onClick.bind(this);
    this.getClass = this.getClass.bind(this);
    this.getClassification = this.getClassification.bind(this);
    this.onWordClicked = this.onWordClicked.bind(this);
    this.createFullIndexList = this.createFullIndexList.bind(this);
    this.mouseAction = this.mouseAction.bind(this);
    this.cleanDraggedList = this.cleanDraggedList.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.setShouldContinue = this.setShouldContinue.bind(this);
    this.dispatchWordSelections = this.dispatchWordSelections.bind(this);
    this.getSelectionBlockStyle = this.getSelectionBlockStyle.bind(this);
  }

  public componentDidMount() {
    window.scroll(0, 0);

    const { globalState } = this.props;

    globalState.dispatch(setTitleAction(AppBarTexts.SelectClass));
    globalState.dispatch(setCanContinue(false));
    globalState.dispatch(setTooltip(TooltipTexts.BtnCantContinueLabel));

    this.setShouldContinue();
    globalState.dispatch(setTitleAction(AppBarTexts.SelectWords));
  }

  public render(): JSX.Element {
    const { wordArr } = this.state;
    return (
      <>
        <div style={this.getInstructionStyle()}>
          {" "}
          <>
            <Typography className={"instruction"}>
              {ClassificationTexts.CombinedSelection}
            </Typography>
            {this.props.globalState.params.shouldAllowAttentionLevels ? (
              <Typography className={"level-text"}>
                {ClassificationTexts.Helpful}
              </Typography>
            ) : (
              <></>
            )}{" "}
          </>
          <div style={this.getSelectionBlockStyle()}>
            {wordArr.map((s, i) => (
              <span
                key={i}
                style={this.getStyle(i)}
                onMouseDown={() => this.mouseAction("down", i)}
                onMouseUp={() => this.mouseAction("up", i)}
              >
                {`${s}`}
              </span>
            ))}{" "}
          </div>
        </div>
        <div>
          <div style={this.getButtonDisplayStyle()}>
            <span style={this.getButtonSpanStyle()}>
              <div style={{ paddingRight: 10, display: 'inline-block' as 'inline-block' }}>
                <Tooltip title={ClassesAndDefs.PositiveDesc}>
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
                <Tooltip title={ClassesAndDefs.NegativeDesc}>
                  <Button
                    className={this.getClass(0)}
                    variant="contained"
                    onClick={() => this.onClick(0)}
                    style={{ paddingLeft: 10 }}
                  >
                    <Typography className="button-label">
                      {ClassesAndDefs.Negative}
                    </Typography>
                  </Button>
                </Tooltip>
              </div>
            </span>
            {/* <span style={this.getButtonSpanStyle()}>
            </span> */}
          </div>
        </div>
      </>
    );
  }

  private setShouldContinue() {
    const { attentionData, selectedClass } = this.state;
    const canContinue: boolean = !(
      attentionData.filter((val) => val === 1).length === 0 ||
      selectedClass === -1
    );
    this.props.globalState.dispatch(setCanContinue(canContinue));
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
    this.setState(
      {
        selectedClass,
      },
      this.setShouldContinue
    );
  }

  /**
   * Gets the class of the review that the labeler chose on the classification page
   */
  private getClassification(): ClassesAndDefs {
    let cls: ClassesAndDefs;
    const reviewIndex = this.props.globalState.taskData.currentReviewIndex;

    cls =
      this.props.globalState.currentSessionData.classificationData[
        reviewIndex
      ] === 1
        ? ClassesAndDefs.Positive
        : ClassesAndDefs.Negative;

    return cls;
  }

  private mouseAction(action: string, i: number) {
    const { currentSelection } = this.state;

    if (action === "down") currentSelection.start = i;
    else currentSelection.end = i;

    this.setState({
      currentSelection,
    });

    if (action === "up") {
      this.onWordClicked();
    }
  }

  /**
   *
   * @param selection The indexes of the currently selected words.
   */
  private onWordClicked() {
    const { attentionData, currentSelection } = this.state;
    const { shouldAllowAttentionLevels } = this.props.globalState.params;

    // Change the list in the way that we need
    const indexList = this.createFullIndexList(currentSelection);
    currentSelection.start = indexList[0];
    currentSelection.end = indexList[indexList.length - 1];

    // Extract the variables for an easier reference
    const { start, end } = currentSelection;
    const dragged = start !== end;

    const attentionClassification =
      attentionData[start] === 0
        ? 1
        : attentionData[start] === 1 && shouldAllowAttentionLevels
          ? 2
          : 0;

    if (dragged)
      this.cleanDraggedList(currentSelection, attentionClassification);

    const attentionList = attentionData
      .slice(start, end + 1)
      .map((val: number) => (val === -1 ? -1 : attentionClassification));
    attentionData.splice(start, indexList.length, ...attentionList);

    this.setState(
      {
        attentionData,
      },
      // Upload data and save to state
      () => this.dispatchWordSelections(attentionData, start, end, dragged)
    );
  }

  private dispatchWordSelections(
    attentionData: number[],
    start: number,
    end: number,
    dragged: boolean
  ) {
    this.props.globalState.dispatch(
      setSelections(attentionData, [start, end], dragged)
    );

    // We don't want the user to continue if there are no selections made.
    // The <= accounts for -1 given by the delimiters
    if (attentionData.filter((val) => val <= 0).length === 0) {
      this.props.globalState.dispatch(setCanContinue(false));
    } else this.props.globalState.dispatch(setCanContinue(true));

    this.setShouldContinue();
  }

  /**
   * Returns the bounds of the
   * @param i The index of the word that was clicked
   */
  private createFullIndexList({ start, end }: ICurrentSelection): number[] {
    const { draggedIndices } = this.state;
    // Reorder the indices
    if (start > end) {
      const t: number = start;
      start = end;
      end = t;
    }

    // Check if this list is contained in any other list
    const containedList = draggedIndices.filter(
      (bounds) =>
        bounds[0] <= start &&
        start <= bounds[1] &&
        bounds[0] <= end &&
        end <= bounds[1]
    );
    if (containedList.length > 0) {
      // If this is the case, we can just use the list it is contained in
      start = containedList[0][0];
      end = containedList[0][1];
    }
    // It's possible that the start and end indices are in different drags
    else {
      const startContainedList: number[][] = draggedIndices.filter(
        (bounds: number[]) => bounds[0] <= start && start <= bounds[1]
      );
      const endContainedList: number[][] = draggedIndices.filter(
        (bounds: number[]) => bounds[0] <= end && end <= bounds[1]
      );

      if (startContainedList.length > 0) start = startContainedList[0][0];
      if (endContainedList.length > 0) end = endContainedList[0][1];
    }

    return new Array(end - start + 1)
      .fill(start)
      .map((val: number, i: number) => val + i);
  }

  /**
   * Cleans the drag list so we can accurately style the component and have some logic with drags
   *
   * @param param0 The start and end selections from the user
   * @param selection The classification that the drag will be
   */
  private cleanDraggedList(
    { start, end }: ICurrentSelection,
    selection: number
  ) {
    let { draggedIndices } = this.state;

    // Filters out dragged lists that are in the middle of start and end
    draggedIndices = draggedIndices.filter(
      (bounds: number[]) =>
        !(
          (start <= bounds[0] && bounds[0] <= start) ||
          (start <= bounds[0] && bounds[1] <= end)
        )
    );

    // We want to remove the current list if it is meant to be deselected
    if (selection === 0)
      draggedIndices = draggedIndices.filter(
        (bounds) => !bounds.every((bound, i) => bound === [start, end][i])
      );
    // Push otherwise
    else draggedIndices.push([start, end]);

    this.setState({ draggedIndices });
    console.log(draggedIndices)
    this.props.globalState.dispatch(setDraggedList(draggedIndices));
  }

  /********************************* STYLES **********************************/

  /**
   * Returns the style for the word or delimiter
   * @param i Index of the word
   */
  private getStyle(wordIndex: number): object {
    const marginTop: number = 100;
    // Styles for the word selections
    const strongSelectStyle = {
      backgroundColor: "#0078FF",
      color: "#fff",
      margin: 0,
      marginTop
    };

    const moderateSelectStyle = {
      backgroundColor: "#00b2ff",
      color: "#fff",
      margin: 0,
      marginTop
    };

    const unselectStyle = {
      color: "#2C2C2C",
      fontWeight: "lighter" as "lighter",
      margin: 0,
      marginTop
    };

    const { attentionData, draggedIndices } = this.state;

    if (attentionData[wordIndex] > 0) {
      if (attentionData[wordIndex] === 1) return moderateSelectStyle;
      else return strongSelectStyle;
    } else if (attentionData[wordIndex] < 0) {
      for (const indices of draggedIndices) {
        if (indices[0] < wordIndex && wordIndex < indices[1])
          return this.getStyle(indices[0]);
      }
    }

    return unselectStyle;
  }

  private getSelectionBlockStyle(): object {
    return {
      backgroundColor: "#E3E3E3",
      borderRadius: 30,
      fontSize: 35,
      margin: 10,
      padding: 60,
      textAlign: "left" as "left",
    };
  }

  private getInstructionStyle(): object {
    return {
      margin: 60,
      textAlign: "left" as "left",
    };
  }

  private getButtonSpanStyle(): object {
    return {
      display: "table-cell",
      textAlign: "center" as "center",
    };
  }

  private getButtonDisplayStyle(): object {
    return {
      display: "table",
      width: "100%",
    };
  }
}

export default withState(CombinedSelectionSelect);