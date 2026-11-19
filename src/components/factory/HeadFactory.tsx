import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppPrefix } from '../../app/constants';


interface HeadFactory {
  title: string;
  children?: React.ReactNode;
}


const HeadFactory = ({ title, children }: HeadFactory) => {
  const { pathname } = useLocation();
  const [pageTitle] = useState<string>(title);

  return (
    <Helmet key={pathname}>
      <title>{`${pageTitle} | ${AppPrefix}`}</title>
      {children}
    </Helmet>
  )
}

export default HeadFactory;
