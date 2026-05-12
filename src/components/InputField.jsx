function InputField({
  type,
  name,
  placeholder,
  value,
  onChange,
  className = ""
}) {

  return (

    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className={`
        w-full
        px-4
        py-3
        rounded-xl
        border
        border-gray-300
        outline-none
        focus:ring-2
        focus:ring-cyan-500
        bg-white
        text-black
        ${className}
      `}
    />

  )
}

export default InputField