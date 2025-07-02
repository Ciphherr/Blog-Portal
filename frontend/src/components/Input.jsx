const input = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className="w-full p-2 px-4 rounded-2xl border-2 text-light border-dark-light focus:ring-2 focus:ring-light"
    />
  );
};

export default input;
