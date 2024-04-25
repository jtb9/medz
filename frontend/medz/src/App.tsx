import 'CSS/App.css';
import Dash from 'AppViews/Dash';
import { useUserStore } from 'State/user_state';

function App() {
  const state = useUserStore.getState();
  const feature = state.view.feature;

  const renderCurrentFeature = () => {
    if (feature === "dash") {
      return <Dash />
    }

    return <span />
  }
  
  return renderCurrentFeature();
}

export default App;
