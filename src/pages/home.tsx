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
      <ComponentPreview href="https://x.com/jakubkrehel/status/1911816000107901308">
        <ModeToggle />
      </ComponentPreview>
      <ComponentPreview notReady>
        <Volume />
      </ComponentPreview>
      <ComponentPreview notReady>
        <Map />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/gobennovela/status/1902773494158406036">
        <View />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/KumailNanji/status/1904512842684145854">
        <Plan />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/raunofreiberg/status/1578344374055751680">
        <TodoList />
      </ComponentPreview>

      <ComponentPreview href="https://x.com/lochieaxon/status/1700192743576973633">
        <DynamicStatusButton />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/nonzeroexitcode/status/1883605350701826090">
        <FluidButton />
      </ComponentPreview>
      <ComponentPreview href="https://showcase.saran13raj.com/desk-clock">
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
      <ComponentPreview href="https://x.com/joebell_/status/1892549833946226770">
        <UserStacked />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/KumailNanji/status/1856692491702902929">
        <ClickSelect />
      </ComponentPreview>

      <ComponentPreview notReady>
        <UserSearch />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/raunofreiberg/status/1848279346785488939">
        <InputShotcut />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/bollmann0x/status/1892963996174581913">
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
      <ComponentPreview href="https://x.com/victorwelander_/status/1889364334561648988">
        <InputCheck />
      </ComponentPreview>
      <ComponentPreview>
        <AnimatedCounter />
      </ComponentPreview>
      <ComponentPreview
        height={15}
        href="https://x.com/nonzeroexitcode/status/1883120034131943830"
      >
        <YearsTabs />
      </ComponentPreview>
      <ComponentPreview href="https://joi.software/">
        <JoiDownloadButton />
      </ComponentPreview>
      <ComponentPreview href="https://linear.app">
        <LinearTab />
      </ComponentPreview>
      <ComponentPreview>
        <TabBars />
      </ComponentPreview>
      <ComponentPreview href="https://peerlist.io/scroll">
        <PeerListBar />
      </ComponentPreview>
      <ComponentPreview href="https://ground.bossadizenith.me/">
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
      <ComponentPreview href="https://x.com/emilkowalski_/status/1782392557692948747">
        <AnimatedFeedback />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/Ibelick">
        <AmieAction />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/jakubkrehel/status/1797712038019633362">
        <Fellaz />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/jakubkrehel">
        <MovieGallery />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/nitishkmrk/status/1866733655227605156">
        <Wants />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/nitishkmrk/status/1816724129619558518">
        <Wheel />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/nitishkmrk/status/1804132896766308587">
        <Counter />
      </ComponentPreview>
      <ComponentPreview href="https://www.aceternity.com/">
        <Bolt />
      </ComponentPreview>
      <ComponentPreview
        height={200}
        href="https://x.com/KumailNanji/status/1857125863210225865"
      >
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
      <ComponentPreview href="https://x.com/60fpsdesign/status/1820813051538333889">
        <Slider />
      </ComponentPreview>
      <ComponentPreview height={200} notReady>
        <DynamicIsland />
      </ComponentPreview>
      <ComponentPreview href="https://x.com/nitishkmrk/status/1780849995635474492">
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
