import React from "react"

class DetailPdf extends React.Component{
    constructor(props) {
        super(props)
        this.state={
          api:'https://felicia1910.github.io/ps4girl/',//'https://felicia1910.github.io/UISmall/',
          contractId:(this.props.id)?this.props.id:'4A7237A2-181E-4E39-9A58-4E7FBA64F467',
          apiUrl:''
        }
        this.callData = this.callData.bind(this)
    }
    callData(){
      this.setState({apiUrl:this.state.api})
      // this.setState({apiUrl:this.state.api + this.state.contractId})
    }
    render(){
        return (
          <iframe className="pdf-box" src={this.state.apiUrl} frameborder="0"></iframe>
        )
    }
    //一開始呼叫
    async componentDidMount(){
        console.log(this.props)
        await this.callData()
    }
}

export { DetailPdf }

