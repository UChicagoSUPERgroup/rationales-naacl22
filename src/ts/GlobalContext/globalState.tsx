// React
import * as React from "react";

// Models
import createPageList from "../Models/createPages";
import ICurrentSessionData, {
  IInteraction,
} from "../Models/currentSessionData";
import ITask from "../Models/taskData";
import { TooltipTexts } from "../Models/texts";
import getUrlParams, { IUrlParameters } from "../Models/urlParameters";

// Reducer
import reducer from "./reducer";

// Actions
import IAction from "./actions";

const params = getUrlParams();
const { combinedInterface, numReviews, userId } = params;

const onlyLabel = params.instructions === 21
const pages = createPageList(params, onlyLabel);

const numActionPages: number = (({
  shouldLabelOpposite,
  shouldShowConfusingWords,
}: IUrlParameters): number =>
  (onlyLabel || combinedInterface) ? 2 : (shouldShowConfusingWords || shouldLabelOpposite) ? 4 : 3)(
    params
  );

/**
 * The global state of the application
 *
 * @param {string} appBarTitle Controls title for each page
 * @param {string} backBtnTooltip The tooltip text for the back button
 * @param {boolean} canGoBack Controls if the user can go back or not
 * @param {boolean} canContinue Controls whether or not the labeler can continue
 * @param {boolean} combinedInterface /////TEMPORARY /////
 * @param {string} continueBtnTooltip The tooltip text for the continue button
 * @param {ICurrentSessionData} currentSessionData A structure that tracks the the current labeler's selections
 * @param {number} currentTime Used to get the amount of time a labeler was on a page
 * @param {(IAction) => void} dispatch The function that dispatches actions
 * @param {number} numActionPages The number of pages that the user interacts with
 * @param {number} numNonActionPages The number of explanation/introduction pages in the beginning.
 * @param {number} pageIndex The current page in a vector
 * @param {JSX.Element[]} pages The list of pages that the labeler will see
 * @param {IUrlParameters} params The user parameters from the labeler
 * @param {ITask} taskData Data about the current task
 */
export interface IGlobalState {
  appBarTitle: string;
  backBtnTooltip: string;
  canGoBack: boolean;
  canContinue: boolean;
  combinedInterface: boolean; //// TEMPORARY
  continueBtnTooltip: string;
  currentSessionData: ICurrentSessionData;
  currentTime: number;
  noDrag: boolean;
  numActionPages: number;
  numNonActionPages: number;
  onlyLabel: boolean;
  pageIndex: number;
  pages: JSX.Element[];
  params: IUrlParameters;
  taskData: ITask;
  dispatch(action: IAction): void;
}

/**
 * Initial state of the application
 */
export const initState: IGlobalState = {
  appBarTitle: "Welcome",
  backBtnTooltip: TooltipTexts.BtnCantBack,
  canContinue: false,
  canGoBack: false,
  combinedInterface, /// TEMPORARY
  continueBtnTooltip: TooltipTexts.BtnDataNotLoaded,
  currentSessionData: {
    attentionData: [],
    classificationData: new Array<number>(numReviews).fill(-1),
    confidenceData: new Array<number[]>(numReviews).fill([0, 0]),
    confusingWordData: [],
    draggedLists: new Array<number[][]>(numReviews)
      .fill([])
      .map((_) => []),
    interactions: new Array<IInteraction[]>(pages.length)
      .fill([])
      .map((_) => []),
    oppositeDraggedLists: new Array<number[][]>(numReviews)
      .fill([])
      .map((_) => []),
    oppositeWordData: [],
    totalInteractions: new Array<number>(pages.length).fill(0),
  },
  currentTime: Date.now(),
  dispatch: (_) => ({}),
  noDrag: [22, 23].includes(params.instructions),
  numActionPages,
  numNonActionPages: 1,
  onlyLabel,
  pageIndex: 0,
  pages,
  params,
  taskData: {
    currentReviewIndex: 0,
    numReviews,
    pageTimes: new Array<number>(pages.length).fill(0),
    reviews: [],
    stepNumber: 0,
    userId,
  },
};

/**
 * Creates the context for the global state
 */
export const GlobalContext: React.Context<IGlobalState> = React.createContext<IGlobalState>(
  initState
);

/**
 * Gives a globalState object
 */
export const GlobalConsumer = GlobalContext.Consumer;

/**
 * Allows for the global state to be accessed in a component
 */
class GlobalProvider extends React.Component<{}, IGlobalState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...initState,
      dispatch: (action: IAction) =>
        this.setState(() => {
          return reducer(this.state, action);
        }),
    };
  }

  public render(): JSX.Element {
    return (
      <GlobalContext.Provider value={this.state}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalProvider;
