import { useUserStore } from 'State/user_state';
import { useEffect } from 'react';
import { useStore } from 'zustand'

function StateMonitor() {
    const state = useUserStore.getState();
    const view = state.view;
    const data = state.data;

    const bundle = JSON.stringify([view, data])


    useEffect(() => {
        const bin = [view, data];

        // push the bundle to the backend for persistence
        
    }, [bundle, view, data])

    return <span />
}

export default StateMonitor;
