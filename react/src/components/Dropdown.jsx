import React, { useState } from "react";
import { Helmet } from "react-helmet";

export const Dropdown = ({ aboveFieldText, fieldText, setFieldText, menu, setFieldId, menuId, aboveFieldsize, width, height, fontSize}) => {
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
            <p 
              className='above-input-field'
              style={{ fontSize: aboveFieldsize }}
            > {aboveFieldText} </p>
            <button className="dropdown-button" style={{ width: width, height: height }} onClick={handleOpen}>
                <div className="dropdown-text">
                    <div style={{ fontSize: fontSize }}>
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
                <ul className="dropdown-menu" style={{ width: width }}>
                {menu.map((menuItem, index) => (
                    <li key={index} style={{ fontSize: fontSize }}>
                        {menuItem == 'No localities available' && aboveFieldText.replace(/\*/g, '').toLowerCase() == 'locality' ?
                            
                            (<button disabled> {menuItem} </button>) : 
                            (<button
                                onClick={() => {
                                handleOpen();
                                setFieldText(menuItem);
                                setFieldId(menuId[index]);
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