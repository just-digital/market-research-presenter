import { Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";

import CategorySource from "./CategorySource"

const CategorySelector = ({ categories }: { categories: any }) => {
  const [categorySource, setCategorySource] = useState(
    categories[0] 
  );

  return (
    <>
    <Tabs
      value={categorySource}
      onChange={(event, newValue) => setCategorySource(newValue)}
    >
      {categories.map(
        (category: { category_id: string; category_name: string }) => (
          <Tab
            key={category.category_id}
            value={category}
            label={category.category_name}
          />
        )
      )}
    </Tabs>

    <CategorySource categorySource={categorySource} />
    </>
  );
};

const Report = ({ report }: { report: any }) => {
  return (
    <>
      <Typography variant="h3" color="inherit" noWrap>
        Market Report for {report.doc.date}
      </Typography>
      <CategorySelector categories={report.doc.category_sources} />
      <Typography fontSize={12} color="inherit" noWrap>
        Generated at {report.doc.generated_at}
      </Typography>
    </>
  );
};

export default Report;
