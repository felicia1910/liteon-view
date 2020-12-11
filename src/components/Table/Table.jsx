import React from "react"
import { connect } from "react-redux"
import { DropDown } from "../DropDown"
import { TableListBody } from "./TableList"
import ServerApi from "../../services/startServices"
import Pagination from "react-js-pagination";
import { isRunning } from "../../actions"
import dataTmp from "./dataTmp.js" 

class ConnectTableHead extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            tableListData:[],
            showTableDate:[],
            state:{name:'狀態',id:null},
            activePage:1,//當前第幾頁
            onePageItemNumber:8,//一頁幾個
            perPage:0,//計算data現在要show哪個
            token:sessionStorage.getItem('login_token'),
            testM:'U+1F600'
        }
        this.checkToken=this.checkToken.bind(this)
        this.callTableListData = this.callTableListData.bind(this)
        this.changeState = this.changeState.bind(this)
        this.sortTableListData = this.sortTableListData.bind(this)
        this.handlePageChange=this.handlePageChange.bind(this)
        this.handleShowTable=this.handleShowTable.bind(this)
    }
    //行為設定
    //檢查是否有token,沒有的話跳到登錄頁面
    async checkToken(){
        if(this.state.token==undefined){
            this.props.history.push("/Login");     
        }else{
            await this.callTableListData() //拿token去callApi
            this.handleShowTable(0)  //一開始的page計算
        }
    }
    //callApi
    async callTableListData(){
        this.props.isRunning(true)
        //原本call api
        console.log(dataTmp.data)
        for(let i =8;i<30;i++){
            dataTmp.data.Data[i]=dataTmp.data.Data[7]
 
        }
        
        this.setState({ tableListData: dataTmp.data.Data })
        this.props.isRunning(false)
        // await ServerApi.ContractList()
        // .then(res=>{
        //     console.log(res)
        //     if(res.IsSuccess){
        //         this.setState({ tableListData: res.Data })
        //     }else{
        //         alert(res.Data.Message)
        //         sessionStorage.removeItem('login_token');
        //         this.props.history.push("/Login"); 
        //     }
        //     this.props.isRunning(false)
        // })
    }
    //下拉式狀態選擇
    async changeState(val){
        let req={name:val.name,id:val.id}
        this.setState({ state: req })
        await this.sortTableListData(req)
        this.handleShowTable(this.state.perPage)
    }
    //選完狀態去排序
    sortTableListData(val){
        let newTableList=this.state.tableListData
        newTableList.sort(function (a, b) {
            let strA = a.Status.Id
            let strB = b.Status.Id
            if (strA ==val.id) {
                return -1
            }else if (strB ==val.id) {
                return 1
            }else{
                return strA > strB ? 1 : -1;
            }
        });
        this.setState({ tableListData: newTableList })
    }
    //換頁時去處理的頁數
    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        if(this.state.activePage!==pageNumber){
            let pageComputed=(pageNumber-1) * this.state.onePageItemNumber
            this.setState({activePage: pageNumber});
            this.setState({perPage: pageComputed})
            this.handleShowTable(pageComputed)
        }
    }
    //換頁完去製作show出來的資料
    handleShowTable(val){
        let dataAll=this.state.tableListData
        let show=dataAll.slice(val, val + this.state.onePageItemNumber)
        this.setState({showTableDate: show})
    }

    render(){
        return (
            <div className={"table-bc"}>
                <div className="table">
                    <div className="table-head">
                        {this.props.data.tableTitle.map(item =>
                            <div className="table-head-small">{item.name}</div>
                        )}
                        <DropDown tableDrop={this.props.data.tableDrop}
                        changeState={this.changeState} text={this.state.state.name}/>
                    </div>
                    <TableListBody data={this.state}/>
                </div>
                <Pagination
                    hideFirstLastPages
                    pageRangeDisplayed={10}
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.onePageItemNumber}
                    totalItemsCount={this.state.tableListData.length}
                    onChange={this.handlePageChange}
                    />
            </div>
        )
    }
    //一開始呼叫，redux失敗，先用普通的方式call api
    async componentDidMount(){
        await this.checkToken()
    }
}
//資料庫
const mapStateToProps = state => {
    return { data: state}
}

const mapDispatchToProps = dispatch => {
    return {
        //使用dispatch操作store
        isRunning: data => dispatch(isRunning(data))
    }
}
const Table = connect(mapStateToProps, mapDispatchToProps)(ConnectTableHead)

export { Table }
