// Example: obj={...} path="clinic.user.name" return="John"
export function getNestedProperty(obj: any, path: string): any {
  const pathArray = path.split(".");
  return pathArray.reduce(
    (accumulator, pathElement) => accumulator && accumulator[pathElement],
    obj
  );
}

// Obj is updated in place and func is usable with existing objects
// Exmaple: obj={} path={clinic.user.name} value="John" result={clinic: {user: {name: "John"}}}
export function setNestedProperty(obj: any, path: string, value: any) {
  const pathArray = path.split(".");
  let updatedObj = obj;
  pathArray.forEach((part, index) => {
    if (index === pathArray.length - 1) {
      updatedObj[part] = value;
    } else {
      updatedObj[part] = updatedObj[part] || {}; // Ensure the structure exists
      updatedObj = updatedObj[part];
    }
  });
}
