const button =(props)=>{
    return (
        <button type={props.type} className="w-full p-2 rounded-2xl bg-dark-light hover:bg-bright text-light hover:text-dark">{props.text}</button>
    )
}

export default button;