interface ITitle {
  label: string;
}

const Title = ({ label }: ITitle) => {
  return <h2 className="text-xl font-semibold">{label}</h2>;
};

export default Title;
