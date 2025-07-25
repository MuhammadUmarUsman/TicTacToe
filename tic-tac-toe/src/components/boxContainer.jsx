export default function BoxContainer(props){
    return (
        <div onClick={() => props.handleClick(props.row, props.col)} className={`container-item ${props.selected ? 'selected' : ''}`}>
            <h1 className="box">{props.value !== -1 && (props.value === 1 ? 'X' : 'O')}</h1>
        </div>
    )
}