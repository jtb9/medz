import { useUserStore } from "State/user_state";
import Column from "BaseComponents/Column";
import Row from "BaseComponents/Row";
import Button from "BaseComponents/Button";
import { useState } from "react";

function TextInput(props: any) {
    const state = useUserStore(state => state);
    const theme = state.view.theme;

    if (theme === 'default') {
        return <input className="text-input-t-default" autoFocus={props.autoFocus} type="text" value={props.value} onChange={(e) => {
            props.onChange(e.target.value)
        }} />
    }

    return <span />
}

export default TextInput;
