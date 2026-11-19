import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react';
import { classCombiner } from '../../../utils';


interface InputFactoryProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
}

const BtnFactory = ({ children, className, ...props }: InputFactoryProps) => {
  return (
    <button
      className={classCombiner(`cursor-pointer px-6 py-2 bg-primary-950/15 border border-primary-500 rounded-lg w-full
        transition duration-200 shadow-sm font-medium`,
        !props.disabled && `hover:border-blue-600 focus:bg-blue-700 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700`,
        props.disabled && `opacity-45 pointer-events-none`, className)}
      {...props}>
      {children}
    </button>
  )
}

export default BtnFactory;
