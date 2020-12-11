import React from "react"
import LogoImage from '../../style/img/logo.svg';
import LogoBcImage from '../../style/img/logo_bc.svg';
import { createBrowserHistory } from "history";

class TopBlock extends React.Component{
    constructor(props){
        super(props)
        this.history = createBrowserHistory();
        this.state={
            //user01@gmail.com
            url:this.props.history.location.pathname,
            user: localStorage.getItem('user_name')?localStorage.getItem('user_name'):'',
        }
    }
    //回首頁
    goHome(){
        //有token才可以跳首頁//如果已經在首頁就不要跳
        if(sessionStorage.getItem('login_token')&& window.location.hash!=='#/'){
            window.location.href=this.state.url
        }
    }
    //登出
    goingOut(){
        //有token才能登出
        if(sessionStorage.getItem('login_token')){
            sessionStorage.removeItem('login_token');
            this.setState({user:''})
            window.location.href=this.state.url + '#/Login'
        }
    }
    render(){
        return(
            <div class="topBlock">
                <div className="top"></div>
                <div className="top-black-box">
                    <div className="top-black">
        {this.state.user==''|| window.location.hash==='#/Login'?null:<div className="top-icon"><div className="user-box"><i class="fas fa-user"></i></div><p>{this.state.user}</p></div>}
                        <div className="top-icon" onClick={this.goHome.bind(this)}><i class="fas fa-home"></i></div>
                        <div className="top-icon" onClick={this.goingOut.bind(this)}><i class="fas fa-sign-out-alt"></i></div>
                    </div>
                    <div className="logo-bc"><LogoBcImage/></div>
                    <div className="top-left-inner-box">
                        <div className="logo" onClick={this.goHome.bind(this)}><LogoImage/></div>
                        <div className="top-title">
                            <h1 className="green-blue-title">CON</h1>
                            <h1 className="black-title">TRACT</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export {TopBlock}