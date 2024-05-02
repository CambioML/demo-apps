'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-4xl text-neutral-800 font-semibold whitespace-pre-line">{title}</div>
      <div className="font-light text-neutral-500 mt-5 text-2xl">{subtitle}</div>
    </div>
  );
};

export default Heading;
