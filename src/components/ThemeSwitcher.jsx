import React, { useState } from "react";
import { useTheme } from "../contexts";

function ThemeSwitcher() {
  const { lightTheme, darkTheme, themeMode } = useTheme();
  const [moon, setMoon] = useState(true);

  const handleClick = (e) => {
    setMoon(!moon);
    if (themeMode === "dark") {
      lightTheme();
    } else {
      darkTheme();
    }

    document.body.style.backgroundColor = moon ? "#171823" : "#fafafa";
  };
  return (
    <div className="cursor-pointer">
      <img
        src={moon ? "./icon-moon.svg" : "./icon-sun.svg"}
        alt="moon"
        onClick={handleClick}
      />
    </div>
  );
}

export default ThemeSwitcher;
