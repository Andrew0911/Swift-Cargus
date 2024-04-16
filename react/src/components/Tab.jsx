import { useNavigate } from "react-router-dom";

function Tab(props) {
    const { logo, title } = props;
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/${title.toLowerCase()}`);
    }

    return (
    <div className = 'tab' onClick = {handleClick}> 
      <img 
       src = {logo} 
       alt = ""
      />
      <div> 
        {title} 
      </div>
    </div>
  )
}

export default Tab