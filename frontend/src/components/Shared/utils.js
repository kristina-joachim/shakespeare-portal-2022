export const getInitials = (fullName) => {
  const allNames = fullName.trim().split(" ");
  const allInitials = allNames.reduce((initials, name) => {
    initials += name.charAt(0);
    if (name.includes("-")) {
      initials += name.charAt(name.indexOf("-") + 1);
    }
    return initials;
  }, "");
  return allInitials.toUpperCase();
};

export const getRandomHexColor = async () => {
  const hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  let color = "";
  for (let cnt = 0; cnt < 6; cnt++) {
    let randomIndex = Math.floor(Math.random() * hex.length);
    color += hex[randomIndex];
  }

  const res = await fetch(`https://www.thecolorapi.com/id?hex=${color}`);
  const colorData = await res.json();

  const palette = {
    back: colorData.hex.value,
    text: colorData.contrast.value,
  };
  return palette;
};

export const generateURL = (url, data) => {
  let urlParts;
  if (url.includes("https://") || url.includes("https://")) urlParts = url.replace(/(http)(s)?:\/\//g, "").split("?");
  else urlParts = url.split("?");
  //If has search Params, add from data
  if (urlParts.length > 1) {
    let searchParams = urlParts[1]; // param=&param=
    searchParams.split("&").forEach((searchParam) => {
      url = url.replace(searchParam, searchParam + "=" + data[searchParam]);
    });
  }

  //Path includes params?
  let path = urlParts[0];
  if (path.includes(":")) {
    let pathParams = path.split("/").filter((urlPart) => {
      return urlPart.includes(":");
    }); //  auth  redirect  :team  :user >>>  :team  :user

    pathParams.forEach((pathParam) => {
      let param = pathParam.replace(":", "");
      url = url.replace(pathParam, data[param]);
    });
  }
  return url;
};
