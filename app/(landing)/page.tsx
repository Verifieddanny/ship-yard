"use client";
import { useState } from "react";
import CTA from "@/components/landing/cta";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import Steps from "@/components/landing/steps";
import Navbar from "@/components/navbar";
import AuthModal from "@/components/auth/auth-modal";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openModal = () => setIsAuthOpen(true);
  const closeModal = () => setIsAuthOpen(false);
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Navbar onOpenAuth={openModal} />
      <Hero onOpenAuth={openModal}  />
      <Steps />
      <Features />
      <CTA />
      <AuthModal isOpen={isAuthOpen} onClose={closeModal} />

    </div>
  );
}
