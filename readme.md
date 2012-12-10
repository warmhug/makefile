
# 模版文件/项目目录 生成工具 #

----------

- 简介
> 文件、项目目录生成工具。  
> 命令行输入makefile xx.less，生成单个xx.less文件；  
> 输入makefile proj则生成基本树结构目录proj（默认为简单seajs文件）。  
>   
> 由于是简单的文件目录拷贝，所以可以自定义目录结构。如下：  
> npm root -g 找到npm包根目录，如：C:\Users\xx\AppData\Roaming\npm   
> 找到\node_modules\makefile\template 目录，自定义目录内的文件和文件夹即可。

- 安装
> npm install makefile -g  

- 使用
 > makefile xx.html  
 > makefile proj

