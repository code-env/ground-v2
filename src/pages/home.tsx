import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import {
  AmieAction,
  AnimatedCounter,
  AnimatedFeedback,
  Bolt,
  Cashflow,
  ClickSelect,
  ComponentPreview,
  Counter,
  Cursor,
  DotMatrixClock,
  DropdownNav,
  DynamicIsland,
  DynamicStatusButton,
  Feedback,
  Fellaz,
  FigmaLayout,
  FluidButton,
  Footer,
  Hero,
  ImageCarousel,
  InputCheck,
  InputShotcut,
  JoiDownloadButton,
  LinearTab,
  LiveBlogs,
  MagneticLines,
  Map,
  ModeToggle,
  MovieGallery,
  MusicSheet,
  NewHero,
  PeerListBar,
  Plan,
  ProfileEdit,
  PromptBox,
  SearchUser,
  SignIn,
  Slider,
  StackClick,
  TabBars,
  TelegramInput,
  TodoList,
  Typer,
  Uploader,
  UserSearch,
  UserStacked,
  Wants,
  Wheel,
  WordRoll,
  YearsTabs,
  View,
  Volume,
} from "@/components/animations";

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
    <div className="min-h-screen flex flex-col gap-20 items-center justify-center lg:px-0 px-10 overflow-x-clip">
      <div className="h-screen fixed top-0 max-w-screen-lg inset-x-0 w-full mx-auto border-x border -z-10 candy-bg hidden md:block" />
      <Hero hidden={isHidden} />
      <Feedback hidden={isHidden} />
      <ComponentPreview>
        <ModeToggle />
      </ComponentPreview>
      <ComponentPreview notReady>
        <Volume />
      </ComponentPreview>
      <ComponentPreview notReady>
        <Map />
      </ComponentPreview>
      <ComponentPreview>
        <View />
      </ComponentPreview>
      <ComponentPreview>
        <Plan />
      </ComponentPreview>
      <ComponentPreview>
        <TodoList />
      </ComponentPreview>

      <ComponentPreview>
        <DynamicStatusButton />
      </ComponentPreview>
      <ComponentPreview>
        <FluidButton />
      </ComponentPreview>
      <ComponentPreview>
        <DotMatrixClock />
      </ComponentPreview>
      <ComponentPreview notReady>
        <StackClick />
      </ComponentPreview>
      <ComponentPreview notReady>
        <FigmaLayout />
      </ComponentPreview>
      <ComponentPreview notReady>
        <ProfileEdit />
      </ComponentPreview>
      <ComponentPreview notReady>
        <Uploader />
      </ComponentPreview>
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
      <ComponentPreview height={15}>
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
      <ComponentPreview>
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
      <ComponentPreview notReady>
        <TelegramInput />
      </ComponentPreview>
      <Footer />
    </div>
  );
};

export default Home;
