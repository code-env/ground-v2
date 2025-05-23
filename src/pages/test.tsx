import Test from "@/components/shared/test";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      mask: React.SVGProps<SVGMaskElement> & {
        maskType?: string;
      };
    }
  }
}

const TestPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Test Page</h1>
      <Test />
    </div>
  );
};

export default TestPage;
