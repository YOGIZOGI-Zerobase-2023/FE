import Input, { InputProps } from '../common/Input';

interface InputBoxProps extends InputProps {
  title: string;
}

const InputBox = ({
  title,
  type,
  name,
  placeholder,
  value,
  handleChange
}: InputBoxProps) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-gray-500 max-md:text-inherit">
          {title}
        </span>
      </label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        handleChange={handleChange}
      />
    </div>
  );
};

export default InputBox;
