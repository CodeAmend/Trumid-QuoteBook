// TODO find out what typescript class to use shollow
export const findByTestAttr = (wrapper: any, value: string) => {
  return wrapper.find(`[data-test='${value}']`);
}
