import { useComponentSize } from "react-use-size";
import { useRef, useState } from "react";
import { useUserStore } from "State/user_state";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { modifyIntOfPxString } from "Utilities/modifier";

function ListControl(props: any) {
    const state = useUserStore(state => state);
    const [adding, setAdding] = useState(false);
    const [nextInput, setNextInput] = useState("");
    const [tab, setTab] = useState(0);
    const theme = state.view.theme;
    let sunSizeControlRef = useRef(null);
    const windowHeight = props.windowHeight;
    const contentKey = props.contentKey;

    //@ts-ignore
    const contentState = state.data.content[contentKey];

    const getContent = () => {
        try {
            return contentState.items[tab];
        }
        catch (e) {
            return ""
        }
    }

    const setContent = (newValue: any) => {
        try {
            let allItemsBuffer = contentState.items;

            allItemsBuffer[tab] = newValue;

            state.patchDataAttributeState("content", {
                items: allItemsBuffer
            }, contentKey)
        }
        catch (e) {

        }
    }

    const renderThemeBasedWrapper = (children: any) => {
        if (theme === 'default') {
            const themeWindowSizeChange = -60;
            const heightForThisTheme = modifyIntOfPxString(windowHeight, themeWindowSizeChange);

            return <div style={{
                cursor: 'text',
                width: '100%',
                height: `${heightForThisTheme}`
            }} ref={sunSizeControlRef} className="t-default-sun-list-wrapper">
                {children}
            </div>
        }

        return <div>
            {children}
        </div>
    }

    const sunBasedEditor = () => {
        return renderThemeBasedWrapper(
            <CKEditor
                editor={ClassicEditor}
                data={getContent()}
                onReady={editor => {

                }}
                onChange={(event, editor) => {
                    setContent(editor.data.get());
                }}
                onBlur={(event, editor) => {

                }}
                onFocus={(event, editor) => {

                }}
            />
        )
    }

    //@ts-ignore
    return sunBasedEditor();
}

export default ListControl;
