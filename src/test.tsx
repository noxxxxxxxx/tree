import { useEffect, useState } from 'react'
import './test.scss'
import Node from './node'
const Test = ({ list }) => {
  const data = JSON.parse(
    JSON.stringify([
      {
        id: '0',
        name: '第一个',
        children: [
          {
            id: '1',
            name: '第二个',
          },
          {
            id: '2',
            name: '第3个',
          },
        ],
      },
      {
        id: '3',
        name: '第4个',
        children: [
          {
            id: '4',
            name: '第5个',
          },
          {
            id: '5',
            name: '第6个',
            children: [
              {
                id: '7',
                name: '第7个',
              },
            ],
          },
        ],
      },
    ]),
  )
  const [expandedKeys, setExpandedKeys] = useState(new Set())

  const flattened = []

  const expandKeys = new Set()
  function traverse(list, level: number) {
    list.forEach((node) => {
      node.level = level
      expandKeys.add(node.id)
      flattened.push(node)
      if (node.children && expandedKeys.has(node.id)) {
        traverse(node.children, level + 1)
      }
    })
  }
  traverse(data, 0)
  useEffect(() => {
    setExpandedKeys(expandKeys)
  }, [])

  if (!data.length) return <></>

  const expand = (node) => {
    const pre = new Set(expandedKeys)
    if (pre.has(node.id)) {
      pre.delete(node.id)
    } else {
      pre.add(node.id)
    }
    setExpandedKeys(pre)
    traverse(data, 0)
  }

  return (
    <Node
      list={flattened}
      expand={expand}
      expandedKeys={expandedKeys}
    ></Node>
  )
}

export default Test
