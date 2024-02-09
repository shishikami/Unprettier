import changeCaseRandomly from "./ast/randomCase.js";

class Dictionary {
  cache = {};
  callback = undefined;

  constructor(callback){
    this.cache = {};
    this.callback = callback
  }

  set(key, value){
    let v = undefined;
    if(this.callback){
      v = this.callback(value);
    }
    v = v ?? value;
    this.cache[key] = v;
    return v;
  }

  get(key){
    if(Object.prototype.hasOwnProperty.call(this.cache, key)){
      return this.cache[key]
    }else{
      return undefined;
    }
  }

  auto(key, value){
    let fetch = this.get(key);
    if(fetch !== undefined){
      return fetch
    }else{
      return this.set(key, value);
    }
  }

  getKeys(){
    return Object.getOwnPropertyNames(this.cache).join('\n');
  }

  getValues(){
    return Object.values(this.cache).join('\n');
  }

  getPairs(){
    return this.cache;
  }
}

export function useRandomDict(){
  return new Dictionary((data)=>{
    return changeCaseRandomly(data);
  })
}

export default Dictionary;