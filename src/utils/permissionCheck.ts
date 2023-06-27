/* eslint-disable no-bitwise */
const permissionChech = (permissions: bigint | number, target: bigint) => (BigInt(permissions) & target) === target;

export default permissionChech;
