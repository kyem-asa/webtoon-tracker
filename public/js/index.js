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

async function increaseChapterCount(){
    const title = this.parentNode.childNodes[1].innerText
    const chapter = Number(this.parentNode.childNodes[3].innerText)
    const source = this.parentNode.childNodes[5].innerText
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