# MusicNet
实训项目，基于JavaScript

# 绪论
本项目应用了 Vue2，SpringBoot 和 Mybatis 框架。实训过程中，在参考了实训发放的相
关书籍资料以及网络上的视频资料，分析了市场上现有的网站的特性的基础上，利用 vue2 搭
建前端网页，使用 google 浏览器内核自带的 audio 特性实现网页的展示以及音频的播放，同
时，在后端中运用 mybatis 与数据库实现交互以及 SpringBoot 管理应用实现与前端的交互网
页，基于此，为用户提供音乐播放，收藏，排行榜，播放器动画特效等一系列丰富的功能。

# 架构
本项目从内容上可以划分成前台和后台两个部分。其中后台部分供网页管理员使用，可
以完成歌手管理，歌曲管理，歌单管理和平台内容统计四个方面，便于管理员更加便捷高效
地直接使用网页上传歌曲音频，歌手信息，创建歌单而不必直接编写代码或操作数据库来完
成相应任务；前台部分供用户使用，即正式的音乐网实体，可供用户完成查询歌单、歌手、
歌曲、排行榜，播放歌曲，收藏歌曲，发送弹幕，登录注册等活动，为用户提供了丰富的个
性化的功能。
从开发过程的角度上，本项目可以划分成前端和后端两个部分。其中后端部分运行在
node14.5 环境上，基于此设计服务器的结构，同时采用了 MySQL 数据库，并利用 MyBatis 框
架实现与数据库的交互，利用 SpringBoot 框架搭建应用结构，用于在不同端口号之间，数据
库与应用程序之间发送信息以实现前后端信息的交互，利用这两个框架，极大地简化了开发
的进程；前端部分采用 Vue2 框架，利用相关知识完成 UI 设计与实现以及操作界面的逻辑功
能。

# 开发环境
前端开发环境：Visua Studio Code
后端开发环境：Navica Premium 12 Intellij IDEA 2022.3.3
# 程序的运行环境
vue2.9.6 MySQL8.0.31 node14.5 java1.8.0_172 maven3.6.1

# 系统总结
1 特点
（1）本系统除了用户使用的界面以外还提供了后台服务，这使得管理员可以更加简洁高
效的管理系统内的歌曲，歌手以及用户，而不必直接操作数据库。
（2）本系统在播放器界面加入了粒子特效，该特效可以营造一种类似星空的动态效果。
（3）本系统在播放器界面加入了音乐频谱展示和弹幕展示，提高了界面的美观度以及与
用户的交互性。
（4）本系统提供了对于整体歌曲信息的统计图表，更便于管理员直观地掌握系统变化。
（5）本系统主要采用了莫兰迪配色，设计上给人一种清爽舒适的感觉。
2 不足
（1）本系统在刷新时存在诸多问题，可能会导致数据丢失，系统卡顿动画渲染失败等。
（2）动画在渲染时占用电脑内存较高
（3）登录注册界面逻辑较为简单，没有提供很好的信息保护措施。
（4）用户个性化角度设计不足，仅为用户个人提供了评论和收藏的功能。
（5）整体功能较为单一，布局和展示维度不够灵活。
（6）数据库设计较为简单，不满足范式的要求，难以支持一定规模的数据处理。
3 改进
（1）优化数据库设计，尽可能满足范式的要求。
（2）继续修改刷新时可能遇到的问题。
（3）改进动画加载的算法，尽可能减少内存消耗。