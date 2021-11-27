const API_TOKEN = 'XfmoMXBSZXf8L0EYCw07KLemXxghZ4BOJL0O4sMj';


export const getQuestions = (insertQuestions, onLoadCallback, successCallback, failureCallback) => {
  const params = new URLSearchParams(window.location.search)
  onLoadCallback()
  fetch("https://quizapi.io/api/v1/questions?" + params + "&apiKey=" + API_TOKEN)
    .then((res) => {
      successCallback()
      return res.json();
    })
    .then((json) => {
    insertQuestions(json)
    })
    .catch((err) => {
      failureCallback()

      console.log("Error : ", err);
    });
};
