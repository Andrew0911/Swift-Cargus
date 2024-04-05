import React, { useState } from "react";
import { Helmet } from "react-helmet";

export const Dropdown = ({ aboveFieldText, fieldText, setFieldText, menu }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
        <Helmet>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </Helmet>
        <div>
            <p className='above-input-field'> {aboveFieldText} </p>
            <button className="dropdown-button" onClick={handleOpen}>
                <div className="dropdown-text">
                    <div>
                        {fieldText || `Choose a ${aboveFieldText.replace(/\*/g, '').toLowerCase()}...`}
                    </div>
                    <div
                        className="material-icons"
                        style={{
                        transform: `rotate(${open ? 180 : 0}deg)`,
                        transition: "all 0.25s",
                        }}
                    >
                        expand_more
                    </div>
                </div>
            </button>
            {open ? (
                <ul className="dropdown-menu">
                {menu.map((menuItem, index) => (
                    <li key={index} className="menu-item">
                        {menuItem == 'No locality available' && aboveFieldText.replace(/\*/g, '').toLowerCase() == 'locality' ?
                            
                            (<button disabled> {menuItem} </button>) : 
                            (<button
                                onClick={() => {
                                handleOpen();
                                setFieldText(menuItem);
                            }}
                            >
                            {menuItem}
                            </button>)
                        }
                    </li>
                ))}
                </ul>
            ) : null}
        </div>
    </>
  );
};