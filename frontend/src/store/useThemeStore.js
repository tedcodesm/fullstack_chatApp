import { create } from "zustand";

export const useThemeStore = create((set) => {
    const savedTheme = localStorage.getItem("theme") || "light";
  
    // Apply theme immediately on load
    document.documentElement.setAttribute("data-theme", savedTheme);
  
    return {
      theme: savedTheme,
      setTheme: (theme) => {
        document.documentElement.setAttribute("data-theme", theme); // Apply to <html>
        document.body.className = theme; // Apply to <body>
        console.log(`Theme set to: ${theme}`);
        localStorage.setItem("theme", theme); // Save in localStorage
        set({ theme }); // Update Zustand state
      },
    };
  });
  
// import { create } from "zustand";

// export const useThemeStore = create((set) => {
//   const savedTheme = localStorage.getItem("theme") || "light";

//   return {
//     theme: savedTheme,
//     setTheme: (theme) => {
//       document.documentElement.setAttribute("data-theme", theme);
//       console.log(`Changing theme to: ${theme}`);
//       document.body.className = theme; // Force UI update
//       console.log(` theme set to: ${theme}`);
//       localStorage.setItem("theme", theme);
//       set({ theme });
//     },
//   };
// });
