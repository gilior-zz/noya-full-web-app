interface String {
  includes(str: String): boolean
}


String.prototype.includes = function (str: String) {
  return this.indexOf(str) != -1;
}


