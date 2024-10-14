/// <reference types="vite/client" />

// 让 ts 认识 .vue 文件的类型声明文件
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component:DefineComponent<{},{},any>
  export default component
}

interface ImportMetaEnv{
  readonly VITE_TITLE:string
}

interface IConfigItem {
  key: string,
  value: string,
  checked: boolean
}