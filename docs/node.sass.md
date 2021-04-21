# sass

## 运行库
npm install sass --dev
vite构建工具中自动集成了scss，所以不需要sass-loader之类的，但需要sass的运行库，npm install sass --dev

## node-sass
npm install --save-dev node-sass

```json
"css-home": "node-sass -r ./src/style/home/home.scss --include-path node_modules --output-style compressed --source-map false --source-map-contents false --precision 6 -o public/css",
```

-output-style             CSS output style (nested | expanded | compact | compressed)

## bootstrap