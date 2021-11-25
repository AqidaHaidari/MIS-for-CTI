function updateNativeScore(input) {
    
  var nativeScore = input.value;
  
  
  console.log(nativeScore);

  let url = "/NativeScore";  
    let method = 'POST'

  fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         
          nativeScore: nativeScore
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating or editing a post failed!');
      }
      return res.json();
    })
  .then(data => {
     console.log(data);
  })
  .catch(err => {
      console.log(err);
    });
}