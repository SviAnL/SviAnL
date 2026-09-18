// 真实可播放的公共测试视频地址池
export const videoUrlPool = [
  'https://media.w3.org/2010/05/sintel/trailer.mp4',
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'http://vjs.zencdn.net/v/oceans.mp4',
  'https://media.w3.org/2010/05/bunny/trailer.mp4',
  'http://vjs.zencdn.net/v/oceans.mp4',
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4',
]

// 生成随机日期：2001-01-01 ~ 2026-12-31
export const randomDate = (i: number) => {
  const start = new Date(2001, 0, 1).getTime()
  const end = new Date(2026, 11, 31).getTime()
  // 用 i 做种子偏移，保证每次生成结果一致（伪随机）
  const seed = (i * 2654435761) % 4294967296
  const randomTime = start + (seed % (end - start))
  return new Date(randomTime).toISOString()
}

export const namePrefixes = [
  '代码',
  '像素',
  '云端',
  '极客',
  '数据',
  '逻辑',
  '灵感',
  '开源',
  '架构',
  '字节',
]

export const nameSuffixes = [
  '小站',
  '笔记',
  '空间',
  '日志',
  '工坊',
  '实验室',
  '星球',
  '部落',
  '角落',
  '基地',
]

export const descParts = [
  '一个热爱技术的小站',
  '专注前端与设计的博客',
  '记录日常开发与思考',
  '分享编程经验与灵感',
  '探索 Web 世界的角落',
  '不定期更新技术文章',
  '用心打磨每一行代码',
  '从零开始的全栈之路',
  '热爱开源，乐于分享',
  '一个安静的技术小屋',
]

// 随机昵称词库
export const nickPrefixes = [
  '快乐',
  '安静',
  '奔跑',
  '发呆',
  '微笑',
  '迷路',
  '摸鱼',
  '发光',
  '熬夜',
  '旅行',
]

// 随机昵称后缀
export const nickSuffixes = [
  '的小猫',
  '的程序员',
  '的星球',
  '的路人',
  '的咸鱼',
  '的旅人',
  '的树洞',
  '的夜猫',
  '的风',
  '的云',
]

// 随机留言词库
export const contentTemplates = [
  '网站设计很棒，内容也很有价值，期待更多更新！',
  '偶然路过，被这里的内容吸引住了，收藏了！',
  '写得太好了，解决了我困扰很久的问题，感谢博主！',
  '页面加载很快，排版也很舒服，学习到了～',
  '第一次来，感觉氛围很好，会常来的！',
  '干货满满，已经推荐给身边的朋友了。',
  '博主的审美在线，配色和交互都很赞。',
  '留言打卡，希望博主多多更新呀！',
  '看完受益匪浅，默默点了个赞。',
  '这里就像一个小宝库，慢慢逛慢慢学。',
]

// 真实项目语料池
export const projectPool = [
  {
    title: 'CollabBoard · 实时协作白板',
    description:
      '基于 WebRTC 的多人实时协作白板，支持无限画布、矢量绘图与思维导图，已服务超过 5000 个团队。',
    category: 'Web应用',
    tags: ['Vue 3', 'TypeScript', 'WebRTC', 'Canvas'],
    demoUrl: 'https://collabboard.demo.com',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>远程办公常态化后，团队对实时协作工具的需求激增。CollabBoard 致力于打造<strong>低延迟、高保真</strong>的在线协作白板。</p><h3>核心功能</h3><ul><li>无限画布：Canvas 分层渲染 + 视口裁剪，支持 10 万级图元流畅操作</li><li>实时协作：WebRTC DataChannel + CRDT，多人编辑无冲突，延迟低于 50ms</li><li>丰富图元：手绘、形状、便签、思维导图、流程图等 20+ 种元素</li><li>历史回放：完整记录操作流，可像视频一样回放整个创作过程</li></ul><h3>技术亮点</h3><p>采用 CRDT (Yjs) 解决多人协同冲突，Canvas 渲染层与业务逻辑层分离，自研增量同步协议在弱网下自动降级。</p><h3>项目成果</h3><p>上线 6 个月累计用户 1.2 万，Product Hunt 当日 Top 3，GitHub 2.3k Star。</p>`,
  },
  {
    title: 'Morning · 极简日记',
    description:
      '一款极简主义的跨平台日记应用，支持 Markdown 编辑、本地加密存储与情绪追踪，让记录成为一种治愈。',
    category: '移动端',
    tags: ['React Native', 'Expo', 'SQLite', 'Zustand'],
    demoUrl: 'https://morning-app.demo.com',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>设计理念</h2><p>Morning 主打<strong>「每天 3 分钟，与自己对话」</strong>，用最克制的交互帮助用户建立记录习惯。</p><h3>核心功能</h3><ul><li>极简编辑：打开即写，Markdown 实时预览</li><li>本地加密：基于 AES-256 全库加密，密钥永不离开设备</li><li>情绪追踪：每日选择情绪标签，生成月度情绪热力图</li><li>每日回顾：自动推送「去年今日」的日记</li></ul><h3>技术实现</h3><p>Expo 统一三端代码复用率 85%，SQLite + 自定义加密中间件查询性能提升 40%，Reanimated 3 实现 60fps 手势动画。</p><h3>用户反馈</h3><p>App Store 评分 4.9，累计下载 3 万+，被少数派、AppSo 等媒体推荐。</p>`,
  },
  {
    title: 'DevKit · 前端开发者工具箱',
    description:
      '开箱即用的开发者工具集合，包含 JSON 格式化、正则测试、JWT 解析等 30+ 工具，纯前端零上传。',
    category: '开源工具',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PWA'],
    demoUrl: 'https://devkit.tools',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目初衷</h2><p>在线工具要么广告满天飞，要么把数据上传服务器。DevKit 坚持<strong>「数据不出浏览器」</strong>，所有计算本地完成。</p><h3>工具清单</h3><ul><li>编码转换：Base64、URL、HTML 实体、Unicode</li><li>格式化：JSON、SQL、XML、CSS、Markdown</li><li>加密解密：MD5、SHA、AES、JWT 解析</li><li>颜色工具：HEX / RGB / HSL 互转、对比度检测</li></ul><h3>技术亮点</h3><p>基于 Next.js App Router，每个工具独立分包按需加载，总体积 < 500KB，支持 PWA 离线使用与命令面板 Cmd+K 搜索。</p><h3>社区数据</h3><p>GitHub 4.8k Star，周活跃用户 2 万+，Docker Hub 拉取量突破 10 万。</p>`,
  },
  {
    title: 'Aurora · 极光设计系统',
    description:
      '面向中后台产品的设计系统，包含 60+ 组件、完整 Design Token 与 Figma 插件，统一团队视觉语言。',
    category: '设计作品',
    tags: ['Figma', 'CSS', 'Storybook', 'Design Token'],
    demoUrl: 'https://aurora.design',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>中后台产品面临「多团队、多产品、视觉不统一」的痛点。Aurora 通过<strong>「Design Token + 组件库 + 规范文档」</strong>三位一体，让设计与开发同源。</p><h3>系统组成</h3><ul><li>Design Token：颜色、字体、间距、圆角等 200+ 变量，支持亮暗主题切换</li><li>组件库：60+ 高质量组件，覆盖表单、表格、导航、反馈场景</li><li>Figma 插件：设计稿一键同步 Token，自动生成组件变体</li><li>Storybook 文档：交互式示例 + API 文档 + 可访问性说明</li></ul><h3>落地成果</h3><p>已在 8 条产品线落地，设计还原度从 70% 提升至 95%，新页面开发效率提升 60%。</p>`,
  },
  {
    title: 'PixelForge · 在线像素画编辑器',
    description:
      '面向像素艺术家的在线编辑器，支持图层、动画帧、调色板管理与 GIF 导出，纯浏览器运行无需安装。',
    category: 'Web应用',
    tags: ['Vue 3', 'Canvas', 'Web Worker', 'IndexedDB'],
    demoUrl: 'https://pixelforge.app',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>像素画在独立游戏、NFT、复古设计中需求旺盛，但 Aseprite 价格不菲，在线工具又过于简陋。PixelForge 希望填补这个空白。</p><h3>核心功能</h3><ul><li>像素级绘制：铅笔、橡皮、油漆桶、直线、矩形、椭圆</li><li>图层系统：支持增删、合并、透明度、混合模式</li><li>动画帧：多帧编辑、洋葱皮、实时预览、GIF / APNG 导出</li><li>调色板：内置 20+ 经典调色板，支持导入 .pal 文件</li></ul><h3>技术亮点</h3><p>Canvas 分层渲染，绘制通过 Web Worker 离屏处理；自研 GIF 编码器比 gif.js 快 3 倍；支持导入 .aseprite 文件兼容专业工作流。</p><h3>用户数据</h3><p>上线 4 个月注册用户 8000+，累计创作作品 5 万+，被 Indie Game Dev 社区推荐。</p>`,
  },
  {
    title: 'FitFlow · 智能健身助手',
    description:
      '结合 AI 姿态识别的健身应用，通过手机摄像头实时纠正动作，提供个性化训练计划与饮食建议。',
    category: '移动端',
    tags: ['Flutter', 'TensorFlow Lite', 'Firebase', 'ML Kit'],
    demoUrl: 'https://fitflow.demo.com',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>居家健身最大的痛点是「动作不标准，没人纠正」。FitFlow 通过手机摄像头 + 端侧 AI，实时分析姿态，像私教一样给出反馈。</p><h3>核心功能</h3><ul><li>姿态识别：基于 MoveNet 检测 17 个人体关键点，实时判断动作标准度</li><li>动作纠正：深蹲、俯卧撑、平板支撑等 30+ 动作，实时语音提示</li><li>个性化计划：根据体能、目标、时间自动生成训练计划</li><li>饮食建议：拍照识别食物，估算热量与营养配比</li></ul><h3>技术亮点</h3><p>TensorFlow Lite 端侧推理<strong>无需上传视频</strong>，Flutter 一套代码支持双端，自研动作评分算法与专业教练评分相关性达 0.89。</p><h3>项目成果</h3><p>内测 2000+ 用户，平均每周训练 4.2 次，留存率 65%（行业平均 30%）。</p>`,
  },
  {
    title: 'LogiChain · 供应链溯源平台',
    description:
      '基于区块链的商品溯源系统，从生产到销售全链路上链，消费者扫码即可查看商品完整履历。',
    category: 'Web应用',
    tags: ['Node.js', 'Hyperledger Fabric', 'Docker', 'PostgreSQL'],
    demoUrl: 'https://logichain.demo.com',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>食品安全、奢侈品造假频发，传统溯源数据可被篡改。LogiChain 利用区块链<strong>不可篡改</strong>特性构建可信溯源网络。</p><h3>核心功能</h3><ul><li>全链路上链：原料采购、生产加工、仓储物流、终端销售各环节数据上链</li><li>扫码溯源：消费者扫码查看完整流转记录与质检报告</li><li>多方协作：供应商、厂商、物流、经销商共同维护，智能合约自动结算</li><li>防伪验证：一物一码，结合区块链哈希防止二维码复制</li></ul><h3>技术架构</h3><p>Hyperledger Fabric 联盟链兼顾性能与隐私，Node.js 网关封装链上链下交互，PostgreSQL 存储业务数据，Docker Compose 一键部署。</p><h3>落地案例</h3><p>已与 2 家有机农场、1 家茶叶品牌试点，累计上链商品 10 万+，扫码查询率 35%。</p>`,
  },
  {
    title: 'Inkwell · Markdown 写作平台',
    description:
      '面向长文写作者的 Markdown 编辑器，支持双向链接、知识图谱、多端同步与一键多平台发布。',
    category: 'Web应用',
    tags: ['React', 'Next.js', 'Tiptap', 'Prisma'],
    demoUrl: 'https://inkwell.write',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>写作者常面临「工具割裂」：笔记一个、写作一个、发布又一个。Inkwell 打造<strong>「从灵感捕获到多平台发布」</strong>的一站式写作环境。</p><h3>核心功能</h3><ul><li>沉浸编辑：基于 Tiptap 的所见即所得编辑器，支持 Markdown 快捷键</li><li>双向链接：输入 [[ 即可引用其他笔记，自动生成反向链接</li><li>知识图谱：可视化展示笔记关联，发现隐藏联系</li><li>一键发布：支持发布到微信公众号、知乎、掘金、Notion</li></ul><h3>技术亮点</h3><p>Tiptap + Yjs 实现多人协同；Prisma + PostgreSQL 存储，全文检索用 tsvector；知识图谱用 D3.js 力导向布局，支持 1000+ 节点流畅交互。</p><h3>用户反馈</h3><p>公测 3 个月注册 1.5 万，付费转化率 8%。用户评价：「终于不用在 5 个 App 之间来回切换了。」</p>`,
  },
  {
    title: 'SoundWave · 可视化音频编辑器',
    description: '浏览器端音频编辑与可视化工具，支持多轨编辑、实时频谱、音频特效与播客制作。',
    category: '开源工具',
    tags: ['Vue 3', 'Web Audio API', 'Canvas', 'FFmpeg.wasm'],
    demoUrl: 'https://soundwave.audio',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>播客与短视频创作者对音频编辑需求旺盛，但专业软件学习曲线陡峭。SoundWave 用<strong>浏览器 + 直观交互</strong>降低门槛。</p><h3>核心功能</h3><ul><li>多轨编辑：支持 8 轨同时编辑，拖拽裁剪、淡入淡出、音量包络</li><li>实时频谱：可视化频谱图、波形图、相位图</li><li>音频特效：均衡器、压缩器、混响、降噪等 15+ 效果器</li><li>播客模式：自动去除静音、响度标准化、章节标记</li></ul><h3>技术亮点</h3><p>Web Audio API 构建音频处理图，特效实时生效；Canvas 支持百万级采样点流畅渲染；FFmpeg.wasm 实现浏览器端格式转换，无需上传服务器。</p><h3>社区数据</h3><p>GitHub 3.2k Star，被 50+ 播客创作者使用，平均每周处理音频 2000+ 小时。</p>`,
  },
  {
    title: 'Atlas · 个人知识库',
    description: '本地优先的知识管理工具，支持 Markdown、PDF、网页剪藏，通过 AI 自动建立知识关联。',
    category: '开源工具',
    tags: ['Tauri', 'Rust', 'React', 'SQLite'],
    demoUrl: 'https://atlas.knowledge',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>信息爆炸时代，收藏的内容越来越多，真正消化的越来越少。Atlas 的理念是<strong>「本地优先 + AI 辅助」</strong>，让知识真正为你所用。</p><h3>核心功能</h3><ul><li>多格式支持：Markdown、PDF、EPUB、网页剪藏、图片 OCR</li><li>本地优先：数据存储在本地 SQLite，支持端到端加密同步</li><li>AI 关联：自动提取关键词、生成摘要、推荐相关知识</li><li>语义搜索：基于向量数据库的语义搜索，不再靠关键词</li></ul><h3>技术亮点</h3><p>Tauri + Rust 构建桌面端，安装包仅 8MB，内存占用 50MB；SQLite + sqlite-vec 实现本地向量检索；支持接入 OpenAI / Ollama 本地模型。</p><h3>项目成果</h3><p>GitHub 2.1k Star，Product Hunt 当日 Top 5。</p>`,
  },
  {
    title: 'Verdant · 碳中和数据平台',
    description:
      '企业碳足迹核算与减排管理平台，对接供应链数据，自动生成符合 GHG Protocol 的碳报告。',
    category: 'Web应用',
    tags: ['Vue 3', 'Node.js', 'PostgreSQL', 'ECharts'],
    demoUrl: 'https://verdant.demo.com',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>双碳目标下企业需要披露碳数据，但碳核算专业性强、数据分散。Verdant 提供<strong>一站式碳管理</strong>解决方案。</p><h3>核心功能</h3><ul><li>碳足迹核算：范围一/二/三全口径核算，内置 1000+ 排放因子</li><li>供应链协同：向供应商发起数据收集，自动汇总计算</li><li>减排模拟：模拟不同减排措施的减碳效果与成本</li><li>报告生成：一键生成符合 GHG Protocol、ISO 14064 标准的报告</li></ul><h3>技术亮点</h3><p>排放因子库支持在线更新，对接生态环境部官方数据；核算引擎可配置，支持不同行业标准；Docker 私有化部署满足数据安全要求。</p><h3>落地成果</h3><p>已服务 15 家制造企业，累计核算碳排放 200 万吨，帮助企业平均降低 12% 碳强度。</p>`,
  },
  {
    title: 'Lumen · 摄影作品集模板',
    description:
      '面向摄影师的极简作品集网站模板，支持瀑布流布局、懒加载、EXIF 展示与客户选片功能。',
    category: '设计作品',
    tags: ['Astro', 'CSS', 'TypeScript', 'Sharp'],
    demoUrl: 'https://lumen.photo',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>设计理念</h2><p>摄影师的作品集应该让照片说话，而不是被花哨界面抢戏。Lumen 遵循<strong>「少即是多」</strong>。</p><h3>核心功能</h3><ul><li>瀑布流布局：自适应不同比例照片，支持自定义列数</li><li>智能懒加载：基于 Intersection Observer，首屏极速</li><li>EXIF 展示：自动读取相机、镜头、光圈、快门参数</li><li>客户选片：生成带密码的相册链接，客户可标记心仪照片</li></ul><h3>技术亮点</h3><p>Astro 构建零 JS 默认输出，Lighthouse 满分；Sharp 自动生成多尺寸 WebP / AVIF，体积减少 70%；Cloudflare Pages 部署全球 CDN 加速。</p><h3>用户反馈</h3><p>GitHub 1.8k Star，被 200+ 摄影师使用，客户平均选片效率提升 3 倍。</p>`,
  },
  {
    title: 'TaskFlow · 团队任务协作',
    description:
      '轻量级团队任务管理工具，支持看板、甘特图、时间追踪与自动化工作流，适合 5-50 人团队。',
    category: 'Web应用',
    tags: ['React', 'NestJS', 'PostgreSQL', 'Socket.io'],
    demoUrl: 'https://taskflow.demo.com',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>Jira 太重，Trello 太轻，中小团队需要一款<strong>「刚刚好」</strong>的任务协作工具。</p><h3>核心功能</h3><ul><li>看板视图：拖拽式任务管理，支持泳道、WIP 限制</li><li>甘特图：可视化项目排期，依赖关系一目了然</li><li>时间追踪：内置计时器，自动生成工时报表</li><li>自动化：任务状态变更时自动通知、分配、创建子任务</li></ul><h3>技术亮点</h3><p>NestJS + PostgreSQL 构建稳健后端，Redis 缓存热点数据；Socket.io 实现实时协作，断线自动重连；前端 React + TanStack Query 数据同步丝滑。</p><h3>项目成果</h3><p>已服务 80+ 团队，日活 3000+，NPS 评分 68。用户评价：「终于找到一款团队愿意主动用的工具。」</p>`,
  },
  {
    title: `Chef's Table · 私房菜预约平台`,
    description:
      '连接私厨与食客的预约平台，支持菜单浏览、在线预约、支付结算与评价体系，让家宴成为生意。',
    category: 'Web应用',
    tags: ['Vue 3', 'Nuxt', 'Supabase', 'Stripe'],
    demoUrl: 'https://chefstable.demo.com',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>私厨有手艺但缺客源，食客想体验家宴但找不到渠道。Chef's Table 打造<strong>「私厨版 Airbnb」</strong>。</p><h3>核心功能</h3><ul><li>私厨主页：展示菜品、故事、环境照片与食客评价</li><li>菜单管理：私厨可设置每周菜单、食材来源、过敏原提示</li><li>在线预约：日历选座、人数选择、特殊需求备注</li><li>支付结算：Stripe 收款，平台抽成自动分账</li></ul><h3>技术亮点</h3><p>Nuxt 3 全栈框架 SSR + ISR 兼顾 SEO 与性能；Supabase 提供认证、数据库、存储、实时订阅一站式后端；Stripe Connect 实现平台分账。</p><h3>运营数据</h3><p>内测 2 个月入驻私厨 50+，完成订单 800+，复购率 45%，平均客单价 280 元。</p>`,
  },
  {
    title: 'CodeReview AI · 智能代码审查',
    description:
      '基于大模型的代码审查助手，自动发现潜在 Bug、安全漏洞与性能问题，支持 GitHub / GitLab 集成。',
    category: '开源工具',
    tags: ['Python', 'FastAPI', 'LangChain', 'Docker'],
    demoUrl: 'https://codereview.ai',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>Code Review 是保证代码质量的关键环节，但人工审查耗时且容易遗漏。CodeReview AI 用大模型<strong>7x24 小时</strong>守护代码质量。</p><h3>核心功能</h3><ul><li>智能审查：自动分析 PR，识别 Bug、安全漏洞、性能问题</li><li>上下文理解：结合项目历史与代码规范，给出针对性建议</li><li>一键修复：对简单问题直接生成修复补丁</li><li>多平台集成：GitHub / GitLab / Gitee 一键接入</li></ul><h3>技术亮点</h3><p>FastAPI 构建高性能服务，LangChain 编排审查工作流，支持接入 OpenAI / Claude / 本地模型；Docker 一键部署，支持私有化。</p><h3>项目成果</h3><p>GitHub 2.7k Star，已被 300+ 团队接入，平均每个 PR 发现 2.3 个潜在问题。</p>`,
  },
  {
    title: 'Muse · AI 音乐创作助手',
    description:
      '面向音乐爱好者的 AI 作曲工具，输入情绪或场景即可生成旋律、和声与编曲，支持 MIDI 导出。',
    category: 'Web应用',
    tags: ['Vue 3', 'Web Audio API', 'Python', 'FastAPI'],
    demoUrl: 'https://muse.ai',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>很多人有音乐灵感却不懂乐理，无法将想法变成作品。Muse 用 AI 降低创作门槛，让<strong>「哼一段旋律」</strong>就能生成完整编曲。</p><h3>核心功能</h3><ul><li>AI 作曲：输入情绪、场景、风格，生成旋律与和声</li><li>智能编曲：自动配器，支持钢琴、弦乐、电子等 20+ 音色</li><li>实时试听：Web Audio API 实时合成，无需等待渲染</li><li>MIDI 导出：可导出到 DAW 继续精修</li></ul><h3>技术亮点</h3><p>后端 Python + FastAPI 部署音乐生成模型，前端 Vue 3 + Web Audio API 实现低延迟试听；支持哼唱识别转 MIDI。</p><h3>用户数据</h3><p>上线 3 个月注册 5000+，生成作品 2 万+，被音乐教育机构引入课堂教学。</p>`,
  },
  {
    title: 'Harbor · 个人服务器管理面板',
    description:
      '轻量级服务器管理面板，支持 Docker 容器管理、网站部署、SSL 证书自动续期与监控告警。',
    category: '开源工具',
    tags: ['Go', 'Vue 3', 'Docker', 'Prometheus'],
    demoUrl: 'https://harbor.panel',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>宝塔面板功能强大但闭源且臃肿，很多开发者只需要核心功能。Harbor 用<strong>Go + Vue</strong>打造轻量替代方案。</p><h3>核心功能</h3><ul><li>Docker 管理：容器、镜像、网络、卷的可视化管理</li><li>网站部署：一键部署静态站点、Node 应用、反向代理</li><li>SSL 证书：对接 Let's Encrypt 自动申请与续期</li><li>监控告警：CPU、内存、磁盘、网络实时监控，异常推送</li></ul><h3>技术亮点</h3><p>Go 编译为单二进制，内存占用 < 30MB；Vue 3 前端嵌入二进制，无需单独部署；Prometheus 采集指标，支持自定义告警规则。</p><h3>社区数据</h3><p>GitHub 5.1k Star，被 1 万+ 开发者用于个人服务器管理。</p>`,
  },
  {
    title: 'Nova · 播客托管平台',
    description: '面向独立播客的托管与分发平台，支持 RSS 生成、多平台分发、数据分析与听众互动。',
    category: 'Web应用',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'AWS S3'],
    demoUrl: 'https://nova.podcast',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>独立播客创作者常被托管平台的高额费用与限制困扰。Nova 提供<strong>「一次上传，全网分发」</strong>的解决方案。</p><h3>核心功能</h3><ul><li>RSS 生成：符合 Podcast 2.0 标准，支持章节、字幕</li><li>多平台分发：一键提交到 Apple Podcasts、Spotify、小宇宙</li><li>数据分析：收听量、完播率、地域分布可视化</li><li>听众互动：评论、打赏、订阅邮件列表</li></ul><h3>技术亮点</h3><p>Next.js + Prisma 构建全栈应用；音频文件存储 AWS S3 + CloudFront 全球加速；RSS 生成器支持增量更新，百万级订阅无压力。</p><h3>运营数据</h3><p>已托管 500+ 播客，累计播放 200 万+，创作者平均节省 60% 托管成本。</p>`,
  },
  {
    title: 'Prism · 数据可视化平台',
    description: '拖拽式数据可视化工具，连接多种数据源，通过图表、地图、仪表盘讲述数据故事。',
    category: 'Web应用',
    tags: ['React', 'D3.js', 'ECharts', 'Node.js'],
    demoUrl: 'https://prism.viz',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>数据分析师常需要在 Excel、Python、BI 工具之间切换。Prism 希望用<strong>「拖拽式交互」</strong>让数据可视化像搭积木一样简单。</p><h3>核心功能</h3><ul><li>多数据源：支持 MySQL、PostgreSQL、CSV、API 接入</li><li>拖拽建模：无需写 SQL，拖拽字段即可生成查询</li><li>丰富图表：折线、柱状、饼图、地图、桑基图等 30+ 图表</li><li>仪表盘：自由布局，支持联动、钻取、定时刷新</li></ul><h3>技术亮点</h3><p>D3.js + ECharts 双引擎，简单图表用 ECharts 保证性能，复杂定制用 D3.js 保证灵活；查询引擎基于 DuckDB，本地分析亿级数据无压力。</p><h3>项目成果</h3><p>已服务 50+ 企业，累计创建仪表盘 3000+，被用户评价为「最好用的开源 BI 工具」。</p>`,
  },
  {
    title: 'Echo · 播客转文字工具',
    description: '将播客、会议录音自动转为文字稿，支持说话人分离、时间戳对齐与多语言翻译。',
    category: '开源工具',
    tags: ['Python', 'Whisper', 'FastAPI', 'React'],
    demoUrl: 'https://echo.transcribe',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>项目背景</h2><p>播客创作者需要文字稿做 SEO，会议记录需要整理纪要，但人工听写效率极低。Echo 用 <strong>Whisper</strong> 实现高精度自动转写。</p><h3>核心功能</h3><ul><li>高精度转写：基于 Whisper large-v3，中文准确率 95%+</li><li>说话人分离：自动识别不同说话人，标注角色</li><li>时间戳对齐：每句话对应音频时间点，点击可跳转</li><li>多语言翻译：支持 50+ 语言互译</li></ul><h3>技术亮点</h3><p>FastAPI 构建异步任务队列，支持 GPU 加速；前端 React 实现音频与文字同步高亮；支持导出 SRT、VTT、Markdown 格式。</p><h3>用户数据</h3><p>GitHub 3.8k Star，累计转写音频 10 万+ 小时，被 500+ 播客创作者使用。</p>`,
  },
  {
    title: 'Orbit · 习惯养成助手',
    description:
      '基于行为科学的习惯养成应用，通过微习惯、打卡、数据可视化帮助用户建立持久的好习惯。',
    category: '移动端',
    tags: ['React Native', 'Expo', 'SQLite', 'Reanimated'],
    demoUrl: 'https://orbit.habits',
    repoUrl: 'https://github.com/SviAnL/',
    content: `<h2>设计理念</h2><p>大多数习惯应用失败的原因是「目标太大，坚持太难」。Orbit 基于<strong>「微习惯」</strong>理论，从每天 1 分钟开始。</p><h3>核心功能</h3><ul><li>微习惯：将大目标拆解为最小可执行单元</li><li>打卡追踪：日历热力图、连续天数、成就徽章</li><li>数据可视化：习惯完成率、趋势、相关性分析</li><li>提醒通知：智能推送，避开忙碌时段</li></ul><h3>技术亮点</h3><p>Expo 构建跨平台应用，Reanimated 3 实现流畅动画；SQLite 本地存储，支持 iCloud 同步；基于行为科学设计激励体系，用户 30 天留存率 52%。</p><h3>用户反馈</h3><p>App Store 评分 4.8，累计下载 2 万+，用户平均养成 3.2 个新习惯。</p>`,
  },
]

// 经验分享语料池
export const experiencePool = [
  {
    title: 'Vue 3 中 ref 与 reactive 的选型心得',
    summary: '记录一次大型表单项目重构中，从 reactive 全面切换到 ref 的思考与踩坑。',
    category: 'note' as const,
    tags: ['Vue', 'TypeScript', '状态管理'],
    content: `<h2>背景</h2><p>项目中有个 200+ 字段的复杂表单，最初用 <code>reactive</code> 声明状态，但随着字段动态增删、嵌套层级加深，出现了响应式丢失和类型推断困难的问题。</p><h3>踩坑记录</h3><ul><li><code>reactive</code> 解构后失去响应性，必须配合 <code>toRefs</code>，但类型推断变得复杂</li><li>动态添加的嵌套属性无法自动追踪，需要整体替换对象</li><li>与 TypeScript 配合时，<code>reactive</code> 的泛型推导不如 <code>ref</code> 直观</li></ul><h3>最终方案</h3><p>全面改用 <code>ref</code> + <code>computed</code>，虽然写起来稍显冗长，但响应式追踪和类型安全都更可靠。对于纯展示的静态数据，仍保留 <code>reactive</code>。</p>`,
  },
  {
    title: 'Chrome DevTools 排查内存泄漏实战',
    summary: '一个列表页越用越卡，用 Performance 和 Memory 面板定位到未清理的定时器。',
    category: 'pitfall' as const,
    tags: ['性能', '调试', 'JavaScript'],
    content: `<h2>问题现象</h2><p>后台管理系统的订单列表页，连续操作 10 分钟后页面明显卡顿，内存占用从 80MB 涨到 400MB+。</p><h3>排查过程</h3><ul><li>打开 Performance 面板录制 5 分钟操作，发现 GC（垃圾回收）频率越来越低</li><li>用 Memory 面板拍摄堆快照，对比发现 <code>Timer</code> 和 <code>Detached DOM</code> 持续增长</li><li>定位到组件 <code>onMounted</code> 中创建的轮询定时器，在 <code>onUnmounted</code> 中忘记清理</li></ul><h3>修复方案</h3><p>在 <code>onUnmounted</code> 中调用 <code>clearInterval</code>，并用 <code>AbortController</code> 取消未完成的 fetch 请求。修复后内存稳定在 90MB 左右。</p>`,
  },
  {
    title: '从零配置 Vite + Vue 3 + TS 的完整踩坑记录',
    summary: '不用脚手架，手动配置 Vite 项目时遇到的路径别名、环境变量、类型声明问题。',
    category: 'tutorial' as const,
    tags: ['Vite', 'Vue', 'TypeScript'],
    content: `<h2>为什么要手动配置</h2><p>想理解脚手架到底帮我们做了什么，于是从 <code>npm create vite@latest</code> 的最小模板开始，一步步加配置。</p><h3>踩坑清单</h3><ul><li><code>@</code> 路径别名：需要在 <code>vite.config.ts</code> 和 <code>tsconfig.json</code> 中同时配置，缺一不可</li><li>环境变量：只有 <code>VITE_</code> 前缀的变量才会暴露给客户端，其他变量在 <code>import.meta.env</code> 中是 <code>undefined</code></li><li>类型声明：自定义的 <code>.vue</code> 文件类型、<code>import.meta.env</code> 类型都需要在 <code>env.d.ts</code> 中补充</li></ul><h3>收获</h3><p>手动配置一遍后，再遇到脚手架报错就知道该去哪个文件找了。</p>`,
  },
  {
    title: '一个正则表达式引发的生产事故',
    summary: '用户输入校验的正则存在 ReDoS 漏洞，恶意输入导致服务端 CPU 打满。',
    category: 'pitfall' as const,
    tags: ['安全', '正则', '性能'],
    content: `<h2>事故经过</h2><p>一个用户昵称校验接口，正则写的是 <code>/^([a-zA-Z0-9]+)+$/</code>，本意是校验字母数字组合。</p><h3>问题根源</h3><p>嵌套的量词 <code>(...)+)+</code> 导致回溯爆炸。当输入 <code>aaaaaaa...!</code>（大量 a 后跟一个特殊字符）时，正则引擎会尝试所有可能的组合，CPU 瞬间打满。</p><h3>修复</h3><p>改为 <code>/^[a-zA-Z0-9]+$/</code>，去掉了不必要的分组嵌套。同时在前端用 <code>setTimeout</code> 限制校验执行时间。</p>`,
  },
  {
    title: '用 Intersection Observer 替代 Scroll 事件做懒加载',
    summary: '滚动事件 + 节流方案在移动端依然卡顿，切换到 Intersection Observer 后丝滑流畅。',
    category: 'note' as const,
    tags: ['性能', 'JavaScript', '移动端'],
    content: `<h2>背景</h2><p>图片懒加载最初用 <code>scroll</code> 事件 + <code>throttle</code> 实现，桌面端还行，但在低端安卓机上滚动时明显掉帧。</p><h3>问题分析</h3><p><code>scroll</code> 事件在主线程执行，即使加了节流，频繁触发仍会阻塞渲染。而且每次都要手动计算元素位置，逻辑复杂。</p><h3>方案切换</h3><p>改用 <code>Intersection Observer</code>，浏览器原生支持，回调在独立线程触发，不阻塞滚动。代码量也从 40 行缩减到 15 行。</p><pre><code>const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })</code></pre>`,
  },
  {
    title: 'Vue 3 组合式函数封装：useRequest 的渐进式设计',
    summary: '从简单的 loading 状态到支持缓存、重试、轮询的完整封装过程。',
    category: 'tutorial' as const,
    tags: ['Vue', 'TypeScript', '工程化'],
    content: `<h2>需求演进</h2><p>项目初期每个请求都要写 <code>loading</code>、<code>error</code>、<code>data</code> 三个 ref，重复代码太多。</p><h3>第一版：基础封装</h3><p><code>useRequest(fetcher)</code> 返回 <code>{ data, loading, error, run }</code>，解决基本重复问题。</p><h3>第二版：增加缓存</h3><p>引入 <code>Map</code> 做内存缓存，相同 key 的请求直接返回缓存数据，减少重复请求。</p><h3>第三版：重试与轮询</h3><p>增加 <code>retryCount</code> 和 <code>pollingInterval</code> 选项，覆盖更多场景。最终这个 hook 在项目中复用了 30+ 次。</p>`,
  },
  {
    title: 'CSS 变量实现一键换肤的完整方案',
    summary: '不刷新页面切换主题，支持跟随系统、手动切换和持久化。',
    category: 'resource' as const,
    tags: ['CSS', '主题', '设计系统'],
    content: `<h2>核心思路</h2><p>用 CSS 变量定义主题色，通过 <code>data-theme</code> 属性在 <code>html</code> 上切换，配合 <code>localStorage</code> 持久化。</p><h3>实现步骤</h3><ul><li>定义 <code>:root</code> 下的亮色变量，<code>[data-theme="dark"]</code> 下的暗色变量</li><li>用 <code>matchMedia('(prefers-color-scheme: dark)')</code> 检测系统偏好</li><li>切换时更新 <code>document.documentElement.dataset.theme</code></li><li>用 <code>localStorage</code> 记住用户选择，优先于系统偏好</li></ul><h3>注意事项</h3><p>避免闪烁：在 <code>&lt;head&gt;</code> 中内联一段脚本，在页面渲染前就设置好主题。</p>`,
  },
  {
    title: 'HTTP 缓存策略配置踩坑记录',
    summary: '静态资源设置了长期缓存但文件名没加 hash，导致用户拿到旧版本。',
    category: 'pitfall' as const,
    tags: ['HTTP', '缓存', '部署'],
    content: `<h2>事故现象</h2><p>发版后部分用户反馈页面样式错乱，刷新也没用，强刷才正常。</p><h3>原因分析</h3><p>Nginx 配置中给 JS/CSS 设置了 <code>Cache-Control: max-age=31536000</code>，但构建产物文件名是 <code>app.js</code> 而不是 <code>app.[hash].js</code>。</p><h3>修复方案</h3><p>构建配置中添加 <code>[contenthash]</code>，确保内容变化时文件名变化。同时将 HTML 文件设置为 <code>no-cache</code>，每次请求都检查更新。</p>`,
  },
  {
    title: '用 TypeScript 类型体操实现路由参数类型推导',
    summary: '让 <code>useRoute().params</code> 自动推导出路由定义中的参数类型。',
    category: 'note' as const,
    tags: ['TypeScript', 'Vue Router', '类型体操'],
    content: `<h2>问题</h2><p>Vue Router 的 <code>params</code> 类型是 <code>Record&lt;string, string | string[]&gt;</code>，取参数时没有类型提示，容易写错 key。</p><h3>解决方案</h3><p>利用 TypeScript 的条件类型和模板字面量类型，从路由路径字符串中提取参数名：</p><pre><code>type ExtractParams&lt;T extends string&gt; = 
    T extends \`\${string}:\${infer P}/\${infer Rest}\` 
      ? { [K in P]: string } & ExtractParams&lt;Rest&gt;
      : T extends \`\${string}:\${infer P}\`
        ? { [K in P]: string }
        : {}</code></pre><p>配合 <code>declare module</code> 扩展 Vue Router 类型，最终实现了路由参数的类型安全。</p>`,
  },
  {
    title: '前端监控 SDK 的轻量化设计',
    summary: '自研前端错误监控 SDK，从 30KB 压缩到 8KB 的优化过程。',
    category: 'tutorial' as const,
    tags: ['工程化', '性能', '监控'],
    content: `<h2>背景</h2><p>接入第三方监控 SDK 后发现体积太大，首屏加载被拖慢。决定自研一个轻量版本。</p><h3>优化手段</h3><ul><li>用 <code>sendBeacon</code> 替代 <code>XMLHttpRequest</code> 上报，不阻塞页面卸载</li><li>错误去重：相同错误 5 秒内只上报一次</li><li>采样上报：非关键错误按 10% 采样</li><li>移除 source map 解析，改为服务端处理</li></ul><h3>成果</h3><p>SDK 体积从 32KB 降到 7.8KB（gzip 后 3.2KB），错误采集率反而提升了，因为去重逻辑过滤了大量重复噪音。</p>`,
  },
  {
    title: 'Web Worker 处理大文件解析的实践',
    summary: '上传 10 万行 CSV 文件时页面卡死，用 Worker 把解析逻辑移到后台线程。',
    category: 'note' as const,
    tags: ['Web Worker', '性能', '文件处理'],
    content: `<h2>问题</h2><p>用户上传 CSV 后需要前端解析并预览，10 万行数据直接在主线程解析，页面冻结 5 秒以上。</p><h3>方案</h3><p>把 CSV 解析逻辑放到 Web Worker 中，主线程只负责显示进度和最终结果。</p><pre><code>// main.ts
  const worker = new Worker('./csv-parser.worker.ts', { type: 'module' })
  worker.postMessage(file)
  worker.onmessage = (e) => {
    if (e.data.type === 'progress') updateProgress(e.data.value)
    if (e.data.type === 'done') renderTable(e.data.rows)
  }</code></pre><h3>效果</h3><p>解析期间页面完全流畅，用户可以看到实时进度条，体验大幅提升。</p>`,
  },
  {
    title: 'Git 提交规范在团队中的落地经验',
    summary: '从混乱的 commit message 到 Conventional Commits，配合 commitlint 自动化检查。',
    category: 'resource' as const,
    tags: ['Git', '规范', '团队协作'],
    content: `<h2>痛点</h2><p>团队 commit message 五花八门，<code>fix</code>、<code>修复</code>、<code>改了一下</code> 混在一起，生成 changelog 基本靠猜。</p><h3>落地方案</h3><ul><li>采用 <code>feat</code> / <code>fix</code> / <code>docs</code> / <code>refactor</code> 等标准前缀</li><li>用 <code>commitlint</code> + <code>husky</code> 在提交时校验格式</li><li>配合 <code>standard-version</code> 自动生成 CHANGELOG</li></ul><h3>阻力与妥协</h3><p>初期大家觉得麻烦，于是先用 <code>warn</code> 级别不阻塞提交，两周后团队养成习惯再切到 <code>error</code> 级别。</p>`,
  },
  {
    title: '图片加载优化：从 2MB 到 200KB 的完整过程',
    summary: '用户头像加载慢，通过 WebP、压缩、CDN、懒加载四步优化。',
    category: 'tutorial' as const,
    tags: ['图片', '性能', '优化'],
    content: `<h2>优化前</h2><p>用户上传的头像原图 2MB，直接 <code>&lt;img src=&quot;...&quot;&gt;</code> 加载，列表页滚动卡顿。</p><h3>四步优化</h3><ul><li><strong>服务端压缩</strong>：上传时用 Sharp 转 WebP，质量 80，体积降到 200KB</li><li><strong>多尺寸</strong>：生成 64px / 128px / 256px 三档，用 <code>srcset</code> 按需加载</li><li><strong>CDN</strong>：图片走 CDN，开启 <code>Cache-Control: max-age=31536000</code></li><li><strong>懒加载</strong>：列表页用 <code>loading=&quot;lazy&quot;</code>，首屏只加载可见区域的图片</li></ul><h3>效果</h3><p>首屏图片加载量从 8MB 降到 400KB，LCP 从 3.2s 降到 1.1s。</p>`,
  },
  {
    title: '用 Zod 做前端运行时数据校验',
    summary: '接口返回的数据结构偶尔不符合约定，引入 Zod 在数据入口处做校验。',
    category: 'note' as const,
    tags: ['TypeScript', 'Zod', '数据校验'],
    content: `<h2>背景</h2><p>后端接口文档说返回 <code>{ list: Item[] }</code>，但偶尔返回 <code>{ data: { list: Item[] } }</code>，导致前端报错难以定位。</p><h3>方案</h3><p>用 Zod 定义 schema，在 axios 响应拦截器中统一校验：</p><pre><code>const ListResponse = z.object({
    list: z.array(ItemSchema),
    total: z.number(),
  })
  
  // 校验失败时抛出明确错误
  const data = ListResponse.parse(response.data)</code></pre><h3>收获</h3><p>问题从「页面白屏，控制台报错看不懂」变成「接口返回格式错误：缺少 total 字段」，排查效率大幅提升。</p>`,
  },
  {
    title: 'Vue 组件库按需引入的完整配置',
    summary: 'Element Plus 全量引入导致打包体积过大，配置按需引入后减少 60%。',
    category: 'resource' as const,
    tags: ['Vue', '打包', '性能'],
    content: `<h2>问题</h2><p>项目只用了 10 个 Element Plus 组件，但全量引入后 bundle 体积增加了 800KB。</p><h3>方案</h3><p>使用 <code>unplugin-vue-components</code> 和 <code>unplugin-auto-import</code> 实现自动按需引入：</p><pre><code>// vite.config.ts
  import Components from 'unplugin-vue-components/vite'
  import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
  
  plugins: [
    Components({ resolvers: [ElementPlusResolver()] })
  ]</code></pre><h3>注意</h3><p>样式也需要按需引入，否则会出现「组件有功能但没样式」的情况。配合 <code>unplugin-auto-import</code> 还可以自动导入 <code>ElMessage</code> 等 API。</p>`,
  },
]

// 博客文章语料池
export const blogPostPool = [
  {
    title: '为什么我放弃了 Redux，转向 Zustand',
    summary:
      '在三个中型项目中使用 Zustand 替代 Redux 后，我总结出它在 DX、性能和包体积上的真实优势，以及不适合的场景。',
    category: '前端',
    tags: ['React', 'Zustand', '状态管理'],
    readTime: 8,
    content: `<h2>引言</h2><p>Redux 曾经是 React 状态管理的代名词，但随着 Hooks 的普及和 Zustand、Jotai 等新库的崛起，我开始重新审视状态管理的选择。</p><h2>Redux 的痛点</h2><ul><li>样板代码多：一个简单的计数器需要 action、reducer、dispatch 三处修改</li><li>学习曲线陡：概念多（action、reducer、middleware、thunk、saga）</li><li>包体积大：react-redux + redux-toolkit 约 20KB，Zustand 仅 1.2KB</li></ul><h2>Zustand 的优势</h2><p>Zustand 的核心 API 极简，一个 <code>create</code> 函数就能定义 store：</p><pre><code>const useStore = create((set) => ({
    count: 0,
    inc: () => set((s) => ({ count: s.count + 1 })),
  }))</code></pre><p>组件中直接 <code>const count = useStore((s) => s.count)</code> 即可，无需 Provider 包裹，也无需 connect。</p><h2>性能对比</h2><p>在一个 500 组件的项目中，Zustand 的渲染性能与 Redux 持平甚至更好，因为它默认使用选择器订阅，避免了不必要的重渲染。</p><h2>不适合的场景</h2><p>如果你的团队已经重度使用 Redux 生态（如 Redux DevTools、RTK Query），或者需要时间旅行调试，继续用 Redux 也无可厚非。技术选型没有银弹。</p>`,
  },
  {
    title: 'Node.js 优雅停机的完整实现',
    summary:
      '线上服务发版时正在处理的请求被强制中断？本文讲解如何用 SIGTERM + 优雅停机让服务平滑退出。',
    category: '后端',
    tags: ['Node.js', '运维', '部署'],
    readTime: 10,
    content: `<h2>问题背景</h2><p>K8s 滚动更新时会向 Pod 发送 <code>SIGTERM</code>，默认行为是直接终止进程。如果此时有请求正在处理，用户会收到连接重置错误。</p><h2>优雅停机的三个步骤</h2><ul><li><strong>停止接受新请求</strong>：调用 <code>server.close()</code>，不再接受新连接</li><li><strong>等待现有请求完成</strong>：监听 <code>close</code> 回调，或设置超时兜底</li><li><strong>清理资源</strong>：关闭数据库连接池、Redis 连接、定时任务</li></ul><pre><code>process.on('SIGTERM', async () => {
    console.log('收到 SIGTERM，开始优雅停机')
    server.close(() => {
      console.log('HTTP 服务已关闭')
    })
    await db.destroy()
    await redis.quit()
    process.exit(0)
  })</code></pre><h2>K8s 配置配合</h2><p>还需要设置 <code>terminationGracePeriodSeconds</code>，给应用足够的退出时间。同时配置 <code>preStop</code> 钩子，先让 Service 摘除该 Pod，再发送 SIGTERM。</p><h2>总结</h2><p>优雅停机是生产环境的基本要求，实现成本不高，但能显著提升用户体验和系统可靠性。</p>`,
  },
  {
    title: 'Docker 多阶段构建：镜像从 1.2GB 瘦身到 80MB',
    summary:
      '一个 Node.js 应用的 Docker 镜像优化全过程，涵盖多阶段构建、alpine 基础镜像、.dockerignore 等技巧。',
    category: 'DevOps',
    tags: ['Docker', 'CI/CD', '优化'],
    readTime: 12,
    content: `<h2>问题</h2><p>最初用最简单的 Dockerfile 构建 Node.js 应用，镜像体积 1.2GB，推送到镜像仓库要 3 分钟，拉取部署更慢。</p><h2>优化前的 Dockerfile</h2><pre><code>FROM node:20
  WORKDIR /app
  COPY . .
  RUN npm install
  CMD ["node", "server.js"]</code></pre><p>问题在于：包含了完整的 node 镜像（1GB+）、devDependencies、源码、构建缓存。</p><h2>多阶段构建方案</h2><pre><code># 构建阶段
  FROM node:20-alpine AS builder
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build
  
  # 运行阶段
  FROM node:20-alpine
  WORKDIR /app
  COPY --from=builder /app/dist ./dist
  COPY --from=builder /app/node_modules ./node_modules
  CMD ["node", "dist/server.js"]</code></pre><h2>进一步优化</h2><ul><li>用 <code>npm ci --omit=dev</code> 只装生产依赖</li><li>添加 <code>.dockerignore</code> 排除 node_modules、.git、测试文件</li><li>使用 <code>node:20-alpine</code> 基础镜像，体积从 1GB 降到 130MB</li><li>合并 RUN 指令减少层数</li></ul><h2>最终效果</h2><p>镜像从 1.2GB 降到 80MB，推送时间从 3 分钟降到 15 秒，部署速度提升 10 倍。</p>`,
  },
  {
    title: '设计系统中的色彩 Token 实践',
    summary: '如何用 Design Token 管理一套支持亮暗主题、品牌换肤的色彩系统，让设计与开发不再脱节。',
    category: '设计',
    tags: ['Design Token', 'CSS', '设计系统'],
    readTime: 9,
    content: `<h2>为什么需要色彩 Token</h2><p>传统做法是设计师在 Figma 中定义颜色，开发在 CSS 中硬编码。一旦品牌色调整，两边都要改，容易遗漏且不一致。</p><h2>三层 Token 结构</h2><ul><li><strong>基础层</strong>：原始色值，如 <code>blue-500: #3b82f6</code></li><li><strong>语义层</strong>：用途映射，如 <code>color-primary: var(--blue-500)</code></li><li><strong>组件层</strong>：组件专用，如 <code>button-bg: var(--color-primary)</code></li></ul><p>组件只引用语义层，语义层引用基础层。换肤时只需修改语义层的映射关系。</p><h2>亮暗主题实现</h2><pre><code>:root {
    --color-bg: #ffffff;
    --color-text: #1a1a1a;
  }
  [data-theme="dark"] {
    --color-bg: #1a1a1a;
    --color-text: #ffffff;
  }</code></pre><h2>与 Figma 同步</h2><p>用 Figma Tokens 插件管理变量，通过 Style Dictionary 导出为 CSS、SCSS、JS 多份产物，设计与开发共用一套源。</p><h2>总结</h2><p>色彩 Token 的价值不在于技术实现，而在于建立设计与开发的共同语言。</p>`,
  },
  {
    title: 'Vue 3 响应式原理深度解析',
    summary:
      '从 Proxy 到 effect、track、trigger，手写一个 100 行的迷你响应式系统，彻底理解 Vue 3 的响应式机制。',
    category: '前端',
    tags: ['Vue', '响应式', '源码'],
    readTime: 15,
    content: `<h2>核心概念</h2><p>Vue 3 的响应式系统基于三个核心概念：<strong>Proxy</strong>（拦截读写）、<strong>effect</strong>（副作用函数）、<strong>依赖收集</strong>（track / trigger）。</p><h2>手写迷你实现</h2><pre><code>let activeEffect = null
  const targetMap = new WeakMap()
  
  function track(target, key) {
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) targetMap.set(target, (depsMap = new Map()))
    let deps = depsMap.get(key)
    if (!deps) depsMap.set(key, (deps = new Set()))
    deps.add(activeEffect)
  }
  
  function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    const deps = depsMap.get(key)
    deps?.forEach((effect) => effect())
  }
  
  function reactive(obj) {
    return new Proxy(obj, {
      get(target, key) {
        track(target, key)
        return target[key]
      },
      set(target, key, value) {
        target[key] = value
        trigger(target, key)
        return true
      },
    })
  }
  
  function effect(fn) {
    activeEffect = fn
    fn()
    activeEffect = null
  }</code></pre><h2>使用示例</h2><pre><code>const state = reactive({ count: 0 })
  effect(() => console.log('count:', state.count))
  state.count++ // 输出 count: 1</code></pre><h2>Vue 3 的额外优化</h2><ul><li>用 <code>WeakMap</code> 避免内存泄漏</li><li>effect 支持嵌套，用 effectStack 管理</li><li>支持调度器 scheduler，实现 computed 和 watch</li><li>ref 对基本类型做了一层包装</li></ul><h2>总结</h2><p>理解原理后再看 Vue 源码，会发现很多设计都是为了处理边界情况，核心思路其实很简单。</p>`,
  },
  {
    title: '从 0 搭建 CI/CD：GitHub Actions 实战',
    summary:
      '一个前端项目的完整 CI/CD 流程：代码检查、测试、构建、部署到服务器，全部用 GitHub Actions 自动化。',
    category: 'DevOps',
    tags: ['GitHub Actions', 'CI/CD', '自动化'],
    readTime: 11,
    content: `<h2>目标</h2><p>每次 push 到 main 分支，自动执行：ESLint 检查 → 单元测试 → 构建 → 部署到服务器。</p><h2>完整 Workflow</h2><pre><code>name: CI/CD
  
  on:
    push:
      branches: [main]
  
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: 'npm'
        
        - run: npm ci
        - run: npm run lint
        - run: npm run test
        - run: npm run build
        
        - name: Deploy to Server
          uses: appleboy/ssh-action@v1
          with:
            host: \${{ secrets.SERVER_HOST }}
            username: \${{ secrets.SERVER_USER }}
            key: \${{ secrets.SSH_KEY }}
            script: |
              cd /var/www/myapp
              git pull
              npm ci --omit=dev
              pm2 restart myapp</code></pre><h2>关键点</h2><ul><li>用 <code>cache: 'npm'</code> 缓存依赖，构建时间从 3 分钟降到 40 秒</li><li>敏感信息（服务器地址、SSH 密钥）存在 GitHub Secrets 中</li><li>用 <code>pm2 restart</code> 实现零停机部署</li><li>失败时自动发送通知到 Slack</li></ul><h2>进阶优化</h2><p>可以引入 Docker 构建镜像、使用蓝绿部署、添加回滚机制。但对中小项目来说，上面的配置已经够用。</p>`,
  },
  {
    title: 'PostgreSQL 索引优化实战',
    summary: '一个慢查询从 8 秒优化到 50ms 的完整过程，涵盖 EXPLAIN 分析、索引选择、复合索引设计。',
    category: '后端',
    tags: ['PostgreSQL', '数据库', '性能'],
    readTime: 13,
    content: `<h2>问题</h2><p>订单列表接口响应时间 8 秒，用户投诉严重。表数据量 500 万行。</p><h2>第一步：EXPLAIN 分析</h2><pre><code>EXPLAIN ANALYZE
  SELECT * FROM orders
  WHERE user_id = 123
    AND status = 'paid'
  ORDER BY created_at DESC
  LIMIT 20;</code></pre><p>结果显示 <code>Seq Scan</code>（全表扫描），耗时 7800ms。</p><h2>第二步：单列索引</h2><p>先给 <code>user_id</code> 加索引，耗时降到 200ms。但 <code>status</code> 过滤和 <code>ORDER BY</code> 仍需要额外排序。</p><h2>第三步：复合索引</h2><pre><code>CREATE INDEX idx_orders_user_status_created
  ON orders (user_id, status, created_at DESC);</code></pre><p>索引顺序很关键：等值查询字段在前，范围查询和排序字段在后。耗时降到 50ms。</p><h2>第四步：覆盖索引</h2><p>如果查询只需要少数字段，可以把它们加入索引，实现 <code>Index Only Scan</code>，避免回表。</p><h2>经验总结</h2><ul><li>索引不是越多越好，每个索引都会拖慢写入</li><li>复合索引的字段顺序比数量更重要</li><li>定期用 <code>pg_stat_user_indexes</code> 清理无用索引</li><li>写入密集的表慎用过多索引</li></ul>`,
  },
  {
    title: 'CSS Container Queries 实战',
    summary:
      '容器查询让组件真正实现「响应式自包含」，不再依赖视口宽度，本文分享实际项目中的使用经验。',
    category: '设计',
    tags: ['CSS', '响应式', '容器查询'],
    readTime: 7,
    content: `<h2>为什么需要容器查询</h2><p>传统媒体查询基于视口宽度，但组件的布局往往取决于它所在的容器大小，而非整个屏幕。一个卡片在侧边栏和主内容区应该有不同的布局。</p><h2>基本用法</h2><pre><code>.card-container {
    container-type: inline-size;
    container-name: card;
  }
  
  @container card (min-width: 400px) {
    .card {
      display: flex;
      gap: 1rem;
    }
  }</code></pre><h2>实际应用场景</h2><ul><li><strong>可复用卡片</strong>：同一个卡片组件在不同容器中自动切换布局</li><li><strong>侧边栏组件</strong>：侧边栏折叠时自动切换为紧凑模式</li><li><strong>仪表盘</strong>：网格中的小组件根据自身宽度调整内容密度</li></ul><h2>浏览器支持</h2><p>2023 年起主流浏览器已全面支持，生产环境可以放心使用。对于旧浏览器，可以用 <code>@supports</code> 做降级。</p><h2>与媒体查询的取舍</h2><p>容器查询不是替代媒体查询，而是补充。页面级布局仍用媒体查询，组件级响应式用容器查询。</p>`,
  },
  {
    title: 'WebSocket 断线重连的完整方案',
    summary:
      '移动端网络不稳定，WebSocket 频繁断连？本文分享心跳检测、指数退避重连、消息队列的完整实现。',
    category: '前端',
    tags: ['WebSocket', '网络', '实时通信'],
    readTime: 12,
    content: `<h2>问题场景</h2><p>移动端 App 使用 WebSocket 做实时通信，用户切换网络、进入电梯、锁屏后经常断连，且不会自动恢复。</p><h2>方案设计</h2><ul><li><strong>心跳检测</strong>：每 30 秒发送 ping，服务端回 pong，超时则判定断连</li><li><strong>指数退避重连</strong>：首次 1 秒，之后 2s、4s、8s，最大 30 秒</li><li><strong>消息队列</strong>：断连期间的消息缓存，重连后自动发送</li><li><strong>状态同步</strong>：重连后拉取增量数据，避免消息丢失</li></ul><h2>核心实现</h2><pre><code>class ReconnectingWebSocket {
    private retryCount = 0
    private maxRetryDelay = 30000
    private messageQueue: any[] = []
  
    connect() {
      this.ws = new WebSocket(this.url)
      
      this.ws.onopen = () => {
        this.retryCount = 0
        this.flushQueue()
        this.startHeartbeat()
      }
      
      this.ws.onclose = () => {
        this.stopHeartbeat()
        this.scheduleReconnect()
      }
    }
  
    private scheduleReconnect() {
      const delay = Math.min(
        1000 * Math.pow(2, this.retryCount),
        this.maxRetryDelay
      )
      this.retryCount++
      setTimeout(() => this.connect(), delay)
    }
  }</code></pre><h2>注意事项</h2><ul><li>页面隐藏时暂停心跳，节省电量</li><li>区分主动关闭和被动断连，主动关闭不重连</li><li>重连成功后要重新订阅频道</li><li>配合 Service Worker 可实现后台保活</li></ul>`,
  },
  {
    title: 'pnpm 为什么比 npm 快',
    summary: '从硬链接、内容寻址存储、依赖结构三个角度，解释 pnpm 在安装速度和磁盘占用上的优势。',
    category: '前端',
    tags: ['pnpm', '包管理', '工程化'],
    readTime: 6,
    content: `<h2>核心原理</h2><p>pnpm 快的原因不是魔法，而是三个设计决策：内容寻址存储、硬链接、非扁平化依赖结构。</p><h2>内容寻址存储</h2><p>所有包文件存储在全局仓库 <code>~/.pnpm-store</code>，以文件内容的哈希值命名。相同内容的文件只存一份，多个项目共享。</p><h2>硬链接</h2><p>项目中的 <code>node_modules</code> 不是复制文件，而是创建硬链接指向全局仓库。安装 100 个项目，磁盘占用可能只有 npm 的 1/10。</p><h2>非扁平化依赖</h2><p>npm 和 yarn 会把依赖提升到顶层 <code>node_modules</code>，导致幽灵依赖问题。pnpm 用符号链接构建严格的依赖树，每个包只能访问自己声明的依赖。</p><h2>性能对比</h2><ul><li>首次安装：pnpm 比 npm 快 2-3 倍</li><li>重复安装：pnpm 几乎瞬间完成（全部命中缓存）</li><li>磁盘占用：pnpm 比 npm 节省 70% 以上</li></ul><h2>迁移建议</h2><p>新项目直接用 pnpm，老项目迁移也简单：删除 <code>node_modules</code> 和 lock 文件，<code>pnpm install</code> 即可。注意 CI 环境需要配置 pnpm 缓存。</p>`,
  },
  {
    title: 'K8s 探针配置的常见误区',
    summary:
      'liveness、readiness、startup 三种探针搞不清楚？配置不当可能导致服务频繁重启或流量打到未就绪的 Pod。',
    category: 'DevOps',
    tags: ['Kubernetes', '运维', '容器'],
    readTime: 10,
    content: `<h2>三种探针的区别</h2><ul><li><strong>liveness</strong>：容器是否存活，失败则重启容器</li><li><strong>readiness</strong>：容器是否就绪，失败则从 Service 摘除</li><li><strong>startup</strong>：容器是否启动完成，成功前不执行其他探针</li></ul><h2>常见误区</h2><h3>误区一：liveness 和 readiness 用同一个接口</h3><p>liveness 应该只检查进程是否卡死，readiness 要检查依赖（数据库、缓存）是否可用。如果 liveness 检查数据库，数据库短暂抖动会导致容器被误杀。</p><h3>误区二：没有配置 startup 探针</h3><p>启动慢的应用（如 Java）经常在启动过程中被 liveness 判定失败而重启，陷入死循环。startup 探针给足启动时间。</p><h3>误区三：超时和重试设置太激进</h3><pre><code>livenessProbe:
    httpGet:
      path: /healthz
      port: 8080
    initialDelaySeconds: 10
    periodSeconds: 10
    timeoutSeconds: 3
    failureThreshold: 3</code></pre><p>上面的配置意味着：10 秒后开始检查，每 10 秒一次，超时 3 秒，连续失败 3 次才重启。这是比较稳妥的配置。</p><h2>最佳实践</h2><ul><li>liveness 只检查进程健康，不检查外部依赖</li><li>readiness 检查所有关键依赖</li><li>启动慢的应用必须配 startup 探针</li><li>探针接口要轻量，避免拖慢服务</li></ul>`,
  },
  {
    title: 'React Server Components 到底解决了什么',
    summary:
      'RSC 不是 SSR 的替代品，它重新定义了前后端的边界。本文用实际例子讲清楚 RSC 的价值与限制。',
    category: '前端',
    tags: ['React', 'RSC', 'Next.js'],
    readTime: 14,
    content: `<h2>RSC 是什么</h2><p>React Server Components 允许组件在服务端渲染，且<strong>不发送 JS 到客户端</strong>。这与 SSR 有本质区别：SSR 的组件最终仍会在客户端 hydrate，而 RSC 的组件代码根本不会进入客户端 bundle。</p><h2>解决的核心问题</h2><ul><li><strong>Bundle 体积</strong>：依赖大型库的组件（如 Markdown 渲染、语法高亮）留在服务端，客户端 bundle 大幅减小</li><li><strong>数据获取</strong>：组件内直接 <code>await</code> 数据库查询，无需 API 层</li><li><strong>安全性</strong>：敏感逻辑（API Key、数据库查询）不暴露到客户端</li></ul><h2>代码示例</h2><pre><code>// Server Component（默认）
  async function PostList() {
    const posts = await db.post.findMany()
    return (
      &lt;ul&gt;
        {posts.map((p) =&gt; &lt;PostItem key={p.id} post={p} /&gt;)}
      &lt;/ul&gt;
    )
  }
  
  // Client Component
  'use client'
  function LikeButton({ postId }) {
    const [liked, setLiked] = useState(false)
    return &lt;button onClick={() =&gt; setLiked(!liked)}&gt;{liked ? '❤️' : '🤍'}&lt;/button&gt;
  }</code></pre><h2>限制与取舍</h2><ul><li>Server Component 不能用 Hooks、事件处理、浏览器 API</li><li>需要区分 <code>'use client'</code> 和 <code>'use server'</code></li><li>学习曲线较陡，心智模型需要转变</li><li>生态兼容性还在完善中</li></ul><h2>总结</h2><p>RSC 不是银弹，但在内容型应用（博客、电商、文档站）中能显著减少客户端 JS，提升首屏性能。交互密集的应用仍需合理拆分客户端组件。</p>`,
  },
  {
    title: 'Monorepo 工具选型：pnpm workspace vs Turborepo',
    summary: '对比两种主流 Monorepo 方案的适用场景、配置成本与生态成熟度，帮你做出合适的选择。',
    category: 'DevOps',
    tags: ['Monorepo', 'pnpm', 'Turborepo'],
    readTime: 9,
    content: `<h2>为什么用 Monorepo</h2><p>多包项目共享代码、统一版本管理、原子提交、依赖复用，这些都能通过 Monorepo 实现。但工具选择直接影响开发体验。</p><h2>pnpm workspace</h2><p>pnpm 内置的 workspace 功能，配置极简：</p><pre><code># pnpm-workspace.yaml
  packages:
    - 'packages/*'
    - 'apps/*'</code></pre><p>优点是零额外依赖，依赖管理严格。缺点是没有任务编排能力，构建、测试需要手动并行或借助其他工具。</p><h2>Turborepo</h2><p>在 pnpm workspace 基础上增加任务编排和缓存：</p><pre><code>{
    "pipeline": {
      "build": {
        "dependsOn": ["^build"],
        "outputs": ["dist/**"]
      },
      "test": {
        "dependsOn": ["build"]
      }
    }
  }</code></pre><p>核心优势是<strong>增量构建</strong>和<strong>远程缓存</strong>：只重建变更的包，CI 时间大幅缩短。</p><h2>如何选择</h2><ul><li>只有 2-3 个包，用 pnpm workspace 足够</li><li>5 个以上包，且有复杂构建依赖，用 Turborepo</li><li>需要远程缓存和团队协作，Turborepo 是刚需</li><li>已经在用 Nx，没必要迁移</li></ul><h2>总结</h2><p>两者不冲突，Turborepo 建立在 pnpm workspace 之上。建议从 pnpm workspace 起步，遇到构建瓶颈再引入 Turborepo。</p>`,
  },
  {
    title: '从 Lighthouse 90 到 100 的优化清单',
    summary: '一个真实项目的性能优化记录：LCP、CLS、TBT 三项指标逐项排查，附具体代码和配置。',
    category: '前端',
    tags: ['性能', 'Lighthouse', '优化'],
    readTime: 11,
    content: `<h2>优化前状态</h2><ul><li>Performance: 90</li><li>LCP: 2.8s</li><li>CLS: 0.15</li><li>TBT: 320ms</li></ul><h2>LCP 优化</h2><p>LCP 元素是首屏大图。措施：</p><ul><li>图片加 <code>fetchpriority="high"</code>，避免被懒加载</li><li>用 <code>&lt;link rel="preload"&gt;</code> 预加载</li><li>转 WebP 格式，体积减少 60%</li><li>CDN 加速，TTFB 从 400ms 降到 80ms</li></ul><p>LCP 降到 1.4s。</p><h2>CLS 优化</h2><p>布局偏移主要来自图片和字体。措施：</p><ul><li>图片设置明确的 <code>width</code> / <code>height</code>，或用 <code>aspect-ratio</code></li><li>字体用 <code>font-display: swap</code> + 预加载关键字体</li><li>广告位预留固定高度</li></ul><p>CLS 降到 0.02。</p><h2>TBT 优化</h2><p>主线程阻塞来自大型 JS 包。措施：</p><ul><li>路由级代码分割</li><li>第三方库按需引入</li><li>长任务拆分，用 <code>requestIdleCallback</code> 处理非关键逻辑</li></ul><p>TBT 降到 80ms。</p><h2>最终成绩</h2><p>Performance 100，LCP 1.4s，CLS 0.02，TBT 80ms。全部达标。</p>`,
  },
]

// 影音作品语料池
export const mediaPool = [
  {
    title: 'Vue 3 组合式 API 实战：从 Options 到 Composition',
    description:
      '45 分钟带你完成一个真实项目的重构，理解 setup、ref、computed 与生命周期钩子的最佳实践。',
    category: '技术教程',
    duration: 2745, // 45:45
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  },
  {
    title: '个人作品集网站从设计到上线全记录',
    description:
      '记录我用 Figma 设计、Astro 构建、Cloudflare 部署个人作品集的全过程，含设计稿与源码。',
    category: '个人作品',
    duration: 1832, // 30:32
    videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
  },
  {
    title: '直播回放：前端性能优化答疑专场',
    description: '两小时直播答疑剪辑，涵盖首屏加载、长列表渲染、打包体积等 20+ 个真实问题。',
    category: '直播回放',
    duration: 5478, // 1:31:18
    videoUrl:
      'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  },
  {
    title: 'TypeScript 类型体操入门：从零实现一个 Router',
    description:
      '用 30 分钟手写一个类型安全的路由库，理解条件类型、模板字面量与映射类型的实际应用。',
    category: '技术教程',
    duration: 1965, // 32:45
    videoUrl: 'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4',
  },
  {
    title: '独立开发日记：做一个 Markdown 笔记应用',
    description:
      '从需求分析到 MVP 上线的 14 天记录，包含技术选型、UI 设计、定价策略与首批用户反馈。',
    category: '个人作品',
    duration: 3120, // 52:00
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  },
  {
    title: '直播回放：Code Review 实战点评',
    description: '现场 review 观众提交的代码，讲解命名规范、抽象层次、错误处理等常见问题。',
    category: '直播回放',
    duration: 4230, // 1:10:30
    videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
  },
  {
    title: 'CSS 容器查询实战：让组件真正自包含',
    description:
      '20 分钟讲清楚容器查询与媒体查询的区别，并用一个卡片组件演示响应式自适应的完整方案。',
    category: '技术教程',
    duration: 1245, // 20:45
    videoUrl:
      'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  },
  {
    title: '个人项目复盘：一个失败的开源工具',
    description:
      '分享一个做了 3 个月最终放弃的开源项目，分析定位失误、推广不足与维护成本的真实教训。',
    category: '个人作品',
    duration: 2680, // 44:40
    videoUrl: 'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4',
  },
]
