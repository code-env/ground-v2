import AmieAction from "@/components/animations/amie-action";
import Bolt from "@/components/animations/bolt";
import ImageCarousel from "@/components/animations/carousel";
import Cashflow from "@/components/animations/cashflow-flow";
import ComponentPreview from "@/components/animations/component-preview";
import Counter from "@/components/animations/counter";
import DynamicIsland from "@/components/animations/dynamic-island";
import AnimatedFeedback from "@/components/animations/feedback";
import Fellaz from "@/components/animations/fellaz";
import MovieGallery from "@/components/animations/movie-gallery";
import SearchUser from "@/components/animations/search-user";
import SignIn from "@/components/animations/sign-in";
import Slider from "@/components/animations/slider";
import Typer from "@/components/animations/typer";
import Wants from "@/components/animations/wants";
import Wheel from "@/components/animations/wheel";
import LinearTab from "@/components/animations/linear-tab";

import Feedback from "@/components/shared/feedback";
import Footer from "@/components/shared/footer";
import Hero from "@/components/shared/hero";
import DropdownNav from "./components/animations/dropdown";
import { PromptBox } from "./components/animations/prompt-box";
import MagneticLines from "./components/animations/magnetic-tiles";
import TelegramInput from "./components/animations/telegram-input";
import NewHero from "./components/animations/animate-text";
import PeerListBar from "./components/animations/peerlist-bar";
import TabBars from "./components/animations/tab-bars";
import JoiDownloadButton from "./components/animations/joi-download-button";
import YearsTabs from "./components/animations/years-tabs";
import MusicSheet from "./components/animations/music-shit";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import AnimatedCounter from "./components/animations/followers-count";
import InputCheck from "./components/animations/input-check";
import ClickSelect from "./components/animations/click-select";
import LiveBlogs from "./components/animations/live-blocks";
import WordRoll from "./components/animations/word-roll";
import Cursor from "./components/animations/cursor";
import InputShotcut from "./components/animations/input-shotcut";
import UserSearch from "./components/animations/user-search";

const App = () => {
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
      <ComponentPreview notReady>
        <ClickSelect />
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
      <ComponentPreview height={100}>
        <Cashflow />
      </ComponentPreview>
      <ComponentPreview>
        <Typer />
      </ComponentPreview>
      <ComponentPreview>
        <SearchUser />
      </ComponentPreview>
      <ComponentPreview notReady>
        <ImageCarousel images={images} />
      </ComponentPreview>
      <ComponentPreview>
        <Slider />
      </ComponentPreview>
      <ComponentPreview height={200}>
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

export default App;
