import * as React from "react";

// Material UI
import Typography from "@material-ui/core/Typography";

// withState
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Actions
import {
  setCanContinue,
  setOppositeDraggedList,
  setOppositeSelections,
  setTitleAction,
} from "../GlobalContext/actions";

// Texts
import {
  AppBarTexts,
  ClassesAndDefs,
  ClassificationTexts,
  Instructions,
} from "../Models/texts";

import TextUtils from "../Models/textUtils";

interface IOppositeWordSelectProps extends IInjectWithState { }

interface ICurrentSelection {
  start: number;
  end: number;
}
interface IOppositeWordSelectState {
  oppositeAttentionData: number[];
  currentSelection: ICurrentSelection;
  draggedIndices: number[][];
  review: string;
  wordArr: string[];
}

/**
 * Allows the labeler to select descriptive words
 */
class OppositeWordSelect extends React.Component<
  IOppositeWordSelectProps,
  IOppositeWordSelectState
> {
  constructor(props: IOppositeWordSelectProps) {
    super(props);
    const { reviews, currentReviewIndex } = props.globalState.taskData;
    const { oppositeWordData, oppositeDraggedLists } = props.globalState.currentSessionData;

    const reviewObj = reviews[currentReviewIndex];
    const { review } = reviewObj;

    const wordArr: string[] = TextUtils.split(review);

    this.state = {
      currentSelection: { end: -1, start: -1 },
      draggedIndices: oppositeDraggedLists[currentReviewIndex],
      oppositeAttentionData: oppositeWordData[currentReviewIndex],
      review,
      wordArr,
    };

    this.getClassification = this.getClassification.bind(this);
    this.onWordClicked = this.onWordClicked.bind(this);
    this.createFullIndexList = this.createFullIndexList.bind(this);
    this.mouseAction = this.mouseAction.bind(this);
    this.cleanDraggedList = this.cleanDraggedList.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.dispatchWordSelections = this.dispatchWordSelections.bind(this);
    this.chooseInstructionsStr = this.chooseInstructionsStr.bind(this)
  }

  public componentDidMount() {
    window.scroll(0, 0);

    const { globalState } = this.props;
    const { oppositeAttentionData: attentionData } = this.state;

    if (attentionData.filter((val) => val === 1).length === 0) {
      this.props.globalState.dispatch(setCanContinue(false));
    } else this.props.globalState.dispatch(setCanContinue(true));
    globalState.dispatch(setTitleAction(AppBarTexts.SelectWords));
  }

  public render(): JSX.Element {
    const { wordArr } = this.state;

    return (
      <>
        <div style={{ margin: 40, textAlign: "center" as "center" }}>
          <div style={this.getInstructionStyle()}>
            <Typography className={"instruction"}>
              {this.chooseInstructionsStr()}
            </Typography>
            {this.props.globalState.params.shouldAllowAttentionLevels ? (
              <Typography className={"level-text"}>
                {ClassificationTexts.Helpful}
              </Typography>
            ) : (
              <></>
            )}
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
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  private chooseInstructionsStr(): string {
    const { currentSessionData, params, taskData } = this.props.globalState
    switch (params.instructions) {
      case 15: return !currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstructionTo2P : Instructions.SelectionInstructionTo2N;
      case 16: return !currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstructionTo5P : Instructions.SelectionInstructionTo5N;
      default: return !currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstructionTo1P : Instructions.SelectionInstructionTo1N;
    }
  }

  private setShouldContinue() {
    const { oppositeAttentionData: attentionData } = this.state;
    const canContinue: boolean = attentionData.filter((val) => val === 1).length !== 0;
    this.props.globalState.dispatch(setCanContinue(canContinue));
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
    const { oppositeAttentionData, currentSelection } = this.state;
    const { shouldAllowAttentionLevels } = this.props.globalState.params;

    // Change the list in the way that we need
    const indexList = this.createFullIndexList(currentSelection);
    currentSelection.start = indexList[0];
    currentSelection.end = indexList[indexList.length - 1];

    // Extract the variables for an easier reference
    const { start, end } = currentSelection;
    const dragged = start !== end;

    const attentionClassification =
      oppositeAttentionData[start] === 0
        ? 1
        : oppositeAttentionData[start] === 1 && shouldAllowAttentionLevels
          ? 2
          : 0;

    if (dragged)
      this.cleanDraggedList(currentSelection, attentionClassification);

    const attentionList = oppositeAttentionData
      .slice(start, end + 1)
      .map((val: number) => (val === -1 ? -1 : attentionClassification));
    oppositeAttentionData.splice(start, indexList.length, ...attentionList);

    this.setState(
      {
        oppositeAttentionData,
      },
      // Upload data and save to state
      () => this.dispatchWordSelections(oppositeAttentionData, start, end, dragged)
    );
  }

  private dispatchWordSelections(
    attentionData: number[],
    start: number,
    end: number,
    dragged: boolean
  ) {
    this.props.globalState.dispatch(
      setOppositeSelections(attentionData, [start, end], dragged)
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
    this.props.globalState.dispatch(setOppositeDraggedList(draggedIndices));
  }

  /********************************* STYLES **********************************/

  /**
   * Returns the style for the word or delimiter
   * @param wordIndex Index of the word
   */
  private getStyle(wordIndex: number): object {
    const marginTop: number = 100;
    // Styles for the word selections
    const strongSelectStyle = {
      backgroundColor: "#FF3F16",
      color: "#fff",
      fontFamily: "Roboto",
      margin: 0,
      marginTop
    };

    const moderateSelectStyle = {
      backgroundColor: "#FF3F16",
      color: "#fff",
      fontFamily: "Roboto",
      margin: 0,
      marginTop
    };

    const unselectStyle = {
      color: "#2C2C2C",
      fontFamily: "Roboto",
      // fontWeight: "lighter" as "lighter",
      margin: 0,
      marginTop
    };

    const { oppositeAttentionData: attentionData, draggedIndices } = this.state;

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
      // textAlign: "left" as "left",
    };
  }
}

export default withState(OppositeWordSelect);
