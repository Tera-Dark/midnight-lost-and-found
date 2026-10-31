import { readFileSync, existsSync } from "node:fs";
import { Script } from "node:vm";
import assert from "node:assert/strict";

const html = readFileSync("index.html", "utf8");
const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
assert(inlineScripts.length >= 2, "Expected base router and mobile UX scripts");
inlineScripts.forEach((body,i)=>new Script(body,{filename:`inline-script-${i+1}.js`}));
const required = ["mobilebottom","menubtn","mobilefont","sidebar","suyao","jiang","characters","world","cases","assets/"];
for (const path of ["assets/jiang-xun-v3.webp", "assets/su-yao-v2.webp"]) assert(html.includes(path), `Character gallery does not reference ${path}`);
for(const item of required)assert(html.includes(item),`Website missing required marker: ${item}`);
for(const path of ["assets/su-yao-v2.webp","assets/jiang-xun-v3.webp","site/su-yao-card.md","site/jiang-xun-card.md"]){
 assert(existsSync(path),`Missing required content: ${path}`);
}
console.log("Reader site syntax, navigation markers, and character assets verified.");
