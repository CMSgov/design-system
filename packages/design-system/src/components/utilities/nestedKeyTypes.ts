/**
 * From https://medium.com/xgeeks/typescript-utility-keyof-nested-object-fa3e457ef2b2
 * and https://gist.github.com/pffigueiredo/9161240b8c09d51ea448fd43de4d8bbc#file-nestedkeyof-ts
 */

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];
