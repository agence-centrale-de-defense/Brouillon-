
function PROD(m1,m2,alg,J){
  let out=function(i){
    return function(k){
      return alg.bigsum(function(j){
        return alg.get_prod()(m1(i)(j),m2(j)(k))},J)
    }
  }
  return out;
}
function algbre(sum,prod,zero,one){
  return {
   zeroFrezed:zero,
  get_zero:function(){
    return eval(this.zeroFrezed)
  },
oneFrezed:one,
get_one:function(){
  return this.one
},
sumFrezed:sum,
get_sum:function(){
  return this.sumFrezed;
},
prodFrezed:prod,
get_prod:function(){
  return this.prodFrezed;
}
,
  bigsum:function(f,J){
    u=this.get_zero();
    for(let j=0;j<J.length;j++){
      u=this.get_sum()(u,f(J[j]))
    }
    return u;
  },
  bigprod:function(f,J){
    u=this.get_one();
    for(let j=0;j<J.length;j++){
      u=this.get_prod()(u,f(J[j]))
    }
    return u;
  }
 }
}

const bool_alg=new algbre(function(x,y){
return x || y 
},function(x,y){return x && y},false,true);

const test_Id=function(i){return function (j){return j==i}}
function range(a,b){
  let out=[];
  let q=0;
  for(let i=a;i<b;i++){
    out[q++]=i;
  }
  return out;
}
function EQ(m0,m1,I,J){
  for(let i=0;i<I.length;i++){
    let x=I[i];
    for(let j=0;j<J.length;j++){
      let y=J[j];
      if(m0(x)(y)!=m1(x)(y)) return false;
    }
  }
  return true;
}
function close_pow(m,I,J){
  let mp0=m;
  let mp1=PROD(m,m);
  while (!EQ(mp0,mp1,I,J)){
    mp0=mp1;
    mp1=PROD(mp1,mp1);
  }
  return mp0;
}
const test_neutre=PROD(test_Id,test_Id,bool_alg,range(0,5));

for(let i=0;i<5;i++){
  for(let k=0;k<5;k++){
    console.assert(test_neutre(i)(k)==(i==k))
  }
}
const test_slt=function(i){
  return function(j){
    if(i=j-1) return true;
    return false;
  } 
}
const test_lt=function(i){
  return function(j){return i<=j;}
}
console.assert(EQ(close_pow(test_slt,range(10),range(10)),range(10),range(10)));
console.log("test_ok:Gmatrix.js")