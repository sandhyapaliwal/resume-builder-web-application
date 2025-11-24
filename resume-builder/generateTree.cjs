const fs = require("fs");
const path = require("path");

const IGNORE = ["node_modules", ".git", "dist", ".vscode", ".env", "coverage", "tree.txt"];

function printTree(dir, prefix = "") {
  const files = fs.readdirSync(dir).filter(f => !IGNORE.includes(f)).sort();
  files.forEach((file, i) => {
    const fullPath = path.join(dir, file);
    const isLast = i === files.length - 1;
    const isDir = fs.statSync(fullPath).isDirectory();
    const connector = isLast ? "└── " : "├── ";
    treeOutput += `${prefix}${connector}${file}\n`;
    if (isDir) printTree(fullPath, prefix + (isLast ? "    " : "│   "));
  });
}

let treeOutput = `${path.basename(process.cwd())}\n`;
printTree(".");

fs.writeFileSync("tree.txt", treeOutput, "utf8");
console.log("✅ Tree saved to tree.txt");
