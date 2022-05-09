// Action Types
import { TooltipTexts } from "../Models/texts";
import ActionTypes from "./actionTypes";

// Global State
import { IGlobalState } from "./globalState";

/**
 * Overall action types
 */
interface IAction {
  type: ActionTypes;
  reducerType: ReducerType;
}

/**
 * Reducer types for clarification
 */
export enum ReducerType {
  Data,
  Interface,
}

/**
 * Interface specific actions
 */
export interface IInterfaceAction extends IAction {
  title?: string;
  tooltip?: string;
  canContinue?: boolean;
  canGoBack?: boolean;
  pageNumber?: number;
}

/**
 * Data specific actions
 * 
 */
export interface IDataAction extends IAction {
  classification?: number;
  confidence?: number[];
  dragged?: boolean;
  draggedList?: number[][];
  harmfulSelections?: number[];
  newState?: IGlobalState;
  oppositeDraggedList?: number[][]
  oppositeSelections?: number[];
  selections?: number[];
  selectionIndex?: number[];
}

/**
 * Switches the current page with the next page
 */
export const setNextPageIndexAction: IInterfaceAction = {
  reducerType: ReducerType.Interface,
  type: ActionTypes.NextPage,
};

/**
 * Switches the current page with the last page
 */
export const setLastPageIndexAction: IInterfaceAction = {
  reducerType: ReducerType.Interface,
  type: ActionTypes.LastPage,
};

/**
 * Sets the title of the appbar
 *
 * @param title The new title for the app bar
 */
export const setTitleAction = (title: string): IInterfaceAction => ({
  reducerType: ReducerType.Interface,
  title,
  type: ActionTypes.ChangeTitle,
});

/**
 * Sets if the button is able to continue or not
 *
 * @param canContinue If the button is allowed to continue
 */
export const setCanContinue = (canContinue: boolean): IInterfaceAction => ({
  canContinue,
  reducerType: ReducerType.Interface,
  type: ActionTypes.CanContinue,
});

/**
 * Sets if the button can go back
 *
 * @param canGoBack If the button is allowed to go back
 */
export const setCanGoBack = (canGoBack: boolean): IInterfaceAction => ({
  canGoBack,
  reducerType: ReducerType.Interface,
  type: ActionTypes.CanGoBack,
});

/**
 * Sets the classification given by the user of the current review
 *
 * @param {number} classification The classification that the user gives about a review
 */
export const setClassification = (classification: number): IDataAction => ({
  classification,
  reducerType: ReducerType.Data,
  type: ActionTypes.SetClassification,
});

/**
 * Sets the attention vector for the current review
 *
 * @param {boolean[]} selections The attention vector given by the user for the current review
 */
export const setSelections = (
  selections: number[],
  selectionIndex: number[],
  dragged?: boolean
): IDataAction => ({
  dragged,
  reducerType: ReducerType.Data,
  selectionIndex,
  selections,
  type: ActionTypes.SetSelections,
});

/**
 * Sets the harmful attention vector for the current review
 *
 * @param {boolean[]} harmfulSelections The harmful attention vector given by the user for the current review
 */
export const setHarmfulSelections = (
  harmfulSelections: number[],
  selectionIndex: number[],
  dragged?: boolean
): IDataAction => ({
  dragged,
  harmfulSelections,
  reducerType: ReducerType.Data,
  selectionIndex,
  type: ActionTypes.SetHarmfulSelections,
});

/**
 * Sets the opposite attention vector for the current review
 *
 * @param {boolean[]} oppositeSelections The apposite attention vector given by the user for the current review
 */
 export const setOppositeSelections = (
  oppositeSelections: number[],
  selectionIndex: number[],
  dragged?: boolean
): IDataAction => ({
  dragged,
  oppositeSelections,
  reducerType: ReducerType.Data,
  selectionIndex,
  type: ActionTypes.SetOppositeSelections,
});

/**
 * Sets the confidence given by a reviewer
 * @param confidence The list of confidence for a specific review
 */
export const setConfidenceData = (
  confidence: number[]
): IDataAction => ({
  confidence,
  reducerType: ReducerType.Data,
  type: ActionTypes.SetConfidence
})

/**
 * Gets the data. Requires the setContinue to be passed so the user can't continue
 * if the data hasn't been loaded
 *
 * @param {() => void} setContinueFunction The continue function
 */
export const grabData: IDataAction = {
  reducerType: ReducerType.Data,
  type: ActionTypes.Init,
};

/**
 * Picks a new review if one is too obscene
 */
export const pickNewReview: IDataAction = {
  reducerType: ReducerType.Data,
  type: ActionTypes.PickNew,
};

/**
 * Sets the page number directly
 *
 * @param {number} pageNumber
 */
export const setPageNumber = (pageNumber: number): IInterfaceAction => ({
  pageNumber,
  reducerType: ReducerType.Interface,
  type: ActionTypes.SetPageNumber,
});

/**
 * Sets up and pushes the data
 */
export const pushData: IDataAction = {
  reducerType: ReducerType.Data,
  type: ActionTypes.PushData,
};

export const setNewState = (newState: IGlobalState): IDataAction => ({
  newState,
  reducerType: ReducerType.Data,
  type: ActionTypes.SetNewState
})

export const setTooltip = (tooltip: TooltipTexts): IInterfaceAction => ({
  reducerType: ReducerType.Interface,
  tooltip,
  type: ActionTypes.SetTooltip
})

export const setDraggedList = (draggedList: number[][]): IDataAction => ({
  draggedList,
  reducerType: ReducerType.Data,
  type: ActionTypes.SetDraggedList,
})

export const setOppositeDraggedList = (oppositeDraggedList: number[][]): IDataAction => ({
  oppositeDraggedList,
  reducerType: ReducerType.Data,
  type: ActionTypes.SetOppositeDraggedList,
})

export default IAction;
