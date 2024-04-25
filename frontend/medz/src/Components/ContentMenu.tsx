import Button from "BaseComponents/Button";
import Column from "BaseComponents/Column";
import Menu from "BaseComponents/Menu";
import Row from "BaseComponents/Row";
import { useState } from "react";
import { useUserStore } from "State/user_state";

function ContentMenu(props: any) {
    const state = useUserStore(state => state);
    const theme = state.view.theme;

    const renderThemeBasedBorder = (children: any) => {
        if (theme === "default") {
            return <div>
                {children}
            </div>
        }

        return children;
    }

    const renderThemeBasedLayout = (children: any) => {
        if (theme === "default") {
            return <Column style={{width: '70px'}}>
                {children}
            </Column>
        }

        return children;
    }

    const renderThemeBasedContentButton = (content: any) => {
        const {
            id,
            type,
            name
        } = content;

        if (type === "list") {
            return <Button label={name} onClick={() => {
                state.patchDataAttributeState("content", {
                    open: true
                }, id)
            }} />
        }

        return <span />
    }

    const renderContentMenu = () => {
        const contentKeys = Object.keys(state.data.content);

        let items: any[] = [];

        for (let i = 0; i < contentKeys.length; i++) {
            //@ts-ignore
            const contentEntry = state.data.content[contentKeys[i]];

            if (contentEntry.open !== true) {
                //@ts-ignore
                items.push(renderThemeBasedContentButton(state.data.content[contentKeys[i]]));
            }
        }

        return renderThemeBasedLayout(items);
    }

    return renderThemeBasedBorder(
        renderContentMenu()
    );
  }
  
  export default ContentMenu;
  