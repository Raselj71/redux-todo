import { SegmentedControl } from "@radix-ui/themes";
import React from "react";
import { useThemeSelector } from "../redux/theme/themeSelector";
import { useAppDispatch } from "../redux/store";
import { themeSwitching } from "../redux/theme/themeSlice";

function ThemeController() {

   const currentTheme=useThemeSelector()
   console.log('Current theme:', currentTheme)
     const dispatch = useAppDispatch()
     const handleChange=()=>{
        console.log('i am calling for theme switch')
        dispatch(themeSwitching())
     }

  return (
    <SegmentedControl.Root size={{
      initial:'2',
      lg:'3'
    }} defaultValue={currentTheme}>
      <SegmentedControl.Item onClick={handleChange} value="light">Light</SegmentedControl.Item>
      <SegmentedControl.Item onClick={handleChange} value="dark">Dark</SegmentedControl.Item>
    
    </SegmentedControl.Root>
  );
}

export default ThemeController;
