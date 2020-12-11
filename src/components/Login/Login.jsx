import React from "react"
import ServerApi from "../../services/startServices"
import { connect } from "react-redux"
import { isRunning } from "../../actions"

class ConnectLogin extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            name:(localStorage.getItem('user_name'))?localStorage.getItem('user_name'):'',
            password:'',
        }
        this.handleInputChange=this.handleInputChange.bind(this)
        this.checkToken=this.checkToken.bind(this)
    }
    //input的值變動
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({[name]: target.value});
    }
    //登錄
    async loginHandle(val){
        let req={grant_type:'password',username:val.name,password:val.password}
        localStorage.setItem('user_name', val.name)//把登錄帳號先存進這裡，下次可以直接用這帳號
        this.props.isRunning(true)
        //
        //原本接api拔掉
        window.sessionStorage.setItem('login_token', 'testToken123');
        this.props.history.push("/");
        this.props.isRunning(false)
        // await ServerApi.Login(req)
        // .then(res=>{
        //     window.sessionStorage.setItem('login_token', res.access_token);
        //     this.props.history.push("/");
        //     this.props.isRunning(false)
        // })
        // .fail(res=>{
        //     alert(res.responseJSON.error)
        //     this.props.isRunning(false)
        // })
    }
    //如果已經有token就直接登陸
    checkToken(){
        if(this.state.token){
            this.props.history.push("/");  
        }
    }
    render(){
        return(
            <div className={'table-bc login-bc'}>
                <div className="login-big-box">
                    <h3>登錄：</h3>
                    <div className="login-box">
                        <div className="login-inside-box">
                            <p> name: </p>
                            <input type="text" name="name" onChange={this.handleInputChange} value={this.state.name}/>
                        </div>
                        <div className="login-inside-box">
                            <p> password: </p><input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}/>
                        </div>
                        <div className="login-btn"><div className="btn" onClick={this.loginHandle.bind(this,{name:this.state.name,password:this.state.password})}>登錄</div></div>
                    </div>
                </div>
            </div>
        )
    }
    //一開始呼叫
    async componentDidMount(){
        await this.checkToken()
    }
}
const mapDispatchToProps = dispatch => {
    return {
        //使用dispatch操作store
        isRunning: data => dispatch(isRunning(data))
    }
}
const Login = connect(null, mapDispatchToProps)(ConnectLogin)

export {Login}