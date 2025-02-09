export const SvgComponent = ({ svgData }: { svgData: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: svgData }} />;
};
