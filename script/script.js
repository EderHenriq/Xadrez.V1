let selecionada = null;


const casas = document.querySelectorAll('.casa');


function validaMovimento(peça, casaDestino, origem) {
  const origemIndex = Array.from(casas).indexOf(origem);
  const destinoIndex = Array.from(casas).indexOf(casaDestino);

  
  const origemColuna = origemIndex % 8;
  const origemLinha = Math.floor(origemIndex / 8);

  const destinoColuna = destinoIndex % 8;
  const destinoLinha = Math.floor(destinoIndex / 8);

  
  if (peça === 'peao') {
    
    if (origemColuna === destinoColuna && destinoLinha === origemLinha - 1 && !casaDestino.querySelector('img')) {
      return true; 
    }
    if (origemColuna === destinoColuna && destinoLinha === origemLinha - 2 && !casaDestino.querySelector('img') && origemLinha === 6) {
      return true; 
    }
    
    if (Math.abs(origemColuna - destinoColuna) === 1 && destinoLinha === origemLinha - 1 && casaDestino.querySelector('img') && casaDestino.querySelector('img').alt.includes('preto')) {
      return true; 
    }
  }

  if (peça === 'torre') {
    
    if (origemColuna === destinoColuna || origemLinha === destinoLinha) {
      return true; // Movimento horizontal ou vertical
    }
  }

  if (peça === 'cavalo') {
    
    if (Math.abs(origemColuna - destinoColuna) === 2 && Math.abs(origemLinha - destinoLinha) === 1 || Math.abs(origemColuna - destinoColuna) === 1 && Math.abs(origemLinha - destinoLinha) === 2) {
      return true; 
    }
  }

  if (peça === 'bispo') {
    
    if (Math.abs(origemColuna - destinoColuna) === Math.abs(origemLinha - destinoLinha)) {
      return true; 
    }
  }

  if (peça === 'rainha') {
    
    if (origemColuna === destinoColuna || origemLinha === destinoLinha || Math.abs(origemColuna - destinoColuna) === Math.abs(origemLinha - destinoLinha)) {
      return true; 
    }
  }

  if (peça === 'rei') {
    
    if (Math.abs(origemColuna - destinoColuna) <= 1 && Math.abs(origemLinha - destinoLinha) <= 1) {
      return true; 
    }
  }

  return false; 
}

function moverPeca(casaDestino) {
  if (selecionada === null) return;

  const peçaSelecionada = selecionada.querySelector('img');
  const pecaNome = peçaSelecionada.alt.split(' ')[0];

  
  if (validaMovimento(pecaNome, casaDestino, selecionada)) {
    
    const img = selecionada.querySelector('img');
    casaDestino.appendChild(img); 

    selecionada.classList.remove('selecionada');
    selecionada = null;
  } else {
    alert("Movimento inválido!");
  }
}


casas.forEach(casa => {
  casa.addEventListener('click', () => {
    const temImagem = casa.querySelector('img');

    if (selecionada === null) {
      
      if (temImagem) {
        selecionada = casa;
        casa.classList.add('selecionada');
      }
    } else {
      
      if (!temImagem) {
        moverPeca(casa); 
      } else {
        
        selecionada.classList.remove('selecionada');
        if (casa !== selecionada) {
          selecionada = casa;
          casa.classList.add('selecionada');
        } else {
          selecionada = null;
        }
      }
    }
  });
});


