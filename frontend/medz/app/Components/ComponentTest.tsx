import Background from 'BaseComponents/Background';
import Window from 'BaseComponents/Window';
import Row from 'BaseComponents/Row';
import Typography from 'BaseComponents/Typography';
import Button from 'BaseComponents/Button';
import Column from 'BaseComponents/Column';
import toast, { Toaster } from 'react-hot-toast';

function ComponentTest() {
  return (
    <>
      <Background type="blurr-purple" />
      <div style={{
          zIndex: '2',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh'
        }}>
          <Toaster />
          <Window id="sample-window" title="Example" height="270px" width="450px">
            <Row>
              <Column>
                <Typography>Test Message</Typography>
                <Button onClick={() => {
                  toast("Loading button data...");
                }}>Example Button</Button>
              </Column>
            </Row>
          </Window>
      </div>
    </>
  );
}

export default ComponentTest;
