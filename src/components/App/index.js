import React, { useReducer, useEffect, useState } from 'react';
import currentUserReducer from 'components/App/current-user-reducer';
import Routes from 'components/Routes';
import Cookie from 'js-cookie';
import './style.scss';

import { api } from 'api';

export const CurrentUserContext = React.createContext(undefined);
const currentUserInitialState = undefined;

function App() {
  const [state, dispatch] = useReducer(currentUserReducer, currentUserInitialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookie.get('token');

    if (token) {
      setLoading(true);
      api.get(`/get-user`).then((resp) => {
        dispatch({type: 'SET_CURRENT_USER', payload: resp.data.user });
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
      })
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{dispatch, state}}>
      {loading ? <div className="pageloader is-active"><span className="title">Loading...</span></div> : <Routes />}
    </CurrentUserContext.Provider>
  );
}

export default App;
