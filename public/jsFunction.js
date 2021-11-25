function updateScore(input) {
    
    var score = input.value;
    var id = input.parentNode.querySelector('[id=id]').value;

    let url = "/scores";  
      let method = 'POST'

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            score: score
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
       console.log("result",data.post._id);
    })
    .catch(err => {
        console.log(err);
      });
}


function matchScores(input){
    var score = +input.value;
    var id = input.parentNode.querySelector('[id=id]').value;
    var nativeScore= +document.getElementById('nativeScore').value;
    var result;
    if(score<nativeScore){
        result='Failed'
        alert('failed-----'+ score +" - "+ nativeScore)
    }
    else {
        result='Passed'
        alert('passed-----'+ score +' - '+ nativeScore)

    }
    // console.log(id);

    // let url = "/applicants";  
    //   let method = 'POST'

    // fetch(url, {
    //     method: method,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         id: id,
    //         result: result
    //     })
    // })
    // .then(res => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error('Creating or editing a post failed!');
    //     }
    //     return res.json();
    //   })
    // .then(data => {
    //    console.log(data);
    //    console.log(data.post.result)
    // })
    // .catch(err => {
    //     console.log(err);
    //   });
    
}