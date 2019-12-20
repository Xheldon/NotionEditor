import { createStore } from 'redux';

import reducers from './reducers';

let store = createStore(reducers);

export const rdxDispatch = store.dispatch;

export default store;