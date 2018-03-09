# 课时1  认识DOM与VirtualDOM

### 认识DOM
首先介绍下DOM，DOM = Document Object Model字面意思是文档对象模型，实际上就是网页上一个HTML所有节点对象的模型，因为它类似于树形结构,故我们称之为DOM树。
接下来以Google首页为例，介绍下以DOM树，根据首页中Google图片，如图所示：

各个节点我们按照数学的语言可以看出DOM就是一堆节点的集合，如下所示：
DOM = {node1,node2,node3....noden}

![](1.png)

### 什么是VirtualDOM
VDOM = Virtual Document Object Model
VNODE = Virtual Node = Node in memory (可以理解为内存中的节点，还没有挂载展示到页面上的节点)

在内存中创建完虚拟node后，如何创建虚拟DOM呢？

同DOM一样 VDOM = {Vnode1,Vnode2,Vnode3....Vnoden} 就是一堆VNODE的集合

实例请参考视频做练习。

![](2.png)

![](3.png)