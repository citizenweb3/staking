const deepValue = (obj: Object, path: string) => {
  const pathParts = path.split('.');
  try {
    return pathParts.reduce((a, v) => a[v as keyof Object], obj) || '<' + pathParts[pathParts.length - 1] + '>';
  } catch {
    return '<' + pathParts[pathParts.length - 1] + '>';
  }
};
export default deepValue;
