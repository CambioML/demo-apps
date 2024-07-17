interface Ititle {
  label: string;
}

const Title = ({ label }: Ititle) => {
  return <h2 className="text-xl font-semibold">{label}</h2>;
};

export default Title;
