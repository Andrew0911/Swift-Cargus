
function Tab(props) {
    const {logo, title} = props;

    const handleClick = () => {
        console.log(1)
    }

    return (
    <div className = "tab" onClick = {handleClick}> 
       <img src = {logo} alt = ""></img>
       <div> {title} </div>
    </div>
  )
}

export default Tab