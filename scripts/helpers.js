
// localStorage'a eleman ekler/ varolan elemani gunceller
export const setLocal =(key, data)=>{
   const strData =  JSON.stringify(data)
   localStorage.setItem(key, strData)

}


// local'den eleman alir
export const getLocal = (key) => {
  const strData =  localStorage.getItem(key)

  const data = JSON.parse(strData)

   
  return data;
}


