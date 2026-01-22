
const dict = {
"hi":"مرحبا","hello":"مرحبا","brother":"أخي","friend":"صديق",
"good":"جيد","morning":"صباح","night":"ليل","school":"مدرسة",
"computer":"حاسوب","phone":"هاتف","love":"حب","food":"طعام",
"water":"ماء","house":"منزل","car":"سيارة","book":"كتاب",
"work":"عمل","play":"يلعب","learn":"يتعلم","teacher":"معلم",
"student":"تلميذ","city":"مدينة","country":"بلد","family":"عائلة"
}; // يمكن تكبيره إلى 1000+ كلمة بنفس الصيغة

function levenshtein(a,b){
const m=[];
for(let i=0;i<=b.length;i++){m[i]=[i]}
for(let j=0;j<=a.length;j++){m[0][j]=j}
for(let i=1;i<=b.length;i++){
 for(let j=1;j<=a.length;j++){
  m[i][j]=b[i-1]==a[j-1]?m[i-1][j-1]:
  Math.min(m[i-1][j-1]+1,m[i][j-1]+1,m[i-1][j]+1)
 }
}
return m[b.length][a.length]
}

function translateWord(w){
if(dict[w]) return dict[w];
let best="",score=99;
for(let k in dict){
 let d=levenshtein(w,k);
 if(d<score){score=d;best=k}
}
return score<=2 ? dict[best] : w;
}

function translateSentence(){
suggestions.innerHTML="";
const words=input.value.toLowerCase().split(/\s+/);
output.value=words.map(w=>translateWord(w)).join(" ");
}
