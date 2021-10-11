interface IEdge {
  from: number
  to: number
  distance: number
}

const COUNT_OF_CITY = 6

const EDGES_MAP: IEdge[] = [
  { from: 1, to: 2, distance: 5 },
  { from: 1, to: 6, distance: 26 },
  { from: 2, to: 3, distance: 7 },
  { from: 2, to: 5, distance: 13},
  { from: 3, to: 4, distance: 2 },
  { from: 3, to: 5, distance: 4 },
  { from: 4, to: 5, distance: 3 },
  { from: 5, to: 6, distance: 6 },
]

const CITY_WITH_STORAGE: boolean[] = [false, false, false, true, true, true]

const TARGET_CITY = 1

const getMinDistanceToStorage = () => {
  const targetCity = TARGET_CITY - 1
  let edges: number[][] = Array(COUNT_OF_CITY).fill(null).map(() => Array(COUNT_OF_CITY).fill(null))
  let minNodeDistance: number[] = Array(COUNT_OF_CITY).fill(Infinity)
  let visitedNodes: boolean[] = Array(COUNT_OF_CITY).fill(false)
  let sityWithStorage: boolean[] = CITY_WITH_STORAGE
  
  EDGES_MAP.forEach((edge) => {
    edges[edge.from - 1][edge.to - 1] = edge.distance
    edges[edge.to - 1][edge.from - 1] = edge.distance
  })
  minNodeDistance[targetCity] = 0
  
  let minDistanceToNearStorage = Infinity
  let nearCityWithStorage: number = null
  let currentNode = targetCity
  let currentNodeDistance = 0

  do {
    if (currentNode !== targetCity) {
      for (let i = 0; i < COUNT_OF_CITY; ++i) {
        if (!visitedNodes[i] && (minNodeDistance[i] < currentNodeDistance)) {
          currentNodeDistance = minNodeDistance[i]
          currentNode = i
        }
      }
    }
    
    if (currentNode !== Infinity) { 
      for (let i = 0; i < COUNT_OF_CITY; ++i) {
        if (edges[currentNode][i]) {
          let tmp = currentNodeDistance + edges[currentNode][i]
          if (tmp < minNodeDistance[i]) {
            minNodeDistance[i] = tmp
            if (sityWithStorage[i] && minNodeDistance[i] < minDistanceToNearStorage) {
              minDistanceToNearStorage = minNodeDistance[i]
              nearCityWithStorage = i
            }
          }
        }
      }
      visitedNodes[currentNode] = true
      currentNode = Infinity
      currentNodeDistance = Infinity
    } else {
      break
    }
  } while(true)
  
  console.log(`Delivery from city ${nearCityWithStorage + 1} with distance = ${minDistanceToNearStorage}`)
  
  console.log('Route:')
  let end = nearCityWithStorage
  let distance = minNodeDistance[end]
  while (end !== targetCity) {
    for(let i = 0; i < COUNT_OF_CITY; ++i) {
      if (edges[i][end]) {
        let tmp = distance - edges[i][end]
        if (tmp === minNodeDistance[i]) {
          console.log(`from: ${end + 1} to: ${i + 1} with distace = ${edges[i][end]}`)
          distance = tmp
          end = i
          break
        }
      }
    }
  }
}

getMinDistanceToStorage()
