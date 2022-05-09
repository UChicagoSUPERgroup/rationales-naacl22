import * as React from 'react';

import { GlobalConsumer, IGlobalState } from './globalState';

/* Both are used to remove IInjectWithState from the components props*/

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

/**
 * Prop interface for the components to have access to the globalState object
 *
 * @member globalState The state of the application as an object.
 */
export interface IInjectWithState {
  globalState: IGlobalState;
}

/**
 * Wraps the component in the global consumer, and passing the state as a prop
 * for the Component to use outside of the render function.
 *
 * @param Component The component that is being given the globalState
 *
 * @returns The component with the injected globalState
 */
const withState = <P extends IInjectWithState>(
  Component: React.ComponentType<P>
): React.ComponentType<Subtract<P, IInjectWithState>> =>
  class WithState extends React.Component<Subtract<P, IInjectWithState>> {
    public render(): JSX.Element {
      return (
        <GlobalConsumer>
          {state => <Component {...this.props as P} globalState={state} />}
        </GlobalConsumer>
      );
    }
  };

export default withState;
