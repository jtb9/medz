import Button from "BaseComponents/Button";
import Menu from "BaseComponents/Menu";
import { useState } from "react";
import { useUserStore } from "State/user_state";

function ActionBar(props: any) {
    const [open, setOpen] = useState(false);
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

    const renderActionBar = () => {
        if (open) {
            return <Menu
                items={[{ id: 'new-list', label: "New List", requires: 'input' }]}
                onSelect={(id: string, subValue?: string) => {
                    if (id === "new-list") {
                        if (subValue !== "") {
                            // add a new list to our content attribute
                            state.patchDataAttributeState("content", {
                                type: "list",
                                items: [],
                                name: subValue,
                                id: `${subValue}-list`,
                                open: true
                            }, `${subValue}-list`)
                        }
                    }
                    setOpen(false);
                }}
                onClose={() => {
                    setOpen(false);
                }}
            />
        }
        else {
            return <Button
                id="open-action-bar"
                img={"add.svg"}
                width={50}
                height={50}
                onClick={() => {
                    setOpen(true);
                }}
            ></Button>
        }
    }

    return renderThemeBasedBorder(
        renderActionBar()
    );
}

export default ActionBar;
