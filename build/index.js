import { zip } from "zip-a-folder";

await zip("dist", "./deploy/header-modifier.zip");