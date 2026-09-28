const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if(file.endsWith('.ts') || file.endsWith('.tsx')) results.push(file);
  });
  return results;
}
const files = walk('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (/'http:\/\/localhost:5000\//.test(content)) {
    content = content.replace(/'http:\/\/localhost:5000\/(.*?)'/g, '`${process.env.NEXT_PUBLIC_API_URL || \'http://localhost:5000\'}/$1`');
    changed = true;
  }
  if (/`http:\/\/localhost:5000\//.test(content)) {
    content = content.replace(/`http:\/\/localhost:5000\/(.*?)`/g, '`${process.env.NEXT_PUBLIC_API_URL || \'http://localhost:5000\'}/$1`');
    changed = true;
  }
  
  if(changed) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
