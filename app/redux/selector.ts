import store from './store';
import get from 'lodash/get';

export const getSlashStatus = (state?: any): any => get(state || store.getState(), 'popup.component');
export const getState = (state?: any): any => get(state || store.getState(), 'popup');
export const getSlashSelect = (state?: any): any => get(state || store.getState(), 'popup.options.currentSelect');