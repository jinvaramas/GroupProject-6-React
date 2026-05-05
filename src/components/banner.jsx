import React from "react";
import logoImg from "../assets/logo.png";

export default function Banner() {
  return (
    <div className="flair-hero">
      <img src={logoImg} alt="AUDTLIST" className="hero-title-img" />
      <p className="hero-tagline">DROP YOUR SOUND INTO THE ZONE</p>
      <p className="hero-desc1">
        YOUR SOUND, YOUR SPACE<br />
        A SPACE BUILT FOR INDEPENDENT ARTISTS<br />
        TO CREATE, RELEASE, AND MONETIZE THEIR<br />
        WORK WITHOUT LIMITS.
      </p>
      <p className="hero-desc2">
        A MARKETPLACE FOR MUSIC, MERCH, AND<br />
        CREATIVE IDENTITY
      </p>
    </div>
  );
}
