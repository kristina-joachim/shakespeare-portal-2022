import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { MyContext } from "../../context/Context";
import { ACTIONS, ENDPOINTS } from "../Shared/constants";
import Loading from "../Shared/Loading";
import { generateURL } from "../Shared/utils";
import Header from "../Shared/Header";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import moment from "moment";
import CheckBox from "./Checkbox";
moment().locale("en-ca");

const Timesheets = () => {
  const [payPeriod, setPayPeriod] = useState(null); //fetch payperiod based on current date.
  const {
    actions: { getServerData, dispatchAction },
  } = useContext(MyContext);

  useEffect(() => {
    //currDate 26 Dec 21 00:01 EST
    const today = moment().format("DD MMM YY HH:mm") + " EST";
    //add date as search param
    const myUrl = generateURL(ENDPOINTS.tsByDate.url, { date: today });

    getServerData(myUrl).then((results) => {
      if (results.error) dispatchAction({ type: ACTIONS.ERROR, data: { data: results, attemptedAction: "Getting today's pay period" } });
      else {
        //console.info("Setting state~", results);
        setPayPeriod({ ...results.data, total: results.total.split(" ")[0], current: results.data._id });
      }
    });
  }, []);

  const changePayPeriod = (ev) => {
    let tempState = payPeriod;
    let operation = ev.target.name;
    let currPeriodId = payPeriod._id.split("-"); ///"_id": "2022-pp-8"
    let newPeriodId = currPeriodId.pop(); //"8"

    //id ++ or --
    if (operation === "next") {
      newPeriodId++;
    } else {
      newPeriodId--;
    }

    let myID = currPeriodId.join("-").concat("-", newPeriodId);
    const myUrl = generateURL(ENDPOINTS.tsById.url, { id: myID });
    setPayPeriod(null);
    getServerData(myUrl).then((results) => {
      if (results.error) dispatchAction({ type: ACTIONS.ERROR, data: { data: results, attemptedAction: "Changing Pay Periods" } });
      else {
        //console.info("Setting state~", results);
        setPayPeriod({ ...tempState, ...results.data });
      }
    });
  };

  return (
    <>
      <Header title={"Timesheets!"} />
      <Content>
        {payPeriod == null ? (
          <Loading />
        ) : (
          <>
            <TitleNav>
              <NavIcons name="prev" onClick={changePayPeriod}>
                <FaChevronLeft className="icon" />
              </NavIcons>
              <PayPeriodTitle>
                Pay Period #{payPeriod._id.split("-").pop()}
                <span style={{ display: payPeriod._id === payPeriod.current ? "flex" : "none" }}>Current</span>
              </PayPeriodTitle>
              <NavIcons name="next" onClick={changePayPeriod}>
                <FaChevronRight className="icon" />
              </NavIcons>
            </TitleNav>
            <InfoNav>
              <InfoItem>
                <InfoName>Start Date</InfoName>
                <InfoValue>{moment(payPeriod.start).format("ddd, ll")}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoName>Reporting Deadline</InfoName>
                <InfoValue>{moment(payPeriod.deadline).format("ddd, ll")} 6:00 PM</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoName>End Date</InfoName>
                <InfoValue>{moment(payPeriod.end).format("ddd, ll")}</InfoValue>
              </InfoItem>
            </InfoNav>
            <Attendance>
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Date </th>
                  <th>Duration</th>
                  <th>Participant</th>
                  <th>Duration</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bonduelle Teams 3</td>
                  <td>{moment().format("lll")} - 10:00 AM to 11:30 AM</td>
                  <td>1.5 hours</td>
                  <td>Kristina Joachim</td>
                  <td>
                    <CheckBox key="kj-check" />
                  </td>
                </tr>
              </tbody>
            </Attendance>
          </>
        )}
      </Content>
    </>
  );
};

export default Timesheets;

const Content = styled.div`
  background: linear-gradient(to right, var(--shakes-blue1) -50%, #ffffff 110%);
  height: 100%;
  width: 100%;
  border-radius: 0 0 15px 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const TitleNav = styled.div`
  margin: 10px;
  display: flex;
  font-variant: small-caps;
`;

const PayPeriodTitle = styled.h1`
  position: relative; /* for Current Tag ::after */
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  text-align: center;
  gap: 20px;

  span {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 70%;
    font-size: 14pt;
    color: #004d00;
    border: 2px solid darkgreen;
    box-shadow: 0 0 5px 2px limegreen;
    background-color: limegreen;
    font-variant: small-caps;
    border-radius: 15px;
  }
`;

const NavIcons = styled.button`
  width: 10%;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    font-size: 24pt;
  }
`;

const InfoNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  gap: 20px;
`;

const InfoItem = styled.div`
  min-width: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoName = styled.h2`
  text-decoration: underline;
  white-space: nowrap;
`;

const InfoValue = styled.h2`
  font-weight: normal;
  white-space: nowrap;
`;

const Attendance = styled.table`
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-collapse: collapse;
`;

const TitleRow = styled.tr``;
const ColTitle = styled.th``;
const ClassNameCol = styled.th``;
const DataCol = styled.td``;
const StudentRow = styled.tr``;
const SubTotalRow = styled.tr``;
