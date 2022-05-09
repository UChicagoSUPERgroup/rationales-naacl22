// Global State
import { IGlobalState } from "./globalState";

// Action
import IAction, { IDataAction, IInterfaceAction, ReducerType } from "./actions";

// Reducers
import dataReducer from "./Reducers/dataReducer";
import interfaceReducer from "./Reducers/interfaceReducer";

/**
 * Takes an action and sends it to the appropriate reducer
 *
 * @param state The current state of the application
 * @param action How you want to change the state of the application
 */
const reducer = (state: IGlobalState, action: IAction): IGlobalState =>
  ((): IGlobalState => {
    switch (action.reducerType) {
      case ReducerType.Interface:
        return interfaceReducer(state, action as IInterfaceAction);
      case ReducerType.Data:
        return dataReducer(state, action as IDataAction);
      default:
        return state;
    }
  })();

export default reducer;
