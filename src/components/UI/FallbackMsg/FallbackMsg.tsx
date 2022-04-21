import { IconType } from 'react-icons';

const FallbackMsg: React.FC<{
  fallbackData: {
    title: string;
    text: string;
    icon: IconType;
  };
}> = (props) => {
  const { fallbackData } = props;

  return (
    <div className='flex h-full flex-col justify-center items-center text-center bg-neutral-100 text-neutral-500 p-8 '>
      <fallbackData.icon className='shrink-0 text-8xl text-neutral-300 mb-12' />
      <h2 className='text-neutral-700 text-lg mb-4 '>{fallbackData.title}</h2>
      <p>{fallbackData.text}</p>
      {props.children}
    </div>
  );
};

export default FallbackMsg;
