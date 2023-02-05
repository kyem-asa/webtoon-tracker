const removeWebtoon = document.querySelectorAll('.delete')
const addChapter = document.querySelectorAll('.add')

Array.from(removeWebtoon).forEach((element)=>{
    element.addEventListener('click', deleteEntry)
})

Array.from(addChapter).forEach((element)=>{
    element.addEventListener('click', increaseChapterCount)
})

function chapWorks() {
    console.log('button works')
}


async function deleteEntry(){
const title = document.querySelector('.title').innerText
const chapter = Number(document.querySelector('.lastChapter')).innerText
const source = document.querySelector('.source').innerText
  try{
      const response = await fetch('deleteWebtoon', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'webtoonTitle': title,
            'currentChapter': chapter,
            'source': source
          })
        })
      const data = await response.json()
      console.log(data)
      location.reload()

  }catch(err){
      console.log(err)
  }
}


async function increaseChapterCount(){
  const title = document.querySelector('.title').innerText
  const chapter = Number(document.querySelector('.lastChapter').innerText)
  const source = document.querySelector('.source').innerText
  try{
      const response = await fetch('increaseChapterCount', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'webtoonTitle': title,
            'currentChapter': chapter,
            'source': source
          })
        })
      const data = await response.json()
      console.log(data)
      location.reload()
      console.log('works')
  

  }catch(err){
      console.log(err)
  }
}