import StartHero from "@/components/StartHero";
import StartCta from "@/components/StartCta";
import StartApply from "@/components/StartApply";
import StartBenefit from "@/components/StartBenefit";
import StartCohort from "@/components/StartCohort";
import Footer from "@/components/Footer";

export default function StartupIncubationPage() {
    return (
        <div className="relative">
            <main>
                <StartHero />
                <StartCta />
                <StartApply />
                <StartBenefit />
                <StartCohort />
            </main>
            <Footer />
        </div>
    );
}
