import { } from 'react';

import useWindowSize from '../../../hooks/useWindowSize';
import HeadFactory from '../../factory/HeadFactory';
import HighlighterFactory from '../../factory/HighlighterFactory';

import { txtErr } from '../../../assets/imgs/ASCII';


const codeStringLg = `
export const handleError = (err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: "initializingError 😅",
    suggestion: [
      "check your browser support!",
    ],
  });
};`;

const codeStringSm = `
export const handleError =
  (err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: "initializingError 😅",
      suggestion: [
        "check your browser support!",
      ],
    });
  };`;


const ErrorRunningMat = () => {
  const { isAtLeast } = useWindowSize();


  return (
    <>
      <HeadFactory title='Something Went Wrong' />
      <div className='ErrorPage h-full w-full overflow-y-auto overflow-x-hidden custom-scrollbar py-2'>
        <div className='container mx-auto min-h-full flex flex-col md:flex-row gap-4'>
          <div className='w-full md:w-1/2 flex flex-col md:items-center md:justify-center py-4'>
            <pre className='text-sm md:text-xl font-bold font-mono text-primary-50 leading-none select-none'>{txtErr}</pre>
          </div>

          <div className='w-full md:w-1/2 flex flex-col md:justify-center gap-8'>
            <div className='overflow-x-auto custom-scrollbar text-sm md:text-base'>
              <HighlighterFactory showLineNumbers>
                {!isAtLeast.md ? codeStringSm.trim() : codeStringLg.trim()}
              </HighlighterFactory>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorRunningMat;
