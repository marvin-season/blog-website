

function styled(tag) {
  return (styles, ...exprs) => {
    const css = styles.reduce(
      (acc, cur, i) => acc + cur + (exprs[i] || ""),
      ""
    )
    const className = "sc-" + Math.random().toString(36).substr(2, 5)
    return `.${className} { ${css} }`
  }
}

const res = styled()`
  background: ${'red'};
  color: white;
`;


console.log(res)