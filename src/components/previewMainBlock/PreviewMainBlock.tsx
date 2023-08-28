import React from "react";
import classes from "./previewMainBlock.module.css";
interface PreaviewBlockProps {
  text: string;
  id: string;
}
const PreviewMainBlock: React.FC<PreaviewBlockProps> = ({text, id}) => {
  return (
    <div id={id} className={classes.previewBlockContainer}>
      {text}
    </div>
  );
};
export default PreviewMainBlock;
