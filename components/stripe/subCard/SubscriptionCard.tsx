import { Dispatch, SetStateAction } from 'react';

export type ISubscriptionCard = {
  flatPrice: number;
  sessionPrice: number;
  title: string;
  active: boolean;
  setActive: Dispatch<SetStateAction<string>>;
};

export default function SubscriptionCard({ flatPrice, sessionPrice, title, active, setActive }: ISubscriptionCard) {
  const handleClick = () => {
    setActive(title.toLowerCase());
  };

  return (
    <div
      className={`p-12 px-24 ${active ? 'bg-purple-300' : 'bg-purple-50'} w-full h-full overflow-hidden cursor-pointer`}
      onClick={handleClick}>
      <div className={`${active ? 'scale-110' : 'scale-90'} flex flex-col justify-center items-center`}>
        <h2 className="text-base">{title}</h2>
        <h3 className="text-4xl pt-4">${flatPrice}</h3>
        <span className="text-xs">per month</span>
        <h4 className="text-4xl pt-4">${sessionPrice}</h4>
        <span className="text-xs">per session</span>
      </div>
    </div>
  );
}
