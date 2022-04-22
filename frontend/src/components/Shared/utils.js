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

  console.info(colorData);
  const palette = {
    back: colorData.hex.value,
    text: colorData.contrast.value,
  };
  return palette;
};
