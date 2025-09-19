import {  useAppSelector } from "../store";

export const useThemeSelector = () => useAppSelector((store) => store.theme.theme);