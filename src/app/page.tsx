import { CatalogueSection } from "@/components/home/CatalogueSection";
import { DownloadSection } from "@/components/home/DownloadSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FoundersSection } from "@/components/home/FoundersSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { JoinSection } from "@/components/home/JoinSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { VideoSection } from "@/components/home/VideoSection";
import { getHomeVideo } from "@/lib/video";

export default function HomePage() {
  const video = getHomeVideo();
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      {video && <VideoSection video={video} />}
      <PartnersSection />
      <CatalogueSection />
      <FeaturesSection />
      <FoundersSection showLink />
      <DownloadSection />
      <JoinSection />
    </>
  );
}
