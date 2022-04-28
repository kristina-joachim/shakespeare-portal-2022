import styled from "styled-components";

export const DurationCol = styled.td`
  text-align: right;
  width: min-content;

  input {
    text-align: right;

    border: none;
    background: none;
    color: inherit;
    min-width: 85px;
    width: 100%;
    padding: 0;
    max-width: 100%;
  }
`;
export const TypeCol = styled.td`
  max-width: 120px;
  .dropdown {
    max-width: 110px;
    font-size: 10pt;
  }
`;
export const ActionsCol = styled.td`
  min-width: 120px;
`;

export const TimeCol = styled.td`
  white-space: nowrap;

  input {
    display: none;
    ::-webkit-inner-spin-button {
      display: none;
    }
  }
`;
export const ClassNameCol = styled.th`
  text-align: left;
  font-weight: normal;
  white-space: nowrap;
`;

export const DateCol = styled.td`
  white-space: nowrap;
  input {
    display: none;
    ::-webkit-calendar-picker-indicator {
      display: none;
    }
    ::-webkit-inner-spin-button {
      display: none;
    }
  }
`;
