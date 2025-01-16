import AmieAction from "@/components/animations/amie-action";
import Bolt from "@/components/animations/bolt";
// import ImageCarousel from "@/components/animations/carousel";
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

import Feedback from "@/components/shared/feedback";
import Footer from "@/components/shared/footer";
import Hero from "@/components/shared/hero";
// import DropdownNav from "./components/animations/dropdown";
// import { PromptBox } from "./components/animations/prompt-box";
import MagneticLines from "./components/animations/magnetic-tiles";
import TelegramInput from "./components/animations/telegram-input";
import NewHero from "./components/animations/animate-text";
import PeerListBar from "./components/animations/peerlist-bar";
import TabBars from "./components/animations/tab-bars";

const App = () => {
  // const images = ["/succession.jpeg", "/mirror.jpeg", "/dune.jpg"];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:px-0 px-10">
      <Hero />
      <Feedback />
      {/* <ComponentPreview>
        <Cursor />
      </ComponentPreview> */}
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
      {/* <ComponentPreview>
        <PromptBox />
      </ComponentPreview> */}
      {/* <ComponentPreview>
        <DropdownNav />
      </ComponentPreview> */}
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
      {/* <ComponentPreview>
        <ImageCarousel images={images} />
      </ComponentPreview> */}
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
