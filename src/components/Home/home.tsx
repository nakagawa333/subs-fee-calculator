"use client";
import { StyledEngineProvider } from "@mui/material/styles";
import Navbar from "../navbar/navbar";
import Sidebars from "../sidebars/sidebars";
import { useState } from "react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Navbar
        handleDrawerToggle={handleDrawerToggle}
      />
      <StyledEngineProvider injectFirst>
        <Sidebars
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </StyledEngineProvider>
    </>
  )
}
