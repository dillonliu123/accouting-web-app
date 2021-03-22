import React from "react"
import { Title as TitleComponent} from "react-native-paper"

function Title(props) {
    return (
        <TitleComponent>
            {props.titleName}
        </TitleComponent>
    )
}

export default Title