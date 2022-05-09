import * as React from "react";

// Material UI
import Typography from "@material-ui/core/Typography";

// withState
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Actions
import {
  setCanContinue,
  setDraggedList,
  setSelections,
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

interface IDescriptiveWordSelectProps extends IInjectWithState { }

interface ICurrentSelection {
  start: number;
  end: number;
}
interface IDescriptiveWordSelectState {
  allSelections: number[][];
  attentionData: number[];
  currentSelection: ICurrentSelection;
  draggedIndices: number[][];
  review: string;
  wordArr: string[];
}

/**
 * Allows the labeler to select descriptive words
 */
class DescriptiveWordSelect extends React.Component<
  IDescriptiveWordSelectProps,
  IDescriptiveWordSelectState
> {
  constructor(props: IDescriptiveWordSelectProps) {
    super(props);
    const { reviews, currentReviewIndex } = props.globalState.taskData;
    const { attentionData, draggedLists } = props.globalState.currentSessionData;

    const reviewObj = reviews[currentReviewIndex];
    const { review } = reviewObj;

    const wordArr: string[] = TextUtils.split(review);

    this.state = {
      allSelections: [],
      attentionData: attentionData[currentReviewIndex],
      currentSelection: { end: -1, start: -1 },
      draggedIndices: draggedLists[currentReviewIndex],
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
    this.getPercentage = this.getPercentage.bind(this);
    this.chooseInstructionsStr = this.chooseInstructionsStr.bind(this)
  }

  public componentDidMount() {
    window.scroll(0, 0);

    const { globalState } = this.props;
    const { attentionData } = this.state;

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
            {
              this.props.globalState.params.instructions === 4 ?
                <Typography className='percentText'>
                  {`You have selected `}
                  <span style={{ color: "#00b2ff" }}>{`${this.getPercentage()}%`}</span>
                  {' of the words'}
                </Typography>
                : null
            }
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
    const { currentSessionData, taskData } = this.props.globalState
    switch (this.props.globalState.params.instructions) {
      case 2: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction2P : Instructions.SelectionInstruction2N;
      case 15: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction2P : Instructions.SelectionInstruction2N;
      case 12: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction2P : Instructions.SelectionInstruction2N;
      case 3: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction34P : Instructions.SelectionInstruction34N;
      case 4: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction34P : Instructions.SelectionInstruction34N;
      case 5: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction5P : Instructions.SelectionInstruction5N;
      case 0: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction5P : Instructions.SelectionInstruction5N;
      case 20: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction5P : Instructions.SelectionInstruction5N;
      case 22: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction5P : Instructions.SelectionInstruction5N;
      case 23: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction5PNoPhrase : Instructions.SelectionInstruction5NNoPhrase;
      case 13: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction5P : Instructions.SelectionInstruction5N;
      case 16: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction5P : Instructions.SelectionInstruction5N;
      case 6: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction6P : Instructions.SelectionInstruction6N;
      default: return currentSessionData.classificationData[taskData.currentReviewIndex] ? Instructions.SelectionInstruction1P : Instructions.SelectionInstruction1N;
    }
  }

  private getPercentage(): number {
    const { currentReviewIndex } = this.props.globalState.taskData
    const attData: number[] = this.props.globalState.currentSessionData.attentionData[currentReviewIndex];
    const numSelected: number = TextUtils.numWords(attData, true);
    const total: number = TextUtils.numWords(attData, false);
    const proportion = numSelected / total;

    return Math.floor(proportion * 100);
  }


  private setShouldContinue() {
    const { attentionData } = this.state;
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
    const { noDrag } = this.props.globalState;

    if (noDrag) {
      currentSelection.start = i;
      currentSelection.end = i;

      this.setState({
        currentSelection,
      });
      if (action === "down")
        this.onWordClicked()
    } else {
      if (action === "down") currentSelection.start = i;
      else currentSelection.end = i;

      this.setState({
        currentSelection,
      });

      if (action === "up" || noDrag) {
        this.onWordClicked();

      }
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
    this.props.globalState.dispatch(setDraggedList(draggedIndices));
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
      backgroundColor: "#0078FF",
      color: "#fff",
      fontFamily: "Roboto",
      margin: 0,
      marginTop
    };

    const moderateSelectStyle = {
      backgroundColor: "#00b2ff",
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
      // textAlign: "left" as "left",
    };
  }
}

export default withState(DescriptiveWordSelect);
