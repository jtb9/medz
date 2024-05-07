
function Typography(props: any) {
    return (
      <span key={props.skey} style={{color: props.white ? 'white' : undefined}} className="typography">
          {props.children}
      </span>
    );
  }
  
  export default Typography;
  