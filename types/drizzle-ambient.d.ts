// 临时类型声明：在安装依赖前消除 TS 报错
// 安装后（npm i drizzle-orm drizzle-kit postgres）仍然兼容
declare module "postgres" {
  const postgres: any;
  export default postgres;
}

declare module "drizzle-orm/postgres-js" {
  export const drizzle: any;
}