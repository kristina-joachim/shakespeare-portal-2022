import styled from "styled-components";
import { FaCheck, FaPencilAlt, FaRegCheckSquare, FaTimes, FaUndo } from "react-icons/fa";
import { ActionsCol, DateCol, DurationCol, TimeCol, TypeCol, ClassNameCol } from "./styles";

import moment from "moment";
moment().locale("en-ca");

const EventRow = ({ event, index, state: [timesheet, setTimesheet], modifyHandler }) => {
  //Event Actions

  const modifyEvent = (ev, type) => {
    ev.preventDefault();
    //Get row
    let myElement = ev.target;
    while (myElement.tagName !== "TR") {
      let parent = myElement.parentElement;
      myElement = parent;
    }

    //Get full event from State
    //let calID = myElement.id.split("_|_")[1];
    //let myEvent = periodEvents.events.find((event) => event.iCalUId === calID);

    //
    let eventIndex = myElement.id.split("_|_")[0];
    let tempState = timesheet;

    const date = moment(document.getElementById(`date-${eventIndex}`).value, moment.HTML5_FMT.DATE);
    const startTime = moment(document.getElementById(`start-${eventIndex}`).value, moment.HTML5_FMT.TIME);
    const endTime = moment(document.getElementById(`end-${eventIndex}`).value, moment.HTML5_FMT.TIME);
    const start = date.clone().set({ hour: startTime.get("hour"), minute: startTime.get("minute"), second: 0, millisecond: 0 });
    const end = date.clone().set({ hour: endTime.get("hour"), minute: endTime.get("minute"), second: 0, millisecond: 0 });
    const hourToAdd = {
      start: start.format("d MMM YY HH:mm Z"),
      end: end.format("d MMM YY HH:mm Z"),
      duration: moment.duration(end.diff(start)).as("hours").toFixed(2),
      type: document.getElementById(`type-${eventIndex}`).value,
      name: document.getElementById(`name-${eventIndex}`).value,
    };

    switch (type) {
      case "confirm":
        tempState.hours[eventIndex] = hourToAdd;
        //Styling for confirmed.
        myElement.classList.add("confirmed");
        document.getElementById(`type-${eventIndex}`).disabled = true;
        setTimesheet({ ...tempState });
        break;
      case "modify":
        modifyHandler();
        break;
      case "delete":
        tempState.hours[eventIndex] = "deleted";
        myElement.classList.add("deleted");
        setTimesheet({ ...tempState });
        break;
      case "undo":
        tempState.hours[eventIndex] = null;
        myElement.classList.remove("confirmed", "deleted", "modified");
        document.getElementById(`type-${eventIndex}`).disabled = false;
        setTimesheet({ ...tempState });
        break;
      case "revert":
        break;
      case "save":
        myElement.classList.add("saved");
        tempState.hours[eventIndex] = { ...tempState.hours[eventIndex], hourToAdd };
        setTimesheet({ ...tempState });
        break;
      default:
        break;
    }
  };

  return (
    <EventTR id={`${index}_|_${event.iCalUId}`} className="">
      <ClassNameCol>
        <input name={`name-${index}`} id={`name-${index}`} value={event.subject} disabled />
      </ClassNameCol>
      <DateCol>
        <p>{moment(event.start.dateTime).isSame(event.end.dateTime, "day") ? moment(event.start.dateTime).format("ddd, ll") : ""}</p>
        <input
          name={`date-${index}`}
          id={`date-${index}`}
          type="date"
          value={moment(event.start.dateTime).isSame(event.end.dateTime, "day") ? moment(event.start.dateTime).format("YYYY-MM-DD") : ""}
          disabled
        />
      </DateCol>
      <TimeCol className="ev-time">
        <p>
          {moment(event.start.dateTime).format("h:mm a")} - {moment(event.end.dateTime).format("h:mm a")}
        </p>
        <input name={`start-${index}`} id={`start-${index}`} type="time" value={moment(event.start.dateTime).format("hh:mm")} disabled />
        <input name={`end-${index}`} id={`end-${index}`} type="time" value={moment(event.end.dateTime).format("hh:mm")} disabled />
      </TimeCol>
      <DurationCol>
        <input name={`duration-${index}`} id={`duration-${index}`} value={event.duration.toFixed(2) + " hours"} disabled />
      </DurationCol>
      <TypeCol>
        <select name={`type-${index}`} id={`type-${index}`} className="dropdown">
          <option value="class">Class</option>
          <option value="cxl">Class (CXL)</option>
          <option value="eval">Evaluation</option>
          <option value="admin">Admin</option>
          <option value="travel">Travel</option>
        </select>
      </TypeCol>
      <ActionsCol>
        <Actions>
          <ActionButton
            type="button"
            id={`confirm-${index}`}
            className="confirm"
            onClick={(ev) => {
              modifyEvent(ev, "confirm");
            }}
          >
            <FaCheck className="icon" />
          </ActionButton>
          <ActionButton
            type="button"
            id={`modify-${index}`}
            className="modify"
            onClick={(ev) => {
              modifyEvent(ev, "modify");
            }}
          >
            <FaPencilAlt className="icon" />
          </ActionButton>
          <ActionButton
            type="button"
            id={`delete-${index}`}
            className="delete"
            onClick={(ev) => {
              modifyEvent(ev, "delete");
            }}
          >
            <FaTimes className="icon" />
          </ActionButton>
          <ActionButton
            type="button"
            id={`undo-${index}`}
            className="undo"
            onClick={(ev) => {
              modifyEvent(ev, "undo");
            }}
          >
            <FaUndo className="icon" />
          </ActionButton>
          <ActionButton type="button" id={`save-${index}`} className="save">
            <FaRegCheckSquare className="icon" />
            <span>Save changes</span>
          </ActionButton>
        </Actions>
        <ActionComment id={`comment-${index}`} name={`comment-${index}`} className="comment"></ActionComment>
      </ActionsCol>
    </EventTR>
  );
};

export default EventRow;

const EventTR = styled.tr`
  input {
    border: none;
    padding: 0;
    background: none;
    color: inherit;
  }
  &:nth-child(even) {
    background-color: var(--shakes-blue1);
  }

  &.confirmed {
    background-color: lightgreen;

    .confirm {
      border: 1px solid currentColor;
    }

    .delete,
    .modify {
      display: none;
    }

    .undo {
      display: inline-flex;
    }
    .undo:after {
      content: "Undo?";
    }
  }

  &.deleted {
    background-color: lightgray;
    max-height: fit-content;
    border: none;

    td,
    th {
      border-color: lightgray;
      border-bottom: 1px solid black;
      font-size: 10pt;
      color: grey;
      padding: 2px;
    }

    th {
      border-left-color: black;
    }
    td:last-child {
      border-right-color: black;
    }
    .dropdown {
      display: none;
    }
    .delete {
      border: 1px solid currentColor;
      font-size: 10pt;
      min-width: 20px;
      :hover {
        background-color: initial;
      }
    }

    .confirm,
    .modify {
      display: none;
    }

    .undo {
      display: inline-flex;
    }
    .undo:after {
      content: "Restore?";
    }
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 2px;
`;

const ActionButton = styled.button`
  border: none;
  padding: 0;
  background: none;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  min-width: 30px;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 15pt;

  &.confirm {
    color: green;
    &:hover {
      background-color: greenyellow;
    }
  }
  &.modify {
    color: orange;
    font-size: 14pt;

    &:hover {
      background-color: moccasin;
    }
  }
  &.delete {
    color: red;
    &:hover {
      background-color: lightcoral;
    }
  }

  &.undo {
    border-radius: 15px;
    padding: 7px 3px;
    aspect-ratio: unset;
    display: none;
    font-size: 10pt;

    .icon {
      margin: 0 2px 0 5px;
    }
    &:hover {
      background-color: silver;
    }
    :after {
      content: "";
      margin-left: 2px;
      font-size: 10pt;
    }
  }

  &.save {
    border-radius: 15px;
    padding: 7px 3px;
    aspect-ratio: unset;
    display: none;
    color: black;
    font-size: 10pt;
    .icon {
      margin: 0 2px 0 5px;
    }
    &:hover {
      background-color: greenyellow;
    }
  }
`;

const ActionComment = styled.textarea`
  display: none;
`;
