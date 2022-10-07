import { getRequests, deleteRequest, fetchPlumbers, getPlumbers, saveCompletion, getCompletions, sendRequest } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
  "change",
  (event) => {
      if (event.target.id === "plumbers") {
          const [requestId, plumberId] = event.target.value.split("--")
          
          /*
              This object should have 3 properties
                 1. requestId
                 2. plumberId
                 3. date_created
          */
          const completion = {
              requestId: parseInt(requestId),
              plumberId: parseInt(plumberId),
              date_created: Date.now()
           }

          /*
              Invoke the function that performs the POST request
              to the `completions` resource for your API. Send the
              completion object as a parameter.
           */

            saveCompletion(completion)
           
      }
  }
)

export const Requests = () => {
    const requests = getRequests()
    
    let html = `
        <ul class="request__list">
            ${
                requests.map(convertRequestToListElement).join("")
                
            }
            ${
              requests.map(convertCompletedRequests).join("")

            }
        </ul>
    
    `

    return html
}

const convertRequestToListElement = (requestObj) => {
  const plumbers = getPlumbers()
  const completions = getCompletions();
  let matchedComplete = completions.find(completion => completion.requestId === requestObj.id)
    if(!matchedComplete) {
  
      let html = ``; 
      html += `
      <li class="request">
        <div class="request__description">
        ${requestObj.description}
        </div>
        <button class="request__delete"
                id="request--${requestObj.id}">
            Delete
        </button>
      `
      html += `
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${
            plumbers.map(
                plumber => {
                    return `<option value="${requestObj.id}--${plumber.id}">${plumber.name}</option>`
                }
            ).join("")
        }
    </select>`
    
    html+= `</li> `
    return html;
    }
  
  
}

const convertCompletedRequests = (requestObj) => {
  const completions = getCompletions();
  for(const completion of completions) {
    if(requestObj.id === completion.requestId) {
      let html = ``; 
  html += `
    <li class="request" id="completed">
      <div class="request__description">
        ${requestObj.description}
        </div>
        <button class="request__delete"
                id="request--${requestObj.id}">
            Delete
        </button>
      `
      html+= `</li> `
    return html;
      }
    }
    
}