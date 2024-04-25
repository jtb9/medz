import { useUserStore } from "State/user_state";
import Column from "BaseComponents/Column";
import Row from "BaseComponents/Row";
import Button from "BaseComponents/Button";
import { useState } from "react";
import TextInput from "./TextInput";

function Menu(props: any) {
    const state = useUserStore(state => state);
    const theme = state.view.theme;
    const [inInput, setInInput] = useState(undefined);
    const [inputValue, setInputValue] = useState("");

    const {
        onSelect,
        items
    } = props;

    const renderBorder = (children: any) => {
        if (theme === 'default') {
            return <div>
                {children}
            </div>
        }

        return children;
    }

    let actionRows = [];

    for (let i = 0; i < items.length; i++) {
        const requiresInput = items[i].requires === "input";

        let actionable = undefined;

        if (requiresInput) {
            if (inInput === items[i].id) {
                actionable = <Row>
                    <TextInput autoFocus={true} value={inputValue} onChange={(newValue:string) => {
                        setInputValue(newValue);
                    }} />
                    <Button label={"Ok"} onClick={() => {
                        onSelect(items[i].id, inputValue);
                    }} />
                </Row>
            }
            else {
                actionable = <Button label={items[i].label} onClick={() => {
                    setInInput(items[i].id);
                    setInputValue("");
                }} />
            }
        }
        else {
            actionable = <Button label={items[i].label} onClick={() => {
                onSelect(items[i].id);
            }} />
        }

        actionRows.push(
            <Row>
                {actionable}
            </Row>
        )
    }

    return renderBorder(
        <Column>
            {actionRows}
        </Column>
    )
}

export default Menu;
