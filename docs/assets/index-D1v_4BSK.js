import{o as n,e as i,w as s,c,F as _,d as h,f as A,g as e,E as p,m as x,h as y,r as T,i as l,a as o,j as d,k as b,l as g}from"./index-BYZSkiw9.js";import{_ as k}from"./plugin-vueexport-helper-DlAUqK2U.js";const u={__name:"index",props:{source:{type:Array,default:()=>[]},columns:{type:Array,default:()=>[]},height:{type:[String,Number]}},setup(t){return(f,a)=>(n(),i(e(y),{data:t.source,height:t.height},{default:s(()=>[(n(!0),c(_,null,h(t.columns,r=>(n(),c(_,{key:r.name},[r.slot?A(f.$slots,r.slot,{key:0}):(n(),i(e(p),x({key:1,ref_for:!0},r),null,16))],64))),128))]),_:3},8,["data","height"]))}};const v=[{label:"Name",prop:"name"},{label:"Date",prop:"date"},{label:"Address",prop:"address"}],B=[{label:"Name",prop:"name"},{label:"Date",formatter({date:t}){return`送达时间:${t}`}},{label:"Address",prop:"address",formatter({address:t}){return`送达地址:${t}`}}],N=[{label:"Name",prop:"name"},{slot:"date"},{label:"Address",prop:"address"}],m=T([{date:"2016-05-03",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-02",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-04",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-01",name:"Tom",address:"No. 189, Grove St, Los Angeles"}]),E={class:"container"},S={class:"fixed-body"},C={__name:"index",setup(t){return(f,a)=>(n(),c("div",E,[l(e(d),null,{header:s(()=>a[0]||(a[0]=[o("h2",null,"基础用法",-1)])),default:s(()=>[l(e(u),{source:e(m),columns:e(v)},null,8,["source","columns"])]),_:1}),l(e(d),null,{header:s(()=>a[1]||(a[1]=[o("h2",null,"格式化数据",-1)])),default:s(()=>[l(e(u),{source:e(m),columns:e(B)},null,8,["source","columns"])]),_:1}),l(e(d),null,{header:s(()=>a[2]||(a[2]=[o("h2",null,"自定义插槽",-1)])),default:s(()=>[l(e(u),{source:e(m),columns:e(N)},{date:s(()=>[l(e(p),{label:"Date"},{default:s(r=>[l(e(b),{size:"small"},{default:s(()=>a[3]||(a[3]=[g("打卡")])),_:1})]),_:1})]),_:1},8,["source","columns"])]),_:1}),l(e(d),null,{header:s(()=>a[4]||(a[4]=[o("h2",null,"自适应固定表头",-1)])),default:s(()=>[o("div",S,[l(e(u),{source:e(m),columns:e(N)},{date:s(()=>[l(e(p),{label:"Date"},{default:s(r=>[l(e(b),{size:"small"},{default:s(()=>a[5]||(a[5]=[g("打卡")])),_:1})]),_:1})]),_:1},8,["source","columns"])])]),_:1})]))}},G=k(C,[["__scopeId","data-v-e04d9bc2"]]);export{G as default};