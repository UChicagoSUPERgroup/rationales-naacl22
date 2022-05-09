// React
import * as React from "react";

// Global State
import withState, { IInjectWithState } from "../GlobalContext/withState";

// Material Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

/**
 * Injects Global State into the CustomAppBar class
 *
 * @extends IInjectWithState
 */
interface IAppBarProps extends IInjectWithState { }

/**
 * The persisting app bar at the top of the page
 *
 * @extends React.Component<IAppBarProps>
 */
class CustomAppBar extends React.Component<IAppBarProps> {
  public render() {
    const { globalState } = this.props;
    const {
      appBarTitle,
      numNonActionPages,
      pageIndex,
      taskData,
      pages,
    } = globalState;
    const onLastPage: boolean = pageIndex === pages.length - 1;

    return (
      <div>
        <AppBar className={"appBarBody"}>
          <Toolbar>
            <Typography color="inherit" className={"title"}>
              {appBarTitle}
            </Typography>
            {pageIndex > numNonActionPages - 1 ? (
              <Typography color="inherit" className={"counter"}>
                {!onLastPage
                  ? `On review ${taskData.currentReviewIndex + 1} of ${taskData.numReviews
                  }`
                  : "Done!"}
              </Typography>
            ) : null}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withState<IAppBarProps>(CustomAppBar);
