import { ShallowWrapper } from 'enzyme';

export const findByTestAttr = (wrapper: ShallowWrapper, value: string) => {
  return wrapper.find(`[data-test='${value}']`);
}
