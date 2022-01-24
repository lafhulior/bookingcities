import {Route, RouteProps, Redirect} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {AppRoute, AuthorizationStatus} from '../../utils/const';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element,
};

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRouteLogin(props: ConnectedComponentProps): JSX.Element {
  const {exact, path, render, authorizationStatus} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? <Redirect to={AppRoute.Main} />
          : render()
      )}
    >
    </Route>
  );
}

export {PrivateRouteLogin};
export default connector(PrivateRouteLogin);
