import { Partial } from "@/FrontEndTypes";

export function combine<T>(
  obj1: T,
  obj2?: Partial<T>,
  obj3?: Partial<T>,
  obj4?: Partial<T>,
  obj5?: Partial<T>
): T {
  return Object.assign({}, obj1, obj2, obj3, obj4, obj5) as T;
}
