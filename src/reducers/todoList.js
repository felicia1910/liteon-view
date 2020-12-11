import { tableTitle,tableDrop,running,detailData} from "../constants/tableList.js"
import { IS_RUNNING,GET_DETAIL } from "../constants/todoAction-type.js"

const tableListReducer = (state = {tableTitle,tableDrop,running,detailData} , action) => {
    switch (action.type) {
        case IS_RUNNING: {
            state.running=action.payload
            return state
        }
        case GET_DETAIL: {
            state.detailData=action.payload
            return state
        }
        default: {
            return state
        }
    }
}

export { tableListReducer }