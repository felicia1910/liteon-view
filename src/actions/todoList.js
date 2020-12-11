import{ IS_RUNNING } from"../constants/todoAction-type.js"
import { GET_DETAIL } from"../constants/todoAction-type.js"
import{GET_TABLE_LIST} from"../constants/todoAction-type.js"

export const isRunning =data=>({
    type: IS_RUNNING,
    payload:data
})

export const getDetail =data=>({
    type: GET_DETAIL,
    payload:data
})

export const getTableList =list=>({
    type: GET_TABLE_LIST,
    payload:list
})