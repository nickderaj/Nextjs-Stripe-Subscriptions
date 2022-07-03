import { ComponentMeta, ComponentStory } from '@storybook/react';
import SubscriptionCard, { ISubscriptionCard } from './SubscriptionCard';

export default {
  title: 'templates/SubscriptionCard',
  component: SubscriptionCard,
  argTypes: {},
} as ComponentMeta<typeof SubscriptionCard>;

const Template: ComponentStory<typeof SubscriptionCard> = (args) => <SubscriptionCard {...args} />;

export const Base = Template.bind({});

const base: ISubscriptionCard = {
  flatPrice: 20,
  sessionPrice: 50,
  title: 'Basic',
  active: true,
  setActive: () => {},
};

Base.args = {
  ...base,
} as ISubscriptionCard;
