'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  small?: boolean;
}

const Heading = ({ title, subtitle, small, center }: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className={`${small ? 'text-2xl' : 'text-4xl'} text-neutral-800 font-semibold whitespace-pre-line`}>
        {title}
      </div>
      <div className={`font-light text-neutral-500 ${small ? 'text-xl mt-2 ' : 'text-2xl mt-5 '}`}>{subtitle}</div>
    </div>
  );
};

export default Heading;
