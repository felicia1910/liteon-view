import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getDetail } from "../../../actions"

class ConnectTableListBody  extends React.Component{
    constructor(props) {
        super(props)
    }
    clickItem(item){
        console.log(item)
        this.props.getDetail(item)
    }
    render(){
        console.log(this.props)
        return (
            <div className="table-body">
                {this.props.data.showTableDate.map(item=>
                    <div className={ 'table-body-box ' +(item.Status.Name==='拒絕'? 'bc-gray':item.Status.Name==='同意'?'bc-green':'') }>
                        <div className="table-body-small">
                            <Link to={{pathname:`/Detail/${item.Name}`}}>
                                <i className={"fas fa-edit "+(item.Status.Name==='經銷商待簽名'? 'text-red':'')} onClick={this.clickItem.bind(this,item)}></i>
                            </Link>
                        </div>
                        <div className="table-body-small">{item.Name}</div>
                        <div className="table-body-small">{item.CreateTimeString}</div>
                        <div className="table-body-small">{item.CompleteTimeString}</div>
                        <div className="table-body-small">{item.Amount}</div>
                        <div className="table-body-small">{item.CurrentAmount}</div>
                        <div className={"table-body-small "+(item.Status.Name==='經銷商待簽名'? 'text-red':'')}>{item.Status.Name}</div>
                    </div>
                )}
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        //使用dispatch操作store
        getDetail: data=> dispatch(getDetail(data)),
    }
}
const TableListBody = connect(null, mapDispatchToProps)(ConnectTableListBody)
export { TableListBody }
