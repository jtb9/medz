import Button from "BaseComponents/Button";
import Column from "BaseComponents/Column";
import Row from "BaseComponents/Row";
import Typography from "BaseComponents/Typography";
import Window from "BaseComponents/Window";
import toast from "react-hot-toast";
import { useUserStore } from "State/user_state";
import ListControl from "Components/ListControl";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

function ContentWindows(props: any) {
    const state = useUserStore(state => state);
    const contentKeys = Object.keys(state.data.content);

    const getWindowHeight = (key: string) => {
        let height = '0px';

        try {
            height = state.view.component_state[key].height;
        }
        catch(e) {

        }

        return height;
    }

    const renderGenericWindowControls = (openButton: any, items: any, onClick: any) => {
        let itemsR: any[] = [];

        items.forEach((item: any) => {
            itemsR.push(
                <MenuItem onClick={() => {
                    onClick(item.id)
                }}>
                    {item.label}
                </MenuItem>
            )
        })

        return <Menu menuButton={openButton} transition>
            {itemsR}
        </Menu>
    }

    const renderContentWindowControls = (contentEntry: any, contentKey: any) => {
        const windowKey = `${contentEntry.id}-window`;

        if (contentEntry.type === "list") {
            return <ListControl 
                windowHeight={getWindowHeight(windowKey)}
                contentKey={contentKey}
                // onAdd={(item: string) => {
                //     state.patchDataAttributeState("content", {
                //         items: [...contentEntry.items, item]
                //     }, contentEntry.id)
                // }} 
                // items={contentEntry.items} 
            />
        }
    }

    const renderContentWindow = (contentEntry: any, contentKey: any) => {
        const windowKey = `${contentEntry.id}-window`;

        return <Window
            id={windowKey}
            title={contentEntry.name}
            onClose={() => {
                state.patchDataAttributeState("content", {
                    open: false
                }, contentEntry.id)
            }}
            headerControls={[
                renderGenericWindowControls(
                    <MenuButton style={{position: 'relative', top: '3px', height: '18px'}}><img style={{position: 'relative', top: '-6px', width: '7px', height: '7px'}} src="menu.svg" alt="window options" /></MenuButton>,
                    [{
                        label: "Delete",
                        id: 'delete'
                    }],
                    (id: string) => {
                        if (id === "delete") {
                            console.log("deleting")
                            state.patchDataAttributeState("content", undefined, contentKey);
                            state.patchDataAttributeState("view", undefined, windowKey);
                        }
                    }
                )
            ]}
        >
            {renderContentWindowControls(contentEntry, contentKey)}
        </Window>
}

const renderContentWindows = () => {
    let windows: any[] = [];

    for (let i = 0; i < contentKeys.length; i++) {
        //@ts-ignore
        const contentEntry = state.data.content[contentKeys[i]];

        if (contentEntry.open === true) {
            windows.push(
                renderContentWindow(contentEntry, contentKeys[i])
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
