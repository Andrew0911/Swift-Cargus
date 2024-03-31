import { useNavigate } from "react-router-dom";

function Tab(props) {
    const { logo, title, selected, onClick } = props;
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/${title.toLowerCase()}`);
      onClick(title);
    }

    return (
    <div className = {`${selected ? 'selected' : ''}tab`} onClick = {handleClick}> 
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