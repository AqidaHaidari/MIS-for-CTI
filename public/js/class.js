postDatadp = (data) => {
      const depname = document.getElementById('depname').value;
      const time1 = document.getElementById('time1').value;
      const time2 = document.getElementById('time2').value;
      const time3 = document.getElementById('time3').value;
      const time = time1+"_"+time2+time3;
      let days;
      if(document.getElementById('odd').checked){
        days = document.getElementById('odd').value;
      }
      else if(document.getElementById('even').checked){
        days = document.getElementById('even').value;
      }
      console.log('---------',days)
      
      const name = document.getElementById('name').value;
      const year = document.getElementById('year').value;
      
      const month = document.getElementById('month').value;
      console.log(day)
       
      let url = "/newClass";  
        let method = 'POST'
      fetch(url, {
          method: method,
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              depname: depname,
              time:time,
              day:days,
              name:name,
              year: year,
              month: month
          })
      })
      .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Creating or editing a post failed!');
          }
          return res.json();
        })
      .then(data => {
        var x=document.getElementById('tableData').getElementsByTagName('tbody')[0].insertRow(0);
          var c1 = x.insertCell(0);
          var c2 = x.insertCell(1);
          var c3 = x.insertCell(2);
          var c4 = x.insertCell(3);
          var c6 = x.insertCell(4);
          var c7 = x.insertCell(5);
          var c8 = x.insertCell(6);
          var c5 = x.insertCell(7);
          c1.innerHTML="";
          c2.innerHTML=data.post.depname;
          c2.setAttribute('name','depname');
          c3.innerHTML=data.post.time;
          c3.setAttribute('name','time');
          c4.innerHTML=data.post.day;
          c4.setAttribute('name','days');
          c6.innerHTML=data.post.name;
          c6.setAttribute('name','name');
          c7.innerHTML=data.post.month;
          c7.setAttribute('name','month');
          c8.innerHTML=data.post.year;
          c8.setAttribute('name','year');
          c5.innerHTML='<input type="hidden" name="recordId" value="'+data.post._id+'"><button data-toggle="modal" data-target="#editModal" data-whatever="'+[data.post._id, data.post.depname, data.post.time, data.post.day,data.post.name,data.post.month,data.post.year]+'" onclick="returnRowToEdit(this)">Edit</button><button id ="sample" data-toggle="modal" data-target="#exampleModal" data-whatever="'+data.post._id+'" onclick="returnRowToDelete(this)">Delete</button>';
          document.getElementById('depname').value = null;
          document.getElementById('time').value = null;
          document.getElementById('day').value = null;
          document.getElementById('time').value = null;
          document.getElementById('name').value = null;
          document.getElementById('month').value = null;
          document.getElementById('year').value = null;
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  let nodeElement = null;
  let parentNodeElement = null;
  returnRowToDelete = (btn) =>{
    const x = btn.parentNode.closest('tr');
    nodeElement = x;
    parentNodeElement = x.parentNode;
    console.log(parentNodeElement)
  }
  
  let parentNodeElementEdit = null;
  returnRowToEdit = (btn) => {
    const x = btn.parentNode.closest('tr');
    parentNodeElementEdit = x;
  }
  
  editData = (btn) => {
    const parent = btn.parentNode;
    const recordId = parent.parentNode.querySelector('[name=id]').value;
    const depname = parent.parentNode.querySelector('[name=depname]').value;
    const time = parent.parentNode.querySelector('[name=time]').value;
    const day = parent.parentNode.querySelector('[name=day]').value;
    const name = parent.parentNode.querySelector('[name=name]').value;
    const year = parent.parentNode.querySelector('[name=year]').value;
    const month = parent.parentNode.querySelector('[name=month]').value;
    let url = "/editedClass";
        let method = 'POST'
        fetch(url, {
          method: method,
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: recordId,
              depname: depname,
              time:time,
              day:day,
              name:name,
              month: month,
              year: year
             
          })
      })
      .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Creating or editing a post failed!');
          }
          return res.json();
        })
      .then(data => {
  
        parentNodeElementEdit.querySelector('[name=depname]').innerHTML = depname;
        parentNodeElementEdit.querySelector('[name=time]').innerHTML = time;
        parentNodeElementEdit.querySelector('[name=day]').innerHTML = day;
        parentNodeElementEdit.querySelector('[name=name]').innerHTML = name;
        parentNodeElementEdit.querySelector('[name=month]').innerHTML = month;
        parentNodeElementEdit.querySelector('[name=year]').innerHTML = year;
      })
        .catch(err => {
          console.log(err);
        });
  }
  
  postDelete = (btn)=>{
    const parent = btn.parentNode;
    const recordId = parent.parentNode.querySelector('[name=recipientName]').value
    let url = "/deleteClass";
        let method = 'POST'
      fetch(url, {
          method: method,
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: recordId
          })
      })
      .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Creating or editing a post failed!');
          }
          return res.json();
        })
      .then(data => {
        parentNodeElement.removeChild(nodeElement)
      })
        .catch(err => {
          console.log(err);
        });
  }