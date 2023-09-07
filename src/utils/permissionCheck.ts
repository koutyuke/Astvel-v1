/* eslint-disable no-bitwise */
const permissionCheck = (permissions: bigint | number, target: bigint) => (BigInt(permissions) & target) === target;

export { permissionCheck };
