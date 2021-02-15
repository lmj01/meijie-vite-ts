# Web

FOUC(Flash of Unstyled Content)无样式内容闪烁

白屏就是浏览器渲染的时候请求的资源没有到位，这个牵扯到浏览器的渲染机制。

## robots

当一个搜索机器人（蜘蛛）访问一个站点时，它会首先检查根目录下是否有robots.txt，如果存在，将按照robots.txt中的内容来确定访问内容，如果不存在，就沿着链接抓取。

robots.txt
```txt
# Robots.txt file from http://www.seovip.cn
# All robots will spider the domain

User-agent: *
Disallow:
```
