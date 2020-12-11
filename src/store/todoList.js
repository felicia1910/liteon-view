import { applyMiddleware, createStore} from "redux"
import logger from 'redux-logger';
import {tableListReducer} from "../reducers"

//const tableListStore = createStore(tableListReducer, applyMiddleware(logger))
const tableListStore = createStore(tableListReducer)

export {tableListStore}