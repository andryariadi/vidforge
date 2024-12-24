type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  propsData?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const TextareaField = ({ propsData, ...props }: TextareaProps) => {
  return (
    <textarea
      {...propsData}
      {...props}
      className="w-full pl-4 py-3 rounded-lg bg-black-1 outline-none border border-gray-800 focus:border-orange-1 text-white-2 placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300"
    />
  );
};

export default TextareaField;
