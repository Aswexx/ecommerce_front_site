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


export default defineEventHandler(async (event) => {
  try {
    // await deleteProducts()
    await addFakeProducts()
    return { success: getFakeProducts() }
  } catch (e) {
    console.log(e)
    return { error: e }
  }
})
