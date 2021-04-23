import React from "react"
import { Title as TitleComponent} from "react-native-paper"

function Title(props) {
    return (
        <TitleComponent style={{width: "100%", display: "block"}}>
            {props.titleName}
        </TitleComponent>
    )
}

export default Title