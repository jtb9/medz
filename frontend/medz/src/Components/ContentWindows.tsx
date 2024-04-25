import Button from "BaseComponents/Button";
import Column from "BaseComponents/Column";
import Menu from "BaseComponents/Menu";
import Row from "BaseComponents/Row";
import Typography from "BaseComponents/Typography";
import Window from "BaseComponents/Window";
import toast from "react-hot-toast";
import { useUserStore } from "State/user_state";
import ListControl from "Components/ListControl";

function ContentWindows(props: any) {
    const state = useUserStore(state => state);
    const contentKeys = Object.keys(state.data.content);

    const renderContentWindow = (contentEntry: any) => {
        if (contentEntry.type === "list") {
            return <Window
                id={`${contentEntry.id}-window`}
                title={contentEntry.name}
                height="270px"
                width="450px"
                onClose={() => {
                    state.patchDataAttributeState("content", {
                        open: false
                    }, contentEntry.id)
                }}
            >
                <ListControl onAdd={(item: string) => {
                    state.patchDataAttributeState("content", {
                        items: [...contentEntry.items, item]
                    }, contentEntry.id)
                }} items={contentEntry.items} />
            </Window>
        }

        return <span />
    }

    const renderContentWindows = () => {
        let windows: any[] = [];

        for (let i = 0; i < contentKeys.length; i++) {
            //@ts-ignore
            const contentEntry = state.data.content[contentKeys[i]];

            if (contentEntry.open === true) {
                windows.push(
                    renderContentWindow(contentEntry)
                )
            }
        }

        return <>
            {windows}
        </>
    }

    return renderContentWindows();
}

export default ContentWindows;
