import Button from "BaseComponents/Button";
import Column from "BaseComponents/Column";
import Row from "BaseComponents/Row";
import TextInput from "BaseComponents/TextInput";
import Typography from "BaseComponents/Typography";
import { useState } from "react";
import toast from "react-hot-toast";

function ListControl(props: any) {
    const [adding, setAdding] = useState(false);
    const [nextInput, setNextInput] = useState("");

    const renderAddingRegion = () => {
        if (adding) {
            return <Row>
                <TextInput value={nextInput} onChange={(v: string) => {
                    setNextInput(v);
                }} />
                <Button width={15} height={15} label="Save" onClick={() => {
                    setAdding(false);
                    props.onAdd(nextInput);
                }} />
            </Row>
        }
        else {
            return <Button width={15} height={15} img="add.svg" onClick={() => {
                setAdding(true);
                setNextInput("");
            }} />
        }
    }

    const renderItemsRegion = () => {
        let items = [];

        for (let i = 0; i < props.items.length; i++) {
            items.push(<Typography white={true} skey={i}>{props.items[i]}</Typography>)
        }

        return items;
    }
    
    return <Row>
        <Column>
            {renderItemsRegion()}
            {renderAddingRegion()}
        </Column>
    </Row>
}

export default ListControl;
