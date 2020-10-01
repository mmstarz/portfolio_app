import React from "react";
// els
import ReposSection from "./reposSection";
// with styles
import { CardProfile } from "../../../widgets/withStyles/withStyles";

const ReposWrapper = () => {
  return (
    <CardProfile>
      <ReposSection />
    </CardProfile>
  );
};

export default ReposWrapper;
