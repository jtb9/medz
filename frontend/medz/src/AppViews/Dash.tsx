import Background from 'BaseComponents/Background';
import ActionBar from 'Components/ActionBar';
import ContentMenu from 'Components/ContentMenu';
import ContentWindows from 'Components/ContentWindows';
import { useUserStore } from 'State/user_state';
// import ComponentTest from 'Components/ComponentTest';

function Dash(props: any) {
  const state = useUserStore(state => state);
  
  const renderDashView = () => {
    return <div>
      <Background type={state.view.background} />
      <ActionBar />
      <ContentMenu />
      <ContentWindows />
    </div>
  }

  return renderDashView();
}

export default Dash;
