const removeWebtoon = document.querySelectorAll('.delete')
const addChapter = document.querySelectorAll('.add')

Array.from(removeWebtoon).forEach((element)=>{
    element.addEventListener('click', deleteEntry)
})

// Array.from(addChapter).forEach((element)=>{
//     element.addEventListener('click', increaseChapterCount)
// })

async function deleteEntry(){
  const id = this.getAttribute('data-id')
    
 try {
      const response = await fetch(`/webtoon/delete/${id}`, { method: 'DELETE' });
      if (response.ok) {
        // reload the page to show the updated list of documents
        window.location.reload();
      } else {
        // handle the error
        console.error('Failed to delete document');
      }
    }

        catch(err){
        console.log(err)
    }
  }




// async function increaseChapterCount(){
//     const title = this.parentNode.childNodes[1].innerText
//     const chapter = Number(this.parentNode.childNodes[3].innerText)
//     const source = this.parentNode.childNodes[5].innerText
//     try{
//         const response = await fetch('increaseChapterCount', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'webtoonTitle': title,
//               'currentChapter': chapter,
//               'source': source
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//         console.log('works')
    

//     }catch(err){
//         console.log(err)
//     }
// }