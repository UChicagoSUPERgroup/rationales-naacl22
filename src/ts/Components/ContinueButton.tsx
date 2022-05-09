// React
import * as React from "react";

// Global State
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Actions
import { setNextPageIndexAction } from "../GlobalContext/actions";

// Material Components
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowForward from "@material-ui/icons/ArrowForward";

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
class ContinueButton extends React.Component<IContinueButtonProps> {
  public render(): JSX.Element {
    const { globalState } = this.props;

    /**
     * Sets current view as the next page property
     */
    const nextPage = () => {
      // No need to check canContinue, since button prevents clicking if canContinue is false
      globalState.dispatch(setNextPageIndexAction);
    };

    return (
        <Tooltip title={globalState.continueBtnTooltip}>
            <Fab
              className={globalState.canContinue ? "continue-button" : "continue-button-disabled"}
              color="primary"
              disableRipple={!globalState.canContinue}
              onClick={globalState.canContinue ? nextPage : () => {/**/}} // We want to pass an empty function so we do nothing if we aren't saupposed to continue
            >
              <div>
                <Icon>
                  <ArrowForward style={globalState.canContinue ? {} : {color: "#850000"}}/>
                </Icon>
              </div>
            </Fab>
        </Tooltip>
    );
  }
}
export default withState<IContinueButtonProps>(ContinueButton);
