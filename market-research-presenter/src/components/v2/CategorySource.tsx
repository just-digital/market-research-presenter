import SourceFull from "./SourceFull";
import SourceLite from "./SourceLite";

const CategorySource = ({ categorySource }: { categorySource: any }) => {
  return (
    <>
      {categorySource.sources_top.map((source: any) => (
        <SourceFull key={source.id} source={source} />
      ))}

      {categorySource.sources_remainder.map((source: any) => (
        <SourceLite key={source.id} source={source} />
      ))}
    </>
  );
};

export default CategorySource;
