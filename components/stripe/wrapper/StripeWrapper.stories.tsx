import { ComponentMeta, ComponentStory } from '@storybook/react';
import StripeWrapper, { IStripeWrapper } from './StripeWrapper';

export default {
  title: 'templates/StripeWrapper',
  component: StripeWrapper,
  argTypes: {},
} as ComponentMeta<typeof StripeWrapper>;

const Template: ComponentStory<typeof StripeWrapper> = (args) => <StripeWrapper {...args} />;

export const Base = Template.bind({});

const base: IStripeWrapper = {};

Base.args = {
  ...base,
} as IStripeWrapper;
