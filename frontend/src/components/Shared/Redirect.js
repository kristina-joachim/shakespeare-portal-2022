import { useContext, useEffect } from "react";
import { MyContext } from "../../context/Context";
const { useLocation, useNavigate, useParams } = require("react-router-dom");

const Redirect = ({ end }) => {
  const myLoc = useLocation();
  const goTo = useNavigate();
  const { type } = useParams();
  const {
    user: { setCurrUser },
    api: { setApiRes },
  } = useContext(MyContext);

  useEffect(() => {
    console.log(`${end} redirect from`, myLoc);

    switch (end) {
      case "external":
        //console.log("To:", myLoc.pathname.substring(1) + myLoc.search);
        //console.groupEnd("REDIRECTING");
        console.log("Going External...");
        window.location.replace(myLoc.pathname.substring(1) + myLoc.search);
        break;
      case "server":
        //console.log("To:", myLoc.pathname + myLoc.search);
        const myResults = { url: myLoc.pathname, error: false };
        fetch(myLoc.pathname + myLoc.search)
          .then((res) => {
            myResults.full = res;
            return res.json();
          })
          .then((body) => {
            myResults.data = body;
          })
          .catch((error) => {
            myResults.error = true;
            myResults.message = error;
          })
          .finally(() => {
            setApiRes({ ...myResults });
            //console.log("Data:", myResults);
            //console.groupEnd("REDIRECTING");
            switch (myLoc.pathname) {
              case "/auth/redirect":
                console.log("Processing...");
                goTo("/", { replace: true });
                break;
              case "/auth/signout":
                console.log("Signing out...");
                if (!myResults.error) setCurrUser(null);
                goTo("/");
              case "/auth/signin":
                console.log("Signing in...", myResults.data.data);
                console.log("Redirecting to:", `/${myResults.data.data}`);
                goTo(`//${myResults.data.data}`, { });
              default:
                goTo("/", { replace: true });
                break;
            }
          });
        break;
      default:
        //console.log("Invalid Redirect type", type);
        //console.groupEnd("REDIRECTING");
        goTo("/");
        break;
    }
    //console.groupEnd("REDIRECTING");
  }, []);
};

export default Redirect;
