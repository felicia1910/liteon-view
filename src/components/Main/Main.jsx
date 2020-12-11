import React from "react"
import { Provider } from "react-redux"
import { tableListStore } from "../../store"
import { RealMain } from '../RealMain'


class Main extends React.Component {

    render() {
        return (
            <Provider store={tableListStore}>
                <RealMain/>
            </Provider>
        )
    }
}
export { Main }