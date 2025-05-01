import React from "react";

type Props = {
  text: string;
};

const TitlePage = ({ text }: Props) => {
  return (
    <h1 className="text-2xl font-light transition-all duration-500 ease-in-out sm:text-4xl sm:font-semibold">
      {text}
    </h1>
  );
};

export default TitlePage;
