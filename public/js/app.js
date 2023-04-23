console.log('Client side javascript file is loaded!')

// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('.weatherForm')
const search = document.querySelector('input')
const messageOne= document.querySelector('#one')
const messageTwo= document.querySelector('#two')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>{
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Loading...'
                messageTwo.textContent = data.error
            } else {
                messageOne.textContent = `The weather is ${data.product.weather}`
                messageTwo.textContent = `The min temp today is ${data.product.temp}`
            }
        })
    })
})