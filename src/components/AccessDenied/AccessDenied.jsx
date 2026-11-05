"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import "./AccessDenied.css";

export default function AccessDenied() {
  const router = useRouter();

  return (
    <main className="apple-access">
      {/* Ambient background */}
      <div className="apple-background">
        <div className="ambient ambient-blue" />
        <div className="ambient ambient-purple" />
        <div className="ambient ambient-cyan" />

        <div className="noise-layer" />

        <div className="floating-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} style={{ "--i": i }} />
          ))}
        </div>
      </div>

      {/* Main glass card */}
      <section className="apple-card">
        <div className="apple-topline">
          <div className="apple-brand">
            <span className="brand-icon">
              <ShieldCheck size={15} />
            </span>
            BOOKNOOK
          </div>

          <span className="security-status">
            <span />
            PRIVATE ACCESS
          </span>
        </div>

        {/* 3D Lock */}
        <div className="apple-lock-scene">
          <div className="lock-aura" />

          <div className="lock-orbit orbit-a" />
          <div className="lock-orbit orbit-b" />

          <div className="apple-lock">
            <div className="lock-shackle" />

            <div className="lock-body">
              <LockKeyhole size={35} strokeWidth={1.4} />
            </div>
          </div>

          <div className="lock-reflection" />
        </div>

        {/* Content */}
        <div className="apple-content">
          <div className="eyebrow">
            <Sparkles size={14} />A LITTLE DETOUR
          </div>

          <h1 className="apple-heading">
            <span className="heading-line">Well, well...</span>

            <span className="heading-gradient">Curious, aren't we?</span>
          </h1>

          <p className="apple-description">
            Looking for something behind this door, gentleman?
            <strong>
              Sign in first. We'll take care of the rest and unlock your way in.
            </strong>
          </p>
        </div>

        {/* Actions */}
        <div className="apple-actions">
          <button
            className="apple-primary"
            onClick={() => router.push("/login")}
          >
            <span>Sign in to continue</span>
            <ArrowUpRight size={18} />
          </button>

          <button className="apple-secondary" onClick={() => router.back()}>
            <ArrowLeft size={16} />
            Go back
          </button>
        </div>

        <div className="apple-bottom">
          <span>SECURED BY BOOKNOOK</span>
          <span className="bottom-separator" />
          <span>YOUR NEXT CHAPTER AWAITS</span>
        </div>
      </section>

      <div className="apple-caption">
        <span className="caption-dot" />
        Some doors open with a little introduction.
      </div>
    </main>
  );
}
