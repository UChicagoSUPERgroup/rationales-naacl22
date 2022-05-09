// React
import * as React from "react";

// Global State
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Actions
import { setLastPageIndexAction } from "../GlobalContext/actions";

// Material Components
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip"
import ArrowBack from "@material-ui/icons/ArrowBack";

/**
 * Props for the continue button
 *
 * @extends IInjectWithState
 */
interface IContinueButtonProps extends IInjectWithState {}

/**
 * Button that switches the global states current view with he next view
 *
 * @extends React.Component<IContinueButtonProps>
 */
class BackButton extends React.Component<IContinueButtonProps> {
  public render(): JSX.Element {
    const { globalState } = this.props;

    /**
     * Goes back a page if possible
     */
    const lastPage = () => {
      if (globalState.canGoBack) {
        globalState.dispatch(setLastPageIndexAction);
      }
    };

    return (
      <Tooltip title={globalState.backBtnTooltip}>
        <Fab
          className={globalState.canGoBack ? "back-button" : "back-button-disabled"}
          color="primary"
          disableRipple={!globalState.canGoBack}
          onClick={globalState.canGoBack ? lastPage : () => {/**/}}
        >
          <div>
            <Icon>
              <ArrowBack style={globalState.canGoBack ? {} : {color: "#850000"}}/>
            </Icon>
          </div>
        </Fab>
      </Tooltip>
    );
  }
}
export default withState<IContinueButtonProps>(BackButton);
