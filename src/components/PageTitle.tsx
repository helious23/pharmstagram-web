import { Helmet } from "react-helmet-async";

interface IPageTitleProps {
  title: string;
}

const PageTitle: React.FC<IPageTitleProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} · Pharmstagram </title>
    </Helmet>
  );
};

export default PageTitle;
