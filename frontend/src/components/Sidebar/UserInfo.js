import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/Context";
import { ENDPOINTS } from "../Shared/constants";
import { getInitials, getRandomHexColor } from "../Shared/utils";
import { breakpoints } from "../Shared/GlobalStyles";

const UserInfo = () => {
  const {
    state: { currUser, authToken },
    actions: { getServerData },
  } = useContext(MyContext);

  const [profilePic, setProfilePic] = useState({
    loaded: false,
    blob: "",
    alt: `${currUser.givenName}'s avatar`,
    colors: {
      back: "gainsboro",
      text: "inherit",
    },
  });

  useEffect(() => {
    let myPic = profilePic;
    let myUrl = ENDPOINTS.myAvatar.url + "/$value";
    let myOptions = ENDPOINTS.myAvatar.options;
    myOptions.headers.Authorization = authToken.accessToken;

    const getData = async (url, options) => {
      const image = await getServerData(url, options);
      //console.info(image);

      if (image.error) {
        let userName = currUser.givenName.concat(" ", currUser.surname);
        myPic.alt = getInitials(userName);
        myPic.colors = await getRandomHexColor();
      } else {
        const path = window.URL || window.webkitURL;
        myPic.blob = path.createObjectURL(image.data);
        myPic.alt = `${currUser.givenName}'s avatar`;
      }
      myPic.loaded = true;
      setProfilePic({ ...myPic });
    };

    getData(myUrl, myOptions);
  }, []);

  return (
    <>
      {profilePic.loaded && (
        <>
          <Avatar src={profilePic.blob} alt={profilePic.alt} myColors={profilePic.colors} />
          <Greeting>Hello {currUser.givenName},</Greeting>
          <Email>{currUser.mail}</Email>
        </>
      )}
    </>
  );
};

export default UserInfo;

const Avatar = styled.img`
  background-color: ${(props) => props.myColors.back};
  color: ${(props) => props.myColors.text};
  font-size: 24pt;
  margin: 50px 0 20px;
  object-fit: fill;
  border-radius: 50%;
  width: 60%;
  aspect-ratio: 1/1;
  box-shadow: 0 0 5px 2px ${(props) => props.myColors.back};
  border: 2px solid ${(props) => props.myColors.text};
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${breakpoints.sidebar}) {
    font-size: 12pt;
    width: 60px;
    box-shadow: 0 0 4px 1px ${(props) => props.myColors.back};
  }
`;

const Greeting = styled.h3`
  margin: 10px 0 5px;
  @media screen and (max-width: ${breakpoints.sidebar}) {
    display: none;
  }
`;

const Email = styled.h6`
  margin: 0 0 30px;
  color: var(--main-color);

  @media screen and (max-width: ${breakpoints.sidebar}) {
    display: none;
  }
`;
