export function capitalize (str) {
  
  return (typeof str === 'undefined' || typeof str !== "string") || str === ''
    ? ''
    : (str.split(" ").map((t) => t[0].toUpperCase() + t.slice(1))).join(" ")
}


export function checkUndefined (str = '') {
   return typeof str === 'undefined'
	? ''
	: str
}