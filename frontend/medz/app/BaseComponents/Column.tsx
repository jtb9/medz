
function Column(props: any) {
    return (
      <div style={{display: 'flex', flexDirection: 'column', ...props.style}}>
          {props.children}
      </div>
    );
  }
  
  export default Column;
  