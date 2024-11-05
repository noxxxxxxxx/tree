const Node = ({ list, expand, expandedKeys }) => {
  // 层级
  const indent = (level: number, node) => {
    const pads = []
    for (let i = 0; i < level; i++) {
      pads.push(
        <span
          className="pad"
          key={`${node.id}-${i}`}
        ></span>,
      )
    }
    return pads
  }
  return list.map((node) => {
    return (
      <li
        key={node.id}
        className="item"
        data-expanded={expandedKeys.has(node.id)}
      >
        {indent(node.level, node)} <span onClick={() => expand(node)}>➡️</span> {node.name}
      </li>
    )
  })
}

export default Node
