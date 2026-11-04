// A bounded recursive-descent parser. Expressions are never evaluated as JavaScript.
const requireValue=(ok,message)=>{if(!ok)throw Error(message);};
const factorial=value=>{requireValue(Number.isInteger(value)&&value>=0&&value<=170,'Factorial needs a whole number from 0 to 170.');let n=1;for(let i=2;i<=value;i++)n*=i;return n;};
const tidyTrig=n=>Math.abs(n)<1e-15?0:Math.abs(n-1)<1e-15?1:Math.abs(n+1)<1e-15?-1:n;
export function scientificCalculate(expression,{answer}={}){
 requireValue(typeof expression==='string'&&expression.length>0&&expression.length<=4000,'Enter an expression up to 4,000 characters.');
 const source=expression.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/π/g,'pi').trim();
 const tokens=source.match(/(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?|[a-z]+|[()+\-*/%^!,]/gi)||[];
 requireValue(source&&tokens.length<=1024&&tokens.join('').toLowerCase()===source.replace(/\s/g,'').toLowerCase(),'Use numbers, operators, parentheses or a supported scientific function.');
 let pos=0,depth=0;
 const guard=fn=>{requireValue(++depth<=80,'This expression is nested too deeply.');try{return fn();}finally{depth--;}};
 const angle=value=>{requireValue(Math.abs(value)<=1e12,'Use an angle within ±1 trillion degrees.');return value%360*Math.PI/180;};
 const functions={
  sqrt:Math.sqrt,cbrt:Math.cbrt,abs:Math.abs,ln:Math.log,log:Math.log10,exp:Math.exp,round:Math.round,floor:Math.floor,ceil:Math.ceil,
  sin:x=>tidyTrig(Math.sin(angle(x))),cos:x=>tidyTrig(Math.cos(angle(x))),
  tan:x=>{requireValue(Math.abs(x%180)!==90,'tan is undefined at 90° plus any whole multiple of 180°.');return tidyTrig(Math.tan(angle(x)));},
  asin:x=>Math.asin(x)*180/Math.PI,acos:x=>Math.acos(x)*180/Math.PI,atan:x=>Math.atan(x)*180/Math.PI,
  fact:factorial
 };
 function atom(){return guard(()=>{
  const token=tokens[pos++],name=token?.toLowerCase();
  if(token==='('){const n=sum();requireValue(tokens[pos++]===')','Close every parenthesis.');return n;}
  if(name==='pi')return Math.PI;
  if(name==='e')return Math.E;
  if(name==='ans'){requireValue(Number.isFinite(answer),'Calculate an answer before using Ans.');return answer;}
  if(functions[name]){requireValue(tokens[pos++]==='(','Functions need parentheses, such as sin(30).');const n=sum();requireValue(tokens[pos++]===')','Close every parenthesis.');const value=functions[name](n);requireValue(Number.isFinite(value),'This function has no finite real result for that input.');return value;}
  requireValue(token!==undefined&&/^(?:\d|\.)/.test(token),'Check the expression and operator positions.');return Number(token);
 });}
 function postfix(){let n=atom();while(['!','%'].includes(tokens[pos]))n=tokens[pos++]==='!'?factorial(n):n/100;return n;}
 function unary(){return guard(()=>{if(tokens[pos]==='+'){pos++;return unary();}if(tokens[pos]==='-'){pos++;return -unary();}return power();});}
 function power(){let n=postfix();if(tokens[pos]==='^'){pos++;n=n**unary();}return n;}
 function product(){let n=unary();while(['*','/','mod'].includes(tokens[pos]?.toLowerCase())){const op=tokens[pos++].toLowerCase(),b=unary();n=op==='*'?n*b:op==='/'?n/b:n%b;}return n;}
 function sum(){let n=product();while(['+','-'].includes(tokens[pos])){const op=tokens[pos++],b=product();n=op==='+'?n+b:n-b;}return n;}
 const value=sum();requireValue(pos===tokens.length,'Add an operator between values and check the parentheses.');requireValue(Number.isFinite(value),'This expression has no finite real result.');return Object.is(value,-0)?0:value;
}
export const scientificDisplay=value=>String(Number(value.toPrecision(12)));
