export function l(logs){
  for (let i = 0; i < logs.length; i ++){
  console.log(logs[i])
  }
}

export function t(tables){
  for (let i = 0; i < tables.length; i ++){
  console.table(tables[i])
  }
}