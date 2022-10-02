/**
 * Handling the simple typing animation in a little objects snippet....
 */

 const title__animation = {
    index: 0,
    typing__spead: 45,
    heading__text: "Weather Journal...",
    type__writer: () => {
      if (title__animation.index < title__animation.heading__text.length) {
        document.getElementById("form__title").innerHTML +=
          title__animation.heading__text.charAt(title__animation.index);
        title__animation.index++;
        setTimeout(
          title__animation.type__writer,
          title__animation.typing__spead
        );
      }
    },
  };
  window.addEventListener("load", title__animation.type__writer);
  /**
   * End of the animation Handeling
   */
  
  /**
   * The beginning of the actual work
   * Declaring a DOM elements & api things wrapper OBJECT for more readability.
   */
  
  const dom__wrapper = {
    zip: document.querySelector("#zip"),
    feelings: document.querySelector("#feelings"),
    date__element: document.querySelector("#date"),
    button: document.querySelector("#generate"),
    city: document.querySelector("#city"),
    temprature: document.querySelector("#temprature"),
    feeling: document.querySelector("#feeling"),
    output__form: document.querySelector(".shityy"),
    date: new Date().toDateString(), // getting the stringified date of today
    main__url: "https://api.openweathermap.org/data/2.5/weather?zip=",
    api__key: "&appid=4cca03bc512b8386bfedda1088f6ed3c&units=imperial",
  };
  
  /**
   * the main async functions wrapped in a wrapper object for more conroling and readability
   *
   */
  const async__functions = {
    /**
     * Async Function To fetch the data from openWeather api.
     * then turn the retrieved promis into simple object via json methods.
     * then runs test statments to see if its the wanted data and then catches any errors.
     * then return either data or error.
     */
    fetch__data: async (url) => {
      // try catch statements to fetch the data and run the tests on
      try {
        // data__stage__I = wait to the fetch then store the fetched data
        const data__stage__I = await fetch(url);
        // converting the data fetched into object in json style
        const data__stage__II = await data__stage__I.json();
        //running the test on fetched data and adding custom alert errors
        if (data__stage__II.cod === 200) {
          return data__stage__II;
        } else if (
          data__stage__II.cod !== 200 &&
          data__stage__II.message == "city not found"
        ) {
          console.log(data__stage__II.message);
          alert(data__stage__II.message);
        } else {
          console.log("empty zip"); // adding custom error
          alert("empty zip");
        }
        // catching the error if found then throw it in the console
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Async function to handle the retrieved data and organize the main items in object
     * also adding the full date && feeling of the client.
     * then ofc return the data
     */
    handle__data: async (missy__data, feeling) => {
      // declaring the object that hold the organized data phase
      const data__stage__III = {
        date: dom__wrapper.date,
        // using math round to display all integers
        temp: Math.round(missy__data.main.temp) + "°F",
        country: `${missy__data.name}, ${missy__data.sys.country}`,
        feeling: `${feeling}`,
      };
      return data__stage__III;
    },
    /**
     * Async function to post the handeled data to the /add directory in the local server and then store it in the project__data object
     */
    post__data: async (handeled__data, url) => {
      try {
        // used the fetch post method with the below options to post the data__stage__III into the project__data object in the server
        const request__data = await fetch(url, {
          // specifing the method of request to POST
          method: "POST",
          // telling the server that the request will come from local origin
          credentials: "same-origin",
          // specifieng the content type of the request
          headers: {
            "Content-type": "application/json",
          },
          // stringifieng the request body
          body: JSON.stringify(handeled__data),
        });
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Async function to retrieve the data from the /all from the servet project__data object to use in ui update
     */
    recall__data: async (url) => {
      try {
        const data__stage__IV = await fetch(url);
        const data__stage__V = data__stage__IV.json();
        return data__stage__V;
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Async function to take the data__stage__V then update the ui in dynamic way
     */
    ui__updater: async (data) => {
      // if data exists then do below
      try {
        if (data) {
          // changing the innerTEXT of the below dom elemnts
          dom__wrapper.city.innerText = data.country;
          dom__wrapper.temprature.innerText = data.temp;
          dom__wrapper.feeling.innerText = data.feeling;
          dom__wrapper.date__element.innerText = data.date;
          // when submitting the button the opacity-0 bootstrab class will be removed to let the form appears in little transition effect
          dom__wrapper.output__form.classList.remove("opacity-0");
        }
      } catch (error) {
        console.error(error);
      }
    },
  };
  /**
   * the end of the async functions object
   */
  
  dom__wrapper.button.addEventListener("click", (Event) => {
    // for stopping the default form submitting event
    Event.preventDefault();
    // constructing request url based on the entered zip code.
    const zip__feeling = {
      zip: `${dom__wrapper.zip.value}`,
      feeling: `${dom__wrapper.feelings.value}`,
    };
    const req__url = `${dom__wrapper.main__url}${zip__feeling.zip}${dom__wrapper.api__key}`;
    // start using the previous async functions with chaining promises
  
    // fetch the data.
    async__functions
      .fetch__data(req__url)
      .then((data) => {
        // then return the value returned by the handeler function which is data__stage__III && giving the function feeling as a parameter
        return async__functions.handle__data(data, zip__feeling.feeling);
      })
      .then((retrieved) => {
        // posting data to the projectData object in the
        async__functions.post__data(retrieved, "/add");
      })
      .then((_) => {
        // then returning the value returned by the recall function which is the data__stage__V ==> the final phase
        return async__functions.recall__data("/all");
      })
      .then((data) => {
        // then pass the final stage of our data object to the ui__updater to dinamically update the ui
        async__functions.ui__updater(data);
      });
  });
  






































// /**
//  * The beggining of the actual rubric
//  */

// // Personal API key
// const base__url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// const personal__api__key = '&appid=4cca03bc512b8386bfedda1088f6ed3c&units=imperial';

// document.querySelector('#generate').addEventListener('click', (Event) => {
//     Event.preventDefault();
//     const zip = document.getElementById('zip').value;
//     const full__fetch__url = `${base__url}${zip}${personal__api__key}`;
//     fetch__data(full__fetch__url).then((data) => {
//         console.log(data);
//     })
    
// })

// const fetch__data = async (url) => {
//     try {
//         const pre__data = await fetch(url);
//         const data = await pre__data.json();
//         return data;
        
        
//     } catch (error) {
//         alert(error);
//     }
// }




