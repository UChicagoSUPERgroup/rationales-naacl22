import * as React from "react";

// Material UI
import Typography from "@material-ui/core/Typography";

// withState
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Actions
import { setHarmfulSelections, setTitleAction } from "../GlobalContext/actions";

// Texts
import {
  AppBarTexts,
  ClassesAndDefs,
  ClassificationTexts,
} from "../Models/texts";

// Models
import TextUtils from "../Models/textUtils";

interface IHarmfulWordSelectProps extends IInjectWithState {}

interface IHarmfulWordSelectState {
  wordArr: string[];
  confusingSelectedWords: number[];
  currentSelection: { end: number; start: number };
}

// Styles //

const strongSelectStyle = {
  backgroundColor: "#0078FF",
  color: "#fff",
  fontSize: 25,
};

const moderateSelectStyle = {
  backgroundColor: "#00b2ff",
  color: "#fff",
  fontSize: 25,
};

const unselectStyle = {
  color: "black",
  fontSize: 25,
  fontWeight: "lighter" as "lighter",
};

const moderateHarmfulStyle = {
  backgroundColor: "#ff3232",
  color: "white",
  fontSize: 25,
};

const strongHarmfulStyle = {
  backgroundColor: "#B90200",
  color: "white",
  fontSize: 25,
};

/**********/

/**
 * Allows the labeler to choose confusing selections
 */
class ConfusingWordSelect extends React.Component<
  IHarmfulWordSelectProps,
  IHarmfulWordSelectState
> {
  constructor(props: IHarmfulWordSelectProps) {
    super(props);
    const { taskData, currentSessionData } = this.props.globalState;
    const { confusingWordData } = currentSessionData;

    const wordArr: string[] = TextUtils.split(
      taskData.reviews[taskData.currentReviewIndex].review
    );

    this.state = {
      confusingSelectedWords: confusingWordData[taskData.currentReviewIndex],
      currentSelection: { end: -1, start: -1 },
      wordArr,
    };

    this.getClassification = this.getClassification.bind(this);
    this.onWordPressed = this.onWordPressed.bind(this);
  }

  public componentDidMount() {
    window.scroll(0, 0);
    this.props.globalState.dispatch(
      setTitleAction(AppBarTexts.SelectHarmfulWords)
    );
  }

  public render(): JSX.Element {
    const { wordArr, confusingSelectedWords } = this.state;
    const { currentReviewIndex } = this.props.globalState.taskData;
    const { attentionData } = this.props.globalState.currentSessionData;

    const attention: number[] = attentionData[currentReviewIndex];
    return (
      <>
        <div style={{ margin: 40, textAlign: "center" as "center" }}>
          <p style={{ color: "#ff3232", fontSize: 50, paddingBottom: 10 }}>
            {this.getClassification()}
          </p>
          <Typography className={"instruction"}>
            {ClassificationTexts.SelectHarmfulWords +
              this.getClassification().toString()}
          </Typography>
          {this.props.globalState.params.shouldAllowAttentionLevels ? (
            <Typography className={"level-text"}>
              {ClassificationTexts.Confusing}
            </Typography>
          ) : (
            <></>
          )}

          {wordArr.map((s: string, i: number) => (
            <span
              key={i}
              style={
                attention[i] > 0
                  ? attention[i] === 1
                    ? moderateSelectStyle
                    : strongSelectStyle
                  : confusingSelectedWords[i] > 0
                  ? confusingSelectedWords[i] === 1
                    ? moderateHarmfulStyle
                    : strongHarmfulStyle
                  : unselectStyle
              }
              onClick={() => {
                this.onWordPressed(i);
              }}
              onMouseDown={() => {
                const newCurrentSelection = this.state.currentSelection;
                newCurrentSelection.start = i;
                this.setState({
                  currentSelection: newCurrentSelection,
                });
              }}
              onMouseUp={() => {
                const newCurrentSelection = this.state.currentSelection;
                newCurrentSelection.end = i;
                this.setState({
                  currentSelection: newCurrentSelection,
                });
                if (
                  this.state.currentSelection.start !==
                  this.state.currentSelection.end
                ) {
                  this.onWordDragged(this.state.currentSelection);
                }
              }}
            >
              {`${s}`}
            </span>
          ))}
        </div>
      </>
    );
  }

  /**
   * Gets the classification based on the number assigned to the classifications
   *
   * @returns {ClassesAndDefs} The class as an enum
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

  /**
   * Called when a word is pressed by the user
   * @param i The index of the word/character that was pressed
   */
  private onWordPressed(i: number): void {
    const { confusingSelectedWords } = this.state;
    const { shouldAllowAttentionLevels } = this.props.globalState.params;

    // We don't want the users to select a delimiter, and since there are no changes, no need to dispatch
    if (confusingSelectedWords[i] !== -1) {
      // Move backwards (making 1 moderate and 2 strong) to make data more convenient
      // When we aren't using multiple levels of attention
      if (shouldAllowAttentionLevels)
        confusingSelectedWords[i] =
          confusingSelectedWords[i] === 2 ? 0 : confusingSelectedWords[i] + 1;
      else confusingSelectedWords[i] = confusingSelectedWords[i] === 0 ? 1 : 0;

      // Upload data and save the state.
      this.props.globalState.dispatch(
        setHarmfulSelections(confusingSelectedWords, [i])
      );
      this.setState({
        confusingSelectedWords,
      });
    }
  }

  /**
   *
   * @param selection The indexes of the currently selected words.
   */
  private onWordDragged(selection: { end: number; start: number }) {
    const { confusingSelectedWords } = this.state;
    const { shouldAllowAttentionLevels } = this.props.globalState.params;

    if (selection.start > selection.end) {
      const placeholder: number = selection.end;
      selection.end = selection.start;
      selection.start = placeholder;
    }

    const list: number[] = [];
    for (let i = selection.start; i <= selection.end; i++) {
      list.push(i);
    }

    console.log("This is your list of indexes:" + list);

    list.forEach((i) => {
      // We don't want the users to select a delimiter, and since there are no changes, no need to dispatch
      if (confusingSelectedWords[i] !== -1) {
        // Move backwards (making 1 moderate and 2 strong) to make data more convenient
        // When we aren't using multiple levels of attention
        if (shouldAllowAttentionLevels)
          confusingSelectedWords[i] =
            confusingSelectedWords[i] === 2 ? 0 : confusingSelectedWords[i] + 1;
        else
          confusingSelectedWords[i] = confusingSelectedWords[i] === 0 ? 1 : 0;

        }
      });
      this.setState({
        confusingSelectedWords,
      });
      // Upload data and save the state.
      this.props.globalState.dispatch(
        setHarmfulSelections(confusingSelectedWords, [selection.start, selection.end], true)
      );
  }
}

export default withState(ConfusingWordSelect);
