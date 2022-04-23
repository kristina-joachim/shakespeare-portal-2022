import styled from "styled-components";
import { useEffect, useState } from "react";

const CheckBox = () => {
  const [check, setCheck] = useState(false);

  const toggleCheckBox = (ev) => {
    console.log("Checkmark clicked!");
    ev.target.checked = !ev.target.checked;
    setCheck(ev.target.checked);
  };

  return (
    <>
      <CheckMark>
        <input type="checkbox" onInput={toggleCheckBox} checked={true} />
        <span className={check ? "checked" : ""}></span>
      </CheckMark>
    </>
  );
};

export default CheckBox;

const CheckMark = styled.div`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover input ~ span {
    background-color: #ccc;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;

    ::after {
      content: "";
      position: absolute;
      display: none;

      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }

  .checked {
    background-color: #2196f3;
    :after {
      display: block;
    }
  }
`;
