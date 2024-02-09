import { useRandomDict } from "./dictionary.js"

class Collection {
  constructor(params) {
    this.cache = {};
  }

  get(layer, key){
    if(layer in this.cache){
      return this.cache[layer].get(key);
    }else{
      return undefined;
    }
  }

  set(layer, key){
    if(!(layer in this.cache)){
      this.cache[layer] = useRandomDict();
      this.cache[layer].set(key, key);
    }else if(this.cache[layer].get(key) === undefined){
      this.cache[layer].set(key, key);
    }
    return this.cache[layer].get(key);
  }

  getCollection(){
    return this.cache;
  }

  getLayers(){
    return Object.keys(this.cache);
  }

  getLayerKeys(layer){
    if(this.getLayerKeys().includes(layer)){
      return this.cache[layer].getKeys();
    }else{
      return 'Undefined Layer';
    }
  }

  getLayerValues(layer){
    if(this.getLayerKeys().includes(layer)){
      return this.cache[layer].getValues();
    }else{
      return 'Undefined Layer';
    }
  }
}

export default Collection;