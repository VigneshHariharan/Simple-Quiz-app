const API_TOKEN = 'XfmoMXBSZXf8L0EYCw07KLemXxghZ4BOJL0O4sMj';


export const getQuestions = (insertQuestions) => {
  const params = new URLSearchParams(window.location.search)
  fetch("https://quizapi.io/api/v1/questions?" + params + "&apiKey=" + API_TOKEN)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      
    insertQuestions(json)
    })
    .catch((err) => {
      console.log("Error : ", err);
    });
};
