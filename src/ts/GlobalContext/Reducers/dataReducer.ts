// Global State
import { IGlobalState } from "../globalState";

// Actions
import { IDataAction, setCanContinue, setNewState } from "../actions";
import ActionTypes from "../actionTypes";

// Models
import {
  IInteraction,
  InteractionTypeEnum,
} from "src/ts/Models/currentSessionData";
import IExportData from "src/ts/Models/exportData";
import { IReview } from "src/ts/Models/taskData";
import TextUtils from "src/ts/Models/textUtils";

// SUPER-server Client
import SUPERServerClient from "src/ts/SUPERserverClient";

import CookieJar from "src/ts/Models/cookieJar";

const dataReducer = (
  state: IGlobalState,
  action: IDataAction
): IGlobalState => {
  const newState: IGlobalState = state;

  switch (action.type) {

    case ActionTypes.SetDraggedList: {
      newState.currentSessionData.draggedLists[newState.taskData.currentReviewIndex] = action.draggedList!;
      break;
    }
    case ActionTypes.SetOppositeDraggedList: {
      newState.currentSessionData.oppositeDraggedLists[newState.taskData.currentReviewIndex] = action.oppositeDraggedList!;
      break;
    }

    case ActionTypes.SetNewState: {
      Object.keys(newState).forEach((key: string) => {
        newState[key] = action.newState![key];
      });

      break;
    }

    /**
     * Updates the classifications from the labeler into the currentSessionData object
     */
    case ActionTypes.SetClassification: {
      newState.currentSessionData.classificationData[
        newState.taskData.currentReviewIndex
      ] = action.classification!;

      newState.currentSessionData.totalInteractions[newState.pageIndex]++;
      newState.currentSessionData.interactions[newState.pageIndex].push({
        interactionIndices: [-1],
        interactionType:
          action.classification! === 1
            ? InteractionTypeEnum.SelectPositive
            : InteractionTypeEnum.SelectNegative,
      });
      break;
    }

    /**
     * Replaces the attention data at the index with the one given by the labeler
     */
    case ActionTypes.SetSelections: {
      const { currentSessionData } = newState;
      const { pageIndex } = newState;

      const interactionIndices: number[] = action.selectionIndex!;
      const selections: number[] = action.selections!;

      currentSessionData.attentionData.splice(
        newState.taskData.currentReviewIndex,
        1,
        selections
      );

      let interactionType: InteractionTypeEnum = InteractionTypeEnum.Deselect;

      // Ideally, the values over the range of the indecies in the vector should be the same.
      switch (selections[interactionIndices[0]]) {
        case 0: {
          interactionType = action.dragged!
            ? InteractionTypeEnum.DragDeselect
            : InteractionTypeEnum.Deselect;

          break;
        }
        case 1: {
          interactionType = action.dragged!
            ? InteractionTypeEnum.DragSelect
            : InteractionTypeEnum.Select;

          break;
        }
        case 2: {
          interactionType = action.dragged!
            ? InteractionTypeEnum.DragStrongSelect
            : InteractionTypeEnum.StrongSelect;
          break;
        }
      }

      // Adds this selection as a new interaction
      currentSessionData.totalInteractions[pageIndex]++;
      currentSessionData.interactions[pageIndex].push({
        interactionIndices,
        interactionType,
      });

      newState.currentSessionData = currentSessionData;
      break;
    }

    /**
     * Replaces the confusing data at the index with the one given by the labeler
     */
    case ActionTypes.SetHarmfulSelections: {
      const { currentSessionData } = newState;
      const { pageIndex } = newState;

      const interactionIndices: number[] = action.selectionIndex!;
      const harmfulSelections: number[] = action.harmfulSelections!;

      newState.currentSessionData.confusingWordData.splice(
        newState.taskData.currentReviewIndex,
        1,
        harmfulSelections
      );

      let interactionType: InteractionTypeEnum = InteractionTypeEnum.Deselect;

      // Ideally, the values over the range of the indecies in the vector should be the same.
      switch (harmfulSelections[interactionIndices[0]]) {
        case 0: {
          interactionType = action.dragged!
            ? InteractionTypeEnum.DragDeselect
            : InteractionTypeEnum.Deselect;

          break;
        }
        case 1: {
          interactionType = action.dragged!
            ? InteractionTypeEnum.DragSelect
            : InteractionTypeEnum.DragSelect;

          break;
        }
        case 2: {
          interactionType = action.dragged!
            ? InteractionTypeEnum.DragStrongSelect
            : InteractionTypeEnum.DragStrongSelect;

          break;
        }
      }

      // Adds this selection as a new interaction
      currentSessionData.totalInteractions[pageIndex]++;
      currentSessionData.interactions[pageIndex].push({
        interactionIndices,
        interactionType,
      });

      newState.currentSessionData = currentSessionData;

      break;
    }

    /**
     * Replaces the confusing data at the index with the one given by the labeler
     */

    case ActionTypes.SetOppositeSelections: {
      const { currentSessionData } = newState;
      const { pageIndex } = newState;

      const interactionIndices: number[] = action.selectionIndex!;
      const oppositeSelections: number[] = action.oppositeSelections!;

      newState.currentSessionData.oppositeWordData.splice(
        newState.taskData.currentReviewIndex,
        1,
        oppositeSelections
      );

      let interactionType: InteractionTypeEnum = InteractionTypeEnum.Deselect;

      // Ideally, the values over the range of the indecies in the vector should be the same.
      switch (oppositeSelections[interactionIndices[0]]) {
        case 0: {
          interactionType = action.dragged!
            ? InteractionTypeEnum.DragDeselect
            : InteractionTypeEnum.Deselect;

          break;
        }
        case 1: {
          interactionType = action.dragged!
            ? InteractionTypeEnum.DragSelect
            : InteractionTypeEnum.DragSelect;

          break;
        }
        case 2: {
          interactionType = action.dragged!
            ? InteractionTypeEnum.DragStrongSelect
            : InteractionTypeEnum.DragStrongSelect;

          break;
        }
      }

      // Adds this selection as a new interaction
      currentSessionData.totalInteractions[pageIndex]++;
      currentSessionData.interactions[pageIndex].push({
        interactionIndices,
        interactionType,
      });

      newState.currentSessionData = currentSessionData;

      break;
    }

    /**
     * Sets the confidence according to the users selections
     */
    case ActionTypes.SetConfidence: {
      const { currentReviewIndex } = newState.taskData;

      const interaction: IInteraction = {
        interactionIndices: action.confidence!,
        interactionType:
          action.confidence![0] ===
            newState.currentSessionData.confidenceData[currentReviewIndex][0]
            ? InteractionTypeEnum.selectionConfidenceChange
            : InteractionTypeEnum.labelConfidenceChange,
      };

      newState.currentSessionData.confidenceData[
        currentReviewIndex
      ] = action.confidence!;

      newState.currentSessionData.interactions[newState.pageIndex].push(
        interaction
      );
      newState.currentSessionData.totalInteractions[newState.pageIndex]++;

      break;
    }

    /**
     * Pushes the data to the server
     */
    case ActionTypes.PushData: {
      const {
        currentSessionData: sessionData,
        noDrag,
        onlyLabel,
        params,
        taskData,
      } = newState;

      const {
        instructions,
        shouldAllowAttentionLevels,
        shouldLabelOpposite,
        test
      } = params

      const { pageTimes, userId } = taskData;
      const reviewIds: number[] = taskData.reviews.map(
        (review: IReview): number => review.id
      );

      const exportData: IExportData = {
        instructions,
        noDrag,
        pageTimes: pageTimes.map(t => t.toString(10)),
        reviewIds,
        sessionData,
        shouldAllowAttentionLevels,
        shouldLabelOpposite,
        shouldOnlyLabel: onlyLabel,
        userId,
      };

      console.log(exportData);

      const client: SUPERServerClient = new SUPERServerClient();
      client.setAttentionData(exportData, newState.params.instructions > 0, test).then((res: Response) => {
        global.console.log(res.status);
        global.console.log(res.statusText);
        const genLastSurvey = (u: number, i: number, nd: boolean, ol: boolean ): string => `YOURQUALTRICSURL?userId=${u}&condition=${i}&noDrag=${nd}&onlyLabel=${ol}`
        if (!test)
          window.location.href = genLastSurvey(userId, instructions, noDrag, onlyLabel);
      })

      break;
    }

    /**
     * Initializes by fetching data and preparing data structures
     */
    case ActionTypes.Init: {
      const client: SUPERServerClient = new SUPERServerClient();

      if (newState.params.instructions > -1) {
        client.getInstructionsSetReviews().then((data: IReview[]) => {
          newState.taskData.reviews = data
          data.forEach((review: IReview) => {
            const attention: number[] = TextUtils.split(review.review).map((str: string) => TextUtils.strToSelectedValue(str));
            if (!newState.onlyLabel)
              newState.currentSessionData.attentionData.push(attention);

            if (newState.params.shouldShowConfusingWords)
              newState.currentSessionData.confusingWordData.push([...attention]);

            if (newState.params.shouldLabelOpposite)
              newState.currentSessionData.oppositeWordData.push([...attention]);

            newState.dispatch(setNewState(newState));
            newState.dispatch(setCanContinue(true));
          });
        })
      }
      else {
        client.getIds(state.taskData.userId).then((dataTup: [number, number[]]) => {
          newState.params.userId = dataTup[0]

          // We need to set this so users get the same list of ids
          CookieJar.setCookieValue('userId', dataTup[0]);

          // List of fetch promises
          const fetchPromises: Array<Promise<
            IReview
          >> = dataTup[1].map((id: number) => client.getReview(id));

          // Much better solution to handling the fetch request
          // User can only continue when all of the reviews are present
          Promise.all<IReview>(fetchPromises).then((promises: IReview[]) => {
            promises.forEach((review: IReview, i: number) => {
              const id: number = dataTup[1][i];
              const storeObject: IReview = { ...review, id };

              newState.taskData.reviews.push(storeObject);
              const attention: number[] = TextUtils.split(
                storeObject.review
              ).map((str: string) => TextUtils.strToSelectedValue(str));

              if (!newState.onlyLabel)
                newState.currentSessionData.attentionData.push(attention);

              if (newState.params.shouldShowConfusingWords)
                newState.currentSessionData.confusingWordData.push([...attention]);

              if (newState.params.shouldLabelOpposite)
                newState.currentSessionData.oppositeWordData.push([...attention]);

            });

            newState.dispatch(setNewState(newState));
            newState.dispatch(setCanContinue(true));
          });
        });
      }
      break;
    }
  }
  return newState;
};

export default dataReducer;
