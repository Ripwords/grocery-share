export const filteredObj = (obj: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) => Object.entries(obj).reduce((acc: typeof obj, [key, value]) => {
  if (value !== undefined) {
    acc[key] = value;
  }
  return acc;
}, {});