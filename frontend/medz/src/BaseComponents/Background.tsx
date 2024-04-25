
function Background(props: any) {
    let type = props.type ? props.type : 'blurr-purple';

    const anchorStyle = () => {
        return {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            zIndex: '-1'
        }
    }

    const renderBlurrPurple = () => {
        //@ts-ignore
        return <div className="background-wrapper" style={anchorStyle()}>
            <div style={{
                width: '100%',
                height: '100%',
            }} id="blurr-purple-background">
                <img alt="background-decorator" src="circles_1.svg" id="blurr-purple-background-decorator-1" />
            </div>
        </div>
    }

    const renderGeneric = () => {
        return <div></div>
    }


    const renderBackground = () => {
        if (type === 'blurr-purple') {
            return renderBlurrPurple();
        }

        return renderGeneric();
    }

    return renderBackground();
}

export default Background;
