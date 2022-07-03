export type IBaseTemplate = {
  sampleTextProp: string;
};

export default function BaseTemplate({ sampleTextProp }: IBaseTemplate) {
  return <div>{sampleTextProp}</div>;
}
