import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import AmieAction from "@/components/animations/amie-action";
import NewHero from "@/components/animations/animate-text";
import Bolt from "@/components/animations/bolt";
import ImageCarousel from "@/components/animations/carousel";
import Cashflow from "@/components/animations/cashflow-flow";
import ClickSelect from "@/components/animations/click-select";
import ComponentPreview from "@/components/animations/component-preview";
import Counter from "@/components/animations/counter";
import Cursor from "@/components/animations/cursor";
import DropdownNav from "@/components/animations/dropdown";
import DynamicIsland from "@/components/animations/dynamic-island";
import AnimatedFeedback from "@/components/animations/feedback";
import Fellaz from "@/components/animations/fellaz";
import AnimatedCounter from "@/components/animations/followers-count";
import InputCheck from "@/components/animations/input-check";
import InputShotcut from "@/components/animations/input-shotcut";
import JoiDownloadButton from "@/components/animations/joi-download-button";
import LinearTab from "@/components/animations/linear-tab";
import LiveBlogs from "@/components/animations/live-blocks";
import MagneticLines from "@/components/animations/magnetic-tiles";
import MovieGallery from "@/components/animations/movie-gallery";
import MusicSheet from "@/components/animations/music-shit";
import PeerListBar from "@/components/animations/peerlist-bar";
import { PromptBox } from "@/components/animations/prompt-box";
import SearchUser from "@/components/animations/search-user";
import SignIn from "@/components/animations/sign-in";
import Slider from "@/components/animations/slider";
import TabBars from "@/components/animations/tab-bars";
import TelegramInput from "@/components/animations/telegram-input";
import Typer from "@/components/animations/typer";
import UserSearch from "@/components/animations/user-search";
import UserStacked from "@/components/animations/user-stacked";
import Wants from "@/components/animations/wants";
import Wheel from "@/components/animations/wheel";
import WordRoll from "@/components/animations/word-roll";
import YearsTabs from "@/components/animations/years-tabs";
import Feedback from "@/components/shared/feedback";
import Footer from "@/components/shared/footer";
import Hero from "@/components/shared/hero";

const Home = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const images = ["/succession.jpeg", "/mirror.jpeg", "/dune.jpg"];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:px-0 px-10 overflow-x-clip">
      <Hero hidden={isHidden} />
      <Feedback hidden={isHidden} />

      <ComponentPreview>
        <UserStacked />
      </ComponentPreview>
      <ComponentPreview>
        <ClickSelect />
      </ComponentPreview>

      <ComponentPreview notReady>
        <UserSearch />
      </ComponentPreview>
      <ComponentPreview>
        <InputShotcut />
      </ComponentPreview>
      <ComponentPreview>
        <WordRoll />
      </ComponentPreview>
      <ComponentPreview notReady>
        <Cursor />
      </ComponentPreview>

      <ComponentPreview height={200} notReady>
        <MusicSheet />
      </ComponentPreview>
      <ComponentPreview notReady>
        <LiveBlogs />
      </ComponentPreview>
      <ComponentPreview>
        <InputCheck />
      </ComponentPreview>
      <ComponentPreview>
        <AnimatedCounter />
      </ComponentPreview>
      <ComponentPreview>
        <YearsTabs />
      </ComponentPreview>
      <ComponentPreview>
        <JoiDownloadButton />
      </ComponentPreview>
      <ComponentPreview>
        <LinearTab />
      </ComponentPreview>
      <ComponentPreview>
        <TabBars />
      </ComponentPreview>
      <ComponentPreview>
        <PeerListBar />
      </ComponentPreview>
      <ComponentPreview>
        <NewHero />
      </ComponentPreview>
      <ComponentPreview>
        <MagneticLines />
      </ComponentPreview>
      <ComponentPreview notReady>
        <PromptBox />
      </ComponentPreview>
      <ComponentPreview notReady>
        <DropdownNav />
      </ComponentPreview>
      <ComponentPreview>
        <AnimatedFeedback />
      </ComponentPreview>
      <ComponentPreview>
        <AmieAction />
      </ComponentPreview>
      <ComponentPreview>
        <Fellaz />
      </ComponentPreview>
      <ComponentPreview>
        <MovieGallery />
      </ComponentPreview>
      <ComponentPreview>
        <Wants />
      </ComponentPreview>
      <ComponentPreview>
        <Wheel />
      </ComponentPreview>
      <ComponentPreview>
        <Counter />
      </ComponentPreview>
      <ComponentPreview>
        <Bolt />
      </ComponentPreview>
      <ComponentPreview height={200}>
        <Cashflow />
      </ComponentPreview>
      <ComponentPreview>
        <Typer />
      </ComponentPreview>
      <ComponentPreview notReady>
        <SearchUser />
      </ComponentPreview>
      <ComponentPreview notReady>
        <ImageCarousel images={images} />
      </ComponentPreview>
      <ComponentPreview>
        <Slider />
      </ComponentPreview>
      <ComponentPreview height={200} notReady>
        <DynamicIsland />
      </ComponentPreview>
      <ComponentPreview>
        <SignIn />
      </ComponentPreview>
      <ComponentPreview>
        <TelegramInput />
      </ComponentPreview>
      <Footer />
    </div>
  );
};

export default Home;
