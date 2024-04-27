import { useUserStore } from "State/user_state";
import Typography from "./Typography";
import { useState } from "react";

function Handle(props: any) {
  // const { ref, height, width } = useComponentSize();
  const state = useUserStore(state => state);
  const theme = state.view.theme;

  const [inHover, setInHover] = useState(false);

  const {
    img,
    width,
    height,
    label,
    id,
    white,
    marginTop,
    hoverContent,
    className
  } = props;

  const widthPx = `${width}px`;
  const heightPx = `${height}px`;

  const renderChildren = () => {
    if (img) {
      let extraStyle = white ? {
        // 'svg polygon': {
        //   fill: 'white !important',
        //   stroke: 'white !important',
        //   color: 'white !important'
        // },
        // 'svg path': {
        //   fill: 'white !important',
        //   stroke: 'white !important',
        //   color: 'white !important'
        // },
        // 'svg': {
        //   fill: 'white !important',
        //   stroke: 'white !important',
        //   color: 'white !important'
        // }
      } : {}
      return <img style={{width: widthPx, height: heightPx, position: 'absolute', ...extraStyle}} src={img} alt={`button for ${id}`} />;
    }
    else if (label) {
      return <Typography style={{width: widthPx, height: heightPx, lineHeight: heightPx}}>{label}</Typography>
    }

    return <span />
  }

  const renderHover = () => {
    if (hoverContent !== undefined && inHover) {
      return <div style={{position: 'absolute', right: "-20px", top: '0px'}}>
        {hoverContent}
      </div>
    }
    else {
      return <span />
    }
  }

  const renderWrapper = () => {
    if (theme === 'default') {
      return <div 
        style={{
          width: widthPx,
          height: heightPx,
          marginTop: marginTop ? `${marginTop}px` : undefined,
          position: 'relative'
        }} 
        className={`handle-t-default ${className}`} 
      >
        {renderChildren()}
        {renderHover()}
      </div>;
    }

    return <span />;
  }

  return renderWrapper();
}

export default Handle;
