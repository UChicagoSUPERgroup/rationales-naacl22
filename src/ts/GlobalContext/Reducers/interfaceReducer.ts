// Global State
import { IGlobalState } from "../globalState";

// Actions
import { IInterfaceAction } from "../actions";
import ActionTypes from "../actionTypes";

// Models
import { TooltipTexts } from '../../Models/texts';
// import TextUtils from "src/ts/Models/textUtils";

const interfaceReducer = (
  state: IGlobalState,
  action: IInterfaceAction
): IGlobalState => {
  const newState: IGlobalState = state;

  switch (action.type) {
    case ActionTypes.ChangeTitle: {
      newState.appBarTitle = action.title!;
      break;
    }

    case ActionTypes.CanContinue: {
      newState.canContinue = action.canContinue!;
      newState.continueBtnTooltip = TooltipTexts.BtnContinue
      break;
    }

    case ActionTypes.CanGoBack: {
      newState.canGoBack = action.canGoBack!;
      break;
    }

    /**
     * Goes forward in the page list
     */
    case ActionTypes.NextPage: {
      // Updates time and resets timer
      newState.taskData.pageTimes[newState.pageIndex] +=
        Math.abs(Date.now() - newState.currentTime) / 1000;

      newState.pageIndex++;
      newState.canContinue = newState.pageIndex !== newState.pages.length - 1;
      newState.canGoBack = true;

      newState.taskData.currentReviewIndex = Math.floor(
        ((val: number) => (val < 0 ? 1 : val))(
          newState.pageIndex - newState.numNonActionPages
        ) / newState.numActionPages
      );

      newState.currentTime = Date.now();
      newState.backBtnTooltip = TooltipTexts.BtnBack

      break;
    }

    /**
     * Goes backwards in the page list
     */
    case ActionTypes.LastPage: {
      // Updates time and resets timer
      newState.taskData.pageTimes[newState.pageIndex] +=
        Math.abs(Date.now() - newState.currentTime) / 1000;

      --newState.pageIndex;
      newState.canGoBack = newState.pageIndex !== 0;
      newState.canContinue = true;

      // Set Review Index when page changes
      newState.taskData.currentReviewIndex = Math.floor(
        ((val: number) => (val < 0 ? 1 : val))(
          newState.pageIndex - newState.numNonActionPages
        ) / newState.numActionPages
      );

      newState.currentTime = Date.now();
      if (!newState.canGoBack) newState.backBtnTooltip = TooltipTexts.BtnCantBack
      break;
    }

    case ActionTypes.SetPageNumber: {
      newState.pageIndex = action.pageNumber!;
      break;
    }

    case ActionTypes.SetTooltip: {
      newState.continueBtnTooltip = action.tooltip!;
      break;
    }
  }
  return newState;
};

export default interfaceReducer;
