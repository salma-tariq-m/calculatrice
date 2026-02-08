const exprEl = document.getElementById('expr');
    const resEl = document.getElementById('res');

    let expr = '';

    function updateDisplay(){
      exprEl.textContent = expr || '0';
      const endsWithValid= /[0-9]$/.test(expr);
      if(!expr || !endsWithValid){
        resEl.textContent=0
        return
      }
      try{
        const val = safeEval(expr);
        resEl.textContent = (val === undefined || expr==='') ? '0' : val;
      }catch(e){
        resEl.textContent = e;
      }
    }
    function safeEval(s){
      if(!s){
         return 0;}
      s = s.replace(/÷/g,'/').replace(/×/g,'*');
      if(!/^[0-9+\-*/().\s]+$/.test(s)){
         throw new Error('Invalid characters');}
      const result = eval(s);
      if(typeof result === 'number' && isFinite(result)){

        return Math.round((result + Number.EPSILON) * 1e12) / 1e12;
      }
      throw new Error('Invalid result');
    }

    document.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const v = btn.dataset.value;
        const action = btn.dataset.action;
        if(action === 'clear'){
          expr = '';
          updateDisplay();
          return;
        }
        if(action === 'backspace'){
          expr = expr.slice(0,-1);
          updateDisplay();
          return;
        }
        if(action === 'equals'){
          try{
            expr = String(safeEval(expr));
            updateDisplay();
          }catch(e){
            resEl.textContent = 'Error';
          }
          return;
        }
        expr += v;
        updateDisplay();
      });
    });

    window.addEventListener('keydown', (e)=>{
      const key = e.key;
      if(key === 'Enter'){
        e.preventDefault();
        try{ expr = String(safeEval(expr));
             updateDisplay(); 
            }catch(err){
                 resEl.textContent='Error';
                 }
        return;
      }
      if(key === 'Backspace' ){
        expr = expr.slice(0,-1);
        updateDisplay();
        return;
      }
      if(key === 'Escape'){
        expr = '';
        updateDisplay();
        return;
      }
      if(/^[0-9+\-*/().]$/.test(key)){
        expr += key;
        updateDisplay();
      }
    });

    updateDisplay();

const text = "Calculatrice";
const h1 = document.getElementById("divTitle");
let i = 0;

function typeWriter() {
  if (i < text.length) {
    h1.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100); // 100ms delay entre chaque lettre
  }
}

// run quand page chargée
window.addEventListener("DOMContentLoaded", typeWriter);

