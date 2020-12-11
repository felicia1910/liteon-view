import React from "react"
import { DetailPdf } from'./DetailPdf'
import ServerApi from "../../services/startServices"
import { connect } from "react-redux"
import { isRunning } from "../../actions"

class ConnectDetail extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            logo:[{name:'logo-1'},{name:'logo-2'},{name:'logo-3'}],
            parms:(this.props.data.detailData)?this.props.data.detailData:[],
            all:{Status:{Name:'',Id:''}},
            putCardData:[],
            open:true,
            inpueText:'Drag and drop a file',
            token:sessionStorage.getItem('login_token')?sessionStorage.getItem('login_token'):''
        }
        this.callData = this.callData.bind(this)
        this.getCardHeight=this.getCardHeight.bind(this)
        this.upload=this.upload.bind(this)
        this.fileOn=this.fileOn.bind(this)
    }
    //行為設定
    async callData(val){
        this.props.isRunning(true)
        let req={contractId:val}
        //原本call
        let getD=this.state.parms
        let inputDataAll=[
            {name:'合同名稱',input:getD.Name},
            {name:'建立時間',input:getD.CreateTime},
            {name:'完成時間',input:getD.CompleteTime},
            {name:'原價',input:getD.Amount},
            {name:'折扣後金額',input:(getD.CurrentAmount==null)?getD.Amount:getD.CurrentAmount},
        ]
        this.setState({ putCardData: inputDataAll})
        this.setState({ all: getD})
        this.props.isRunning(false)
        // await ServerApi.ContractDetail(req)
        // .then(res=>{
        //     if(res.IsSuccess){
        //         let getD=res.Data
        //         let inputDataAll=[
        //             {name:'合同名稱',input:getD.Name},
        //             {name:'建立時間',input:getD.CreateTimeString},
        //             {name:'完成時間',input:getD.CompleteTimeString},
        //             {name:'原價',input:getD.Amount},
        //             {name:'折扣後金額',input:(getD.CurrentAmount==null)?getD.Amount:getD.CurrentAmount},
        //         ]
        //         this.setState({ putCardData: inputDataAll})
        //         this.setState({ all: getD})
        //     }
        //     this.props.isRunning(false)
        // })
    }
    //卡片開關
    handleChangeState(){
        this.setState({open:!this.state.open?true:false})
    }
    //一開始操控卡片的高度
    getCardHeight(){
        let getHeight=$('.card').height()
        $('.card-handle').css('height',getHeight)
        $('.card-ret').css('height',getHeight)
    }
    //收到檔案變化字的
    fileOn() {
        this.setState({inpueText: $("#file-uploader").get(0).files[0].name});
    }
    //上傳
    async upload(){
        let vi=this
        $('#ajax-upload').on('submit',async function(e){
            //上傳
            e.preventDefault();
            let form = e.target;
            let data = new FormData(form);
            console.log(form)
            console.log(data)
            // vi.props.isRunning(true)
            // await ServerApi.UploadContractForReseller(data)
            // .then(res=>{
            //     let resObj = JSON.parse(res);
            //     if(resObj.IsSuccess){
            //         alert('上傳成功')
            //         let obj=vi.state.all
            //         obj.Status.Id=100000001
            //         vi.setState({all:obj})
            //         vi.callData(vi.state.all.ContractId)
            //     }else{
            //         alert(resObj.Message)
            //     }
            //     vi.props.isRunning(false)
            // })
            // .catch(err=>{
            //     console.log(err)
            //     vi.props.isRunning(true)
            // })
        })
    }
    render(){
        return (
            <div class="table-main">
                <div className="table-bc table-bc-blue">
                    <div className={"card "+ (this.state.open?'':'card-close')}>
                            <div className="card-ret">
                                <div className="card-logo">
                                    {this.state.logo.map(item =>
                                        <div className={'card-logo-line '+item.name}></div>
                                    )}
                                </div>
                                    <div className="card-title">ContractDetail</div>
                                    <div className="card-small-title">{this.state.all.Status.Name}</div>
                                <div className="card-detail-box">
                                    {this.state.putCardData.map(item =>
                                        <div className={"card-detail "+(item.name==='合同名稱'?'card-detail-name-sp':'')}>
                                            <div className="card-detail-name">{item.name}</div>
                                            <input type="text" value={item.input} readOnly/>
                                        </div>
                                    )}
                                </div>
                                {this.state.all.Status.Id==100000000?
                                    <form id="ajax-upload"  className="card-btn" method="post">
                                        <input class="none" type="text" name="contractId" value={this.state.all.ContractId} />
                                        <div class="inputDnD">
                                            <input type="file" name="file" id="file-uploader" class="form-control-file text-primary font-weight-bold" accept="pdf/*" onChange={this.fileOn} data-title={this.state.inpueText}/>
                                        </div>
                                        <button className="btn" type="submit">Send</button>
                                    </form>:<div className="noting-box"></div>}
                                    
                            </div>
                            <div className={"card-handle "+ (this.state.open?'':'card-handle-close')} onClick={this.handleChangeState.bind(this)}>
                                {this.state.open?<i class="fas fa-chevron-right"></i>:<i class="fas fa-chevron-left"></i>}
                            </div>
                    </div>
                    <DetailPdf id={this.props.data.detailData.ContractId}/>
                </div>
            </div>
        )
    }

    //一開始呼叫
    async componentDidMount(){
        await this.callData(this.props.data.detailData.ContractId)
        this.getCardHeight()
        this.upload()
    }
}

//資料庫
const mapStateToProps = state => {
    return { data: state}
}
const mapDispatchToProps = dispatch => {
    return {
        //使用dispatch操作store
        isRunning: data => dispatch(isRunning(data)),
    }
}
const Detail = connect(mapStateToProps, mapDispatchToProps)(ConnectDetail)
export { Detail }
