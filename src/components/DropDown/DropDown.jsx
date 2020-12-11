import React from "react"

class DropDown extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            text:'編輯'
        }
    }
    handleChangeState(item){
        this.props.changeState(item)
    }
    //渲染
    render(){
        return (
            <div className="dropdown">
            <button class="btn dropdown-toggle dropdown-btn" type="button" 
            id="dropdownMenuButton" 
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
              <div>{this.props.text}</div>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {this.props.tableDrop.map(item =>
                    <a className="dropdown-item" href="javascript:;"
                    onClick={this.handleChangeState.bind(this,item)}
                    >{item.name}</a>
                )}
            </div>
          </div>
        )
    }
}

export { DropDown }