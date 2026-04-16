import React, { useState } from "react";
import "../styles/navbar.css";

export default function Navbar({ selectedState, view }) {

  // 🔥 default active = chatbot
  const [active, setActive] = useState("chatbot");
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ hide hamburger logic (same)
  const hideHamburger = selectedState && view !== "details";

  return (
    <header className="navbar">
      
      <div className="nav-left">
        <div className="logo-space" />
        <span className="brand-name">Heritage AI</span>
      </div>

      {/* HAMBURGER */}
      <div
        className={`menu-toggle 
          ${menuOpen ? "active" : ""} 
          ${hideHamburger ? "hide-hamburger" : ""}
        `}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* NAV MENU */}
      <nav className={`nav-right ${menuOpen ? "active" : ""}`}>

          <a
            href="#map"
            className="no-underline"
            onClick={() => {
            setActive("map");
            setMenuOpen(false);
             }}
          >
           Map
        </a>

        {/* ✅ CHATBOT (MAIN LINK NOW) */}
        <a
          href="#chatbot"
          className={active === "chatbot" ? "active" : ""}
          onClick={() => {
            setActive("chatbot");
            setMenuOpen(false);
          }}
        >
          TravelMate AI
        </a>

        <a
          href="#translate"
          className={active === "translate" ? "active" : ""}
          onClick={() => {
            setActive("translate");
            setMenuOpen(false);
          }}
        >
          Translation
        </a>

        <a
          href="#login"
          className={active === "login" ? "active" : ""}
          onClick={() => {
            setActive("login");
            setMenuOpen(false);
          }}
        >
          Login
        </a>

      </nav>
    </header>
  );
}