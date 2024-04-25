import Draggable from 'react-draggable';
import { useUserStore, withDefaults } from 'State/user_state';
import { useComponentSize } from "react-use-size";
import React, { useMemo } from 'react';
import Button from 'BaseComponents/Button';
import Row from 'BaseComponents/Row';

export const WindowComponentStateDefaults = {
    width: '400px',
    height: '400px',
    top: 50,
    left: 50,
    maximized: true
}

function Window(props: any) {
    const state = useUserStore(state => state);
    const windowComponentState = withDefaults(state.view.component_state[props.id], WindowComponentStateDefaults);
    const theme = state.view.theme;
    const { ref, height, width } = useComponentSize();

    const renderWithTheme = () => {
        if (theme === 'default') {
            return <div style={{
                width: props.width,
                height: props.height
            }} className='window'>
                {/* <svg className='window-decorator' width="800px" height="800px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M337.6 529.6c-105.6 0-192-86.4-192-192s86.4-192 192-192 192 86.4 192 192-86.4 192-192 192z m0-32c88 0 160-72 160-160s-72-160-160-160-160 72-160 160 70.4 160 160 160zM688 880c-105.6 0-192-86.4-192-192s86.4-192 192-192 192 86.4 192 192-86.4 192-192 192z m0-32c88 0 160-72 160-160s-72-160-160-160-160 72-160 160 72 160 160 160z" fill="#050D42" /><path d="M393.6 412.8c-48 0-88-40-88-88s40-88 88-88 88 40 88 88-40 88-88 88z m0-16c40 0 72-32 72-72s-32-72-72-72-72 32-72 72 32 72 72 72zM676.8 832c-48 0-88-40-88-88s40-88 88-88 88 40 88 88-40 88-88 88z m0-16c40 0 72-32 72-72s-32-72-72-72-72 32-72 72 32 72 72 72z" fill="#050D42" /><path d="M708.8 777.6c-1.6 3.2-3.2 4.8-4.8 6.4-9.6 9.6-24 9.6-33.6 0-9.6-9.6-9.6-24 0-33.6 6.4-6.4 17.6-8 25.6-4.8 0-12.8 4.8-24 14.4-33.6 19.2-19.2 49.6-19.2 67.2 0s19.2 49.6 0 67.2-48 17.6-68.8-1.6c1.6 0 1.6 0 0 0z m-54.4-56c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4 6.4-6.4 16-6.4 22.4 0 4.8 6.4 4.8 16 0 22.4z m100.8-56c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4 6.4-6.4 16-6.4 22.4 0 6.4 4.8 6.4 16 0 22.4z m-113.6-68.8c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4 6.4-6.4 16-6.4 22.4 0 6.4 6.4 6.4 16 0 22.4zM292.8 289.6l-1.6 1.6c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4 4.8-4.8 14.4-6.4 19.2-1.6 0-11.2 4.8-22.4 14.4-32 19.2-19.2 49.6-19.2 67.2 0s19.2 49.6 0 67.2c-19.2 19.2-49.6 19.2-67.2 0-3.2-3.2-6.4-8-9.6-12.8z m145.6 59.2c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4 6.4-6.4 16-6.4 22.4 0 6.4 4.8 6.4 16 0 22.4z m-214.4 11.2c-6.4 6.4-16 6.4-22.4 0-6.4-6.4-6.4-16 0-22.4s16-6.4 22.4 0c6.4 4.8 6.4 16 0 22.4z m84.8 96c-9.6 9.6-24 9.6-33.6 0-9.6-9.6-9.6-24 0-33.6 9.6-9.6 24-9.6 33.6 0s9.6 24 0 33.6z" fill="#2F4BFF" /><path d="M206.4 467.2l11.2-11.2c41.6 41.6 80 56 136 59.2 4.8 0 32 1.6 40 1.6 32 3.2 54.4 9.6 72 28.8 16 16 25.6 36.8 30.4 65.6 1.6 11.2 6.4 52.8 6.4 51.2 8 60.8 24 100.8 65.6 142.4l-11.2 11.2c-44.8-44.8-62.4-88-70.4-152 0 1.6-4.8-40-6.4-51.2-4.8-25.6-11.2-43.2-25.6-57.6-14.4-14.4-33.6-20.8-62.4-24-8 0-35.2-1.6-40-1.6-57.6-1.6-100.8-17.6-145.6-62.4z m611.2 89.6l-11.2 11.2c-41.6-41.6-81.6-57.6-142.4-65.6 1.6 0-40-4.8-51.2-6.4-28.8-4.8-49.6-12.8-65.6-30.4-17.6-17.6-25.6-40-28.8-72 0-8-1.6-35.2-1.6-40-3.2-56-17.6-94.4-59.2-136l11.2-11.2c44.8 44.8 60.8 86.4 64 147.2 0 4.8 1.6 33.6 1.6 40 1.6 28.8 8 46.4 24 62.4 14.4 14.4 32 20.8 57.6 25.6 11.2 1.6 52.8 6.4 51.2 6.4 62.4 8 105.6 24 150.4 68.8z" fill="#FFFFFF" /></svg> */}
                <div className='window-header'>
                    <Row justifyContent={"space-between"}>
                        <span style={{paddingTop: '0.3rem'}}>{props.title}</span>
                        <Button
                            height={20}
                            label="Close"
                            onClick={() => {
                                if (props.onClose) {
                                    props.onClose();
                                }
                            }} />
                    </Row>
                </div>
                <div className='window-body'>
                    <React.Fragment>
                        <div style={{paddingTop: '10px'}} className='window-body-size-wrapper' ref={ref}>
                            {props.children}
                        </div>
                    </React.Fragment>
                </div>
            </div>

        }

        return <span />
    }

    return <Draggable onStop={(e, data) => {
        const newX = data.x;
        const newY = data.y;

        state.patchViewAttributeState("component_state", {
            top: newY,
            left: newX
        }, props.id)
    }} position={{
        x: windowComponentState.left,
        y: windowComponentState.top
    }}>{
            renderWithTheme()
        }</Draggable>
}

export default Window;
