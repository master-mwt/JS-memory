// TODO: images path (is okay to keep it in dist ?)

let Image = function(name) {
  this.name = name;
  this.url = `img/${name}.jpg`;
};

export default Image;