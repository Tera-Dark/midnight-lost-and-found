import { readFileSync, existsSync } from "node:fs";
import { Script } from "node:vm";
import assert from "node:assert/strict";

const html = readFileSync("index.html", "utf8");
const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
assert(inlineScripts.length >= 2, "Expected base router and mobile UX scripts");
inlineScripts.forEach((body,i)=>new Script(body,{filename:`inline-script-${i+1}.js`}));
const required = ["mobilebottom","menubtn","mobilefont","sidebar","suyao","jiang","characters","world","cases","assets/"];
assert(html.includes("assets/jiang-xun-v2.webp"),"Character gallery does not reference current Jiang Xun image");
for(const item of required)assert(html.includes(item),`Website missing required marker: ${item}`);
for(const path of ["assets/su-yao.webp","assets/jiang-xun-v2.webp","site/su-yao-card.md","site/jiang-xun-card.md"]){
 assert(existsSync(path),`Missing required content: ${path}`);
}
console.log("Reader site syntax, navigation markers, and character assets verified.");
