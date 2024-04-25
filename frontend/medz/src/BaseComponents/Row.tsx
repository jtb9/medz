
function Row(props: any) {
  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: props.justifyContent}}>
        {props.children}
    </div>
  );
}

export default Row;
