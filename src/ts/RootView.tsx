// React
import * as React from "react";

// Global State
import withState, { IInjectWithState } from "./GlobalContext/withState";

// Components
import BackButton from "./Components/BackButton";
import ContinueButton from "./Components/ContinueButton";
import CustomAppBar from "./Components/CustomAppBar";

// Actions
import { grabData } from "./GlobalContext/actions";

// Device
import { isMobile } from "react-device-detect";

/**
 * Root View Props that injects global state into the Root View
 *
 * @extends IInjectWithState
 */
interface IRootProps extends IInjectWithState {}

// Styles
const rootStyle = {
  MozUserSelect: "none" as "none",
  MsUserSelect: "none" as "none",
  WebkitUserSelect: "none" as "none",
  flexGrow: 1,
  height: "100%",
  overflow: "hidden" as "hidden",
  position: "relative" as "relative",
  userSelect: "none" as "none",
  width: "100%",
  zIndex: 1,
};

const contentStyle = {
  backgroundColor: "white",
  height: "100%",
  minWidth: 0,
  paddingBottom: " 150px",
  paddingTop: "150px",
  width: "100%",
};

/**
 * The root view initializes the global state and holds the AppBar, StepsDrawer and content view
 *
 * @extends React.Component<IRootProps>
 */
class RootView extends React.Component<IRootProps> {
  constructor(props: IRootProps) {
    super(props);

    const { globalState } = this.props;

    if (!isMobile) globalState.dispatch(grabData);
  }

  public render(): JSX.Element {
    const { pages, pageIndex } = this.props.globalState;
    return (
      <div style={rootStyle}>
        <CustomAppBar />
        <div className={"sub-appbar"}>
          <div style={contentStyle}>{pages[pageIndex]}</div>
        </div>
        <ContinueButton />
        <BackButton />
      </div>
    );
  }
}

export default withState<IRootProps>(RootView);
