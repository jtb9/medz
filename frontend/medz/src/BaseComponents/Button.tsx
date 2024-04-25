import { useComponentSize } from "react-use-size";
import { useUserStore } from "State/user_state";
import Typography from "./Typography";

function Button(props: any) {
  // const { ref, height, width } = useComponentSize();
  const state = useUserStore(state => state);
  const theme = state.view.theme;

  const {
    img,
    width,
    height,
    label,
    id
  } = props;

  const widthPx = `${width}px`;
  const heightPx = `${height}px`;

  const renderChildren = () => {
    if (img) {
      return <img style={{width: widthPx, height: heightPx}} src={img} alt={`button for ${id}`} />;
    }
    else if (label) {
      return <Typography style={{width: widthPx, height: heightPx, lineHeight: heightPx}}>{label}</Typography>
    }

    return <span />
  }

  const renderWrapper = (children: any) => {
    if (theme === 'default') {
      return <div style={{
        width: widthPx,
        height: heightPx
      }} className="button-t-default" onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}>
        {renderChildren()}
      </div>;
    }

    return children;
  }

  return renderWrapper(props.children);
}

export default Button;
