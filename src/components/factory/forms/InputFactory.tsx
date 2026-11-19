import { type DetailedHTMLProps, type HTMLInputTypeAttribute, type InputHTMLAttributes } from 'react';
import { classCombiner } from '../../../utils';


interface InputFactoryProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  className?: string;
}


const InputFactory = ({ type, className, ...props }: InputFactoryProps) => {
  return (
    <input
      type={type}
      className={classCombiner(`flex-1 px-4 py-3 bg-primary-950/15 border border-primary-500 rounded-lg w-full`,
        !props.disabled && `hover:border-blue-600 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600`,
        props.disabled && `opacity-45 pointer-events-none`,
        `transition duration-200 shadow-sm font-medium`, className)}
      {...props} />
  )
}

export default InputFactory;
