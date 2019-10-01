import { STATUS_ONLINE } from '../constants/connection';

export const selectConnectionStatus = ({ connection }) => connection.status;

export const selectIsOnline = ({ connection }) =>
  connection.status === STATUS_ONLINE;
