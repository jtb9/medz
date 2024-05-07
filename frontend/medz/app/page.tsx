import 'CSS/App.css';
import 'CSS/Components.css';
import Dash from 'AppViews/Dash';
import { useUserStore } from 'State/user_state';

export default function Page() {
    const state = useUserStore.getState();
    const feature = state.view.feature;
  
    const renderCurrentFeature = () => {
      if (feature === "dash") {
        return <Dash />
      }
  
      return <span />
    }
    
    return <>
      {renderCurrentFeature()}
    </>
}
