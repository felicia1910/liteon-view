import React from "react"
import { HashRouter, Route,Router } from "react-router-dom"
import { TopBlock } from "../TopBlock"
import { Login } from "../Login"
import { Table } from "../Table"
import { Detail } from "../Detail"
import { createBrowserHistory } from 'history';
import { connect } from "react-redux"
import { tableListStore } from "../../store"


class ConnectRealMain extends React.Component {
    constructor(props) {
        super(props)
        this.history = createBrowserHistory();
        this.state={
            running:this.props.data.running
        }
        this.change=this.change.bind(this)
        tableListStore.subscribe(async () => {
            await this.change(tableListStore.getState())
        })
    }
    change(val){
        //這樣裝才會變
        const incrementCount=(state)=> {return {...state, running: val.running};}
        this.setState(incrementCount);
    }
    render() {
        return (
            <HashRouter>
                <div class="alignCenter"> 
                    {this.state.running?<div className="running-box"></div>:null}
                    <TopBlock history={this.history}/>
                    <div class="table-main">
                        <Route exact path="/Login" component={Login} />
                        <Route exact path="/" component={Table} />
                        <Route exact path="/Detail/:str" component={Detail} />
                    </div>
                </div>
            </HashRouter>
        )
    }
}
//資料庫
const mapStateToProps = state => {
    return { data: state}
}
const RealMain = connect(mapStateToProps)(ConnectRealMain)
export { RealMain }