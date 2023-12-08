/*
  --------------------------------------------------------------------------------------
  Função para obter as predições existente no servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getPredictions = async () => {
    let url = 'http://127.0.0.1:5500/predictions';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.predictions.forEach(prediction => insertList(prediction.bwt, 
            prediction.gestation, prediction.parity, 
            prediction.age, prediction.height, prediction.weight, prediction.smoke))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
    getPredictions()
  
  /*
    --------------------------------------------------------------------------------------
    Função para enviar dados para o servidor fazer predição via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputBwt, inputGestation, inputParity, 
    inputAge, inputHeight, inputWeight) => {
    const formData = new FormData();
    formData.append('bwt', inputBwt);
    formData.append('gestation', inputGestation);
    formData.append('parity', inputParity);
    formData.append('age', inputAge);
    formData.append('height', inputHeight);
    formData.append('weight', inputWeight);
  
    let url = 'http://127.0.0.1:5500/predictions';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo caso de predição
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {
    let inputBwt = document.getElementById("newBwt").value;
    let inputGestation = document.getElementById("newGestation").value;
    let inputParity = document.getElementById("newParity").value;
    let inputAge = document.getElementById("newAge").value;
    let inputHeight = document.getElementById("newHeight").value;
    let inputWeight = document.getElementById("newWeight").value;
  
    
    
    const variablesValidation = (inputBwt, inputGestation, inputParity, 
        inputAge, inputHeight, inputWeight) => {
        var values = [inputBwt, inputGestation, inputParity, 
            inputAge, inputHeight, inputWeight]

        for (var i = 0; i < values.length; i++) {
                if (values[i] === '') {
                    return warningText = "Falta um ou mais dados!"
                } else if (isNaN(values[i])) {
                    return warningText = "Dados precisam ser valores numéricos!"
                }
            }
        };

    if (variablesValidation(inputBwt, inputGestation, inputParity, 
        inputAge, inputHeight, inputWeight)) {
        alert(warningText)
    } else {
        postItem(inputBwt, inputGestation, inputParity, 
            inputAge, inputHeight, inputWeight)
            alert("Dados adicionados!")
    }

    getPredictions()
  }


  /*
    --------------------------------------------------------------------------------------
    Função para inserir dados a lista resumo
    --------------------------------------------------------------------------------------
  */

  const insertList = async (bwt, gestation, parity, 
    age, height, weight, smoke) => {
    
    var item = [bwt, gestation, parity, 
        age, height, weight, smoke]
    
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
        var cel = row.insertCell(i);
        cel.textContent = item[i];
    }

    document.getElementById("newBwt").value = "";
    document.getElementById("newGestation").value = "";
    document.getElementById("newParity").value = "";
    document.getElementById("newAge").value = "";
    document.getElementById("newHeight").value = "";
    document.getElementById("newWeight").value = "";
    document.getElementById("newSmoke").value = "";
  }