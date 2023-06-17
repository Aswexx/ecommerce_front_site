import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// cookies
const fakeCookieImgIds = [
  'T7H8SehMK8U',
  'OfdDiqx8Cz8',
  'kID9sxbJ3BQ',
  'tVy3x2Vu_z4',
  'DoK5qEy2L60',
  '3DrCZblTGoQ',
  'H1uISjlRXJE',
  'aBH1apsvaPA',
  'EnPlEZI4WfM',
  'XzUAB7lIWZE'
]

const cookieNames = [
  '巧克力脆片餅',
  '榛果奶油餅乾',
  '柔軟杏仁酥',
  '檸檬脆餅',
  '香蕉朱古力曲奇',
  '夏威夷果仁酥',
  '脆皮椰子餅',
  '薄荷朱古力片',
  '松露餅乾',
  '咖啡奶酥餅'
]

const cookieDescriptions = [
  '每一塊餅乾都是細緻的藝術品，口感鬆脆，入口即化，帶來滿滿的榛果香氣和巧克力的濃郁風味。',
  '我們的手工餅乾是純天然的美味，選用優質材料烘焙而成，每一口都能感受到糅合的溫暖和綿密的口感。',
  '融合了新鮮水果和鬆脆堅果的餅乾，給你帶來水果的甜蜜和堅果的香氣，讓你的味蕾在果香中舞動。',
  '想像一下，餅乾的外層布滿了椰子粉和巧克力碎，內部則是鬆軟的麵糰，每一口都帶來融合的椰香和巧克力的醇厚。',
  '這款手工餅乾採用了秘密配方，入口即化的口感融合了香草和柑橘的香氣，讓你彷彿置身於香氛四溢的烘焙坊。',
  '餅乾上佈滿了脆脆的杏仁片和焦糖碎，內部則是鬆軟的麵糰，每一口都讓你感受到堅果的香氣和焦糖的甜蜜。',
  '這款手工餅乾經過精心烘焙，入口即化的口感帶來了新鮮橙子和蜂蜜的柔和香氣，讓你感受到橙香的清新和蜂蜜的甜蜜。',
  '我們的手工餅乾以新鮮奶油和脆脆的果仁為特色，每一口都讓你感受到奶香和果仁的豐富層次，讓你愛不釋手。',
  '想像一下，餅乾表面佈滿了細緻的糖霜和香脆的可可粉，內部則是鬆軟的麵糰，每一口都讓你感受到甜蜜的可可和糖霜的滋味。',
  '這款手工餅乾中融合了香脆的堅果和甜美的葡萄乾，每一口都帶來堅果的香氣和葡萄乾的酸甜，讓你愛不釋手。'
]

const cookieFeatures = [
  '嚼勁十足',
  '口感酥脆',
  '天然食材',
  '手工製作',
  '獨特風味',
  '口味多樣',
  '低卡健康',
  '精緻包裝',
  '限量版',
  '傳統製作'
]

// breads

const breadNames = [
  '金黃法式麵包',
  '香脆義式麵包',
  '酥軟葡萄麵包',
  '濃郁巧克力麵包',
  '蜜糖核桃麵包',
  '香草蓬鬆麵包',
  '蔓越莓酥皮麵包',
  '杏仁牛奶吐司',
  '迷你起司蘇打麵包',
  '玫瑰果醬麵包'
]

const fakeBreadImgIds = [
  'rsWZ-P9FbQ4',
  'GzBO_o0RvEg',
  'QXSvbDkiJmY',
  'kU7TkW9FIJY',
  'QsGtVwWStI8',
  'rLJflZ_ufpo',
  'wV1Q_vvc1GY',
  'wIm4CDia_1s',
  'Ml5pa8egN4o',
  'yjWNJRwt8mc'
]

const breadDescriptions = [
  '我們的歐式麵包以傳統配方手工製作，口感鬆軟，內部綿密，外層金黃酥脆，每一口都帶來濃郁的麵包香氣和滿滿的滿足感。',
  '想像一下，剛出爐的歐式麵包散發著迷人的香氣，麵包內部有著鬆軟的質地，每一口都能感受到麵粉的風味和麵包的溫暖。',
  '我們的歐式麵包採用優質材料，經過長時間的發酵和烘焙，口感綿密鬆軟，帶來香甜的麵包味道和融化在口中的快樂。',
  '這款手工製作的歐式麵包以天然酵母發酵，麵包內部綿密鬆軟，外層酥脆金黃，讓你享受到真正的歐洲麵包的口感和風味。',
  '我們的歐式麵包有著外脆內軟的特色，入口即化，散發著濃郁的麵包香氣和微妙的麥芽風味，讓你愛不釋手。',
  '這款歐式麵包特別添加了頂級奶油和新鮮香草，口感豐富綿密，每一口都帶來奶香的滋味和香草的清新，讓你的味蕾為之舞動。',
  '想像一下，烤得金黃的歐式麵包外皮，內部是軟綿綿的質地，每一口都讓你感受到麵包的溫暖和新鮮的麥香，為你的一天帶來美好的開始。',
  '我們的歐式麵包採用古法製作，以頂級麵粉和新鮮酵母經過多次發酵，每一口都讓你感受到麵包的彈性和濃郁的麥香，讓你欲罷不能。',
  '這款手工製作的歐式麵包經過特殊的工藝，內部鬆軟綿密，外層酥脆，每一口都帶來濃郁的麵包香氣和完美的口感。',
  '我們的歐式麵包以經典法式配方製作，口感鬆軟彈性，入口即化，帶來滿滿的麵包風味和獨特的舌尖享受。'
]

const breadFeatures = [
  '豐富口感',
  '經典配方',
  '精選原料',
  '精緻製作',
  '新鮮食材',
  '獨特風味',
  '創意組合',
  '口感多樣',
  '新穎造型',
  '精緻包裝'
]

// dessert

const fakeDessertImgIds = [
  'gKrxflp1wv0',
  'Gx_vsiMRgzk',
  'MJPr6nOdppw',
  '2UeBOL7UD34',
  'WbZesfqwR-A',
  'aX_ljOOyWJY',
  'FDYbS43jUrU',
  'YKrvaWAbBXQ',
  'q54Oxq44MZs',
  'zEwgRzJJIvk'
]

const dessertNames = [
  '法式蛋糕卷',
  '草莓塔',
  '檸檬酥皮',
  '朱古力泡芙',
  '提拉米蘇杯子蛋糕',
  '水果夾心塔',
  '香草蓬鬆塔',
  '藍莓脆皮',
  '焦糖布丁',
  '覆盆子慕斯'
]

const dessertDescriptions = [
  '我們的西式精緻點心結合了傳統工藝和創新口味，每一口都帶來滿滿的美味和質感，讓你享受到獨特的點心體驗。',
  '想像一下，精緻的西式點心上布滿了果醬和鮮奶油，酥脆的外層和柔軟的內餡完美融合，讓你的味蕾沉醉其中。',
  '我們的西式精緻點心由專業師傅精心製作，口感細膩，層次豐富，每一口都帶來滿滿的甜蜜和驚喜。',
  '這款手工製作的西式點心以優質材料和精心的製作工藝為特色，口感鬆軟，每一口都帶來滿滿的綿密口感和甜蜜風味。',
  '我們的西式精緻點心經過精心配方和烘焙，口感鬆軟細膩，每一口都讓你感受到綿密的口感和豐富的層次。',
  '這款西式精緻點心以新鮮水果和奶油製作，入口即化的口感帶來甜蜜的果香和奶香的濃郁，讓你的味蕾為之驚艷。',
  '想像一下，精緻的西式點心上鋪滿了香濃的巧克力醬，內部是輕盈的鬆軟蛋糕，每一口都帶來滿滿的巧克力風味和甜蜜的口感。',
  '我們的西式精緻點心融合了香濃的咖啡和柔軟的鮮奶油，每一口都帶來滿滿的咖啡香氣和濃郁的口感，讓你愛不釋手。',
  '這款手工製作的西式點心以香草和柑橘為特色，入口即化的口感帶來清新的香氣和綿密的口感，讓你的味蕾為之舞動。',
  '我們的西式精緻點心採用新鮮水果和頂級巧克力，每一口都讓你感受到水果的鮮甜和巧克力的濃郁，為你帶來美味的享受。'
]

const dessertFeatures = [
  '精緻外觀',
  '口感細膩',
  '創意組合',
  '新鮮食材',
  '獨特風味',
  '豐富層次',
  '精心製作',
  '美味多樣',
  '精緻包裝',
  '限量版'
]
// 

const fakeProducts = [
  {
    name: 'test',
    imageUrl: 'https://source.unsplash/7RcZyLTZCxY',
    price: 300,
    stock: 7,
    features: ['aa', 'bb', 'cc'],
    categoryId: 'clhx65v7900007kfoh3eg5puy'
  }
]

function getFakeProducts() {
  const cookies = fakeCookieImgIds.map((c,idx) => {
    return {
      name: cookieNames[idx],
      imageUrl: `https://source.unsplash.com/${c}`,
      price: Math.round(getRandomInt(80, 300) / 10) * 10,
      stock: getRandomInt(0, 50),
      description: getRandomElements(cookieDescriptions,1)[0],
      features: getRandomElements(cookieFeatures, getRandomInt(1, 5)),
      isPopular: getRandomInt(0, 1) === 1,
      categoryId: categories.cookie
    }
  })

  const breads = fakeBreadImgIds.map((c, idx) => {
    return {
      name: breadNames[idx],
      imageUrl: `https://source.unsplash.com/${c}`,
      price: Math.round(getRandomInt(80, 300) / 10) * 10,
      stock: getRandomInt(0, 50),
      description: getRandomElements(breadDescriptions, 1)[0],
      features: getRandomElements(breadFeatures, getRandomInt(1, 5)),
      isPopular: getRandomInt(0, 1) === 1,
      categoryId: categories.bread
    }
  })

  const desserts = fakeDessertImgIds.map((c, idx) => {
    return {
      name: dessertNames[idx],
      imageUrl: `https://source.unsplash.com/${c}`,
      price: Math.round(getRandomInt(80, 300) / 10) * 10,
      stock: getRandomInt(0, 50),
      description: getRandomElements(dessertDescriptions, 1)[0],
      features: getRandomElements(dessertFeatures, getRandomInt(1, 5)),
      isPopular: getRandomInt(0, 1) === 1,
      categoryId: categories.dessert
    }
  })

  return [ ...cookies , ...breads , ...desserts ]
  
}

const categories = {
  bread: 'clhzmw2cm00007kt0nnv2ez0x',
  dessert: 'clhzmw2cm00017kt0dxyl1vj8',
  cookie: 'clhzmw2cm00027kt0bvy42v25'
}

async function addFakeProducts() {
  await prisma.product.createMany({
    data: getFakeProducts(),
  })
}

async function addCategory() {
  await prisma.category.createMany({
    data: [
      { name: '歐式麵包' },
      { name: '精緻點心' },
      { name: '手工餅乾' }
    ]
  })
}

async function deleteProducts() {
  await prisma.product.deleteMany({})
}

// return random number between min and max
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomElements(baseArr: string[], numOfElements: number) {
  if (numOfElements >= baseArr.length) return []
  const pickedElements = []
  const pickedIndex = new Set()

  while (pickedElements.length < numOfElements) {
    const randomIndex = Math.floor(Math.random() * baseArr.length)

    if (!pickedIndex.has(randomIndex)) {
      pickedIndex.add(randomIndex)
      pickedElements.push(baseArr[randomIndex])
    }
  }

  return pickedElements
}

async function addFakeNews() {
  const news = [
    {
      title: '多款歐式麵包新上架!',
      content:
        '品味歐陸風情，我們自豪地宣布推出全新的歐式麵包系列！每款麵包都將帶給您最細膩的口感和美妙的味道。選用新鮮食材烘焙而成，您可以品嚐到最優質的原料。每一口都彷彿帶領您漫遊於歐洲的街頭小麵包店，讓您的味蕾獲得一次奇妙的旅程。',
      imageUrl: 'https://source.unsplash.com/Emhz3miT6mo'
    },
    {
      title: '精緻點心上架!',
      content:
        '我們驕傲地宣布推出嶄新的精緻點心系列！這些迷人的點心以精湛的工藝和豐富的口味為您帶來無限的驚喜。無論您是享受獨自一人的時光還是與摯愛分享，這些點心都能帶給您愉悅和滿足感。我們精心挑選了每一道點心的材料，確保它們的新鮮和高品質。讓我們的精緻點心成為您品味生活的絕佳選擇。',
      imageUrl: 'https://source.unsplash.com/r0DusB-OgRM'
    },
    {
      title: '多款手工餅乾上架!',
      content:
        '我們推出了全新的手工餅乾系列！每一片餅乾完全不含任何人工添加物。使用新鮮的食材和傳統的烘焙方法，確保每一塊餅乾都散發出迷人的香氣和口感。從酥脆的牛油餅乾到濃郁的巧克力餅乾，我們的手工餅乾系列滿足各種味蕾的喜好。品味這些美味的餅乾，讓您感受到細膩的手工工藝和獨特的風味。',
      imageUrl: 'https://source.unsplash.com/dZKiXR9FYcM'
    }
  ]

  await prisma.news.createMany({
    data: news
  })
}


export default defineEventHandler(async (event) => {
  try {
    // await deleteProducts()
    // await addFakeProducts()
    // const news = addFakeNews()
    return { success: getFakeProducts() }
  } catch (e) {
    console.log(e)
    return { error: e }
  }
})
