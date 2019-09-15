import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { CurrentUserContext } from 'components/App';

export default function({ component: Component, ...passedProps }) {
  const { state: currentUser } = useContext(CurrentUserContext);

  return (
    <Route {...passedProps} render={(props) => {
      const pathname = props.location.state ? props.location.state.from.pathname : '/';

      return (
        currentUser ?
          <Redirect to={{ pathname }} /> : <Component {...props} />
      )}
    } />
  );
}
