import { createFileRoute } from "@tanstack/react-router";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import {
  Hero, ProblemSolution, Features, EditorSection, HumanHandoff,
  ContactsReports, Segments, Pricing, FAQ, FinalCTA,
} from "@/components/landing/sections";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>
        <Hero />
        <ProblemSolution />
        <EditorSection />
        <HumanHandoff />
        <ContactsReports />
        <Features />
        <Segments />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
