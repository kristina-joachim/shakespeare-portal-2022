import moment from "moment";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../../context/Context";
import { ENDPOINTS } from "../Shared/constants";
import Loading from "../Shared/Loading";
import { generateURL } from "../Shared/utils";

const Timesheets = () => {
  const [payPeriod, setPayPeriod] = useState(null); //fetch payperiod based on current date.
  const {
    actions: { getServerData },
  } = useContext(MyContext);

  useEffect(() => {
    //currDate 26 Dec 21 00:01 EST
    const today = moment().format("DD MMM YY HH:mm zz");
    //add date as search param
    const myUrl = generateURL(ENDPOINTS.timesheets.url, { date: today });
    const results = getServerData(myUrl);
    setPayPeriod(results);
    //    console.log("TIMESHEET", results);
  }, []);

  return (
    <>
      <Content>
        Timesheets
        {payPeriod ? <code>{JSON.stringify(payPeriod)}</code> : <Loading />}
      </Content>
    </>
  );
};

export default Timesheets;

const Content = styled.div``;
