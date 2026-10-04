export const themeStorageKey = "theme";

export const themeInitScript = `(function(){try{var t=localStorage.getItem("${themeStorageKey}");var dark=t==="light"?false:true;var root=document.documentElement;root.classList.toggle("dark",dark);root.style.colorScheme=dark?"dark":"light";}catch(e){}})();`;

export function applyTheme(mode: "dark" | "light") {
  const dark = mode === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  localStorage.setItem(themeStorageKey, mode);
}
