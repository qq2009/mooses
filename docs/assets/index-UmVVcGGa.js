import{_ as v}from"./plugin-vueexport-helper-DlAUqK2U.js";import{o as c,e as x,w as h,a,U as y,g as u,j as m,c as _,F as P,d as I,i as b}from"./index-DLZnTZAL.js";function A(e,l,d={}){let p=!1,n,g;const r=C(d);F(e,r.initialPosition),r.handle.style.cursor="grab";function B(t){p=!0;const o=e.getBoundingClientRect();n=t.clientX-o.left,g=t.clientY-o.top,r.handle.style.cursor="grabbing",r.onStart(t),N()}function D(t){if(!p)return;const o=l.getBoundingClientRect();let{newLeft:s,newTop:i}=G(t,e,o,n,g,r.maxSpeed);if(r.boundaryLimit){const f=e.getBoundingClientRect();({newLeft:s,newTop:i}=L(s,i,f,o))}if(r.snapToBoundary){const f=e.getBoundingClientRect();({newLeft:s,newTop:i}=z(s,i,f,o,r.snapThreshold))}r.enableGridSnap&&({newLeft:s,newTop:i}=X(s,i,r.gridSize)),Y(e,s,i,r.direction),r.onMove({top:i,left:s},t)}function w(t){p=!1,r.handle.style.cursor="grab",r.onEnd(t),S()}function C(t){return{boundaryLimit:!1,direction:"both",maxSpeed:40,initialPosition:{top:0,left:0},snapToBoundary:!1,snapThreshold:20,enableGridSnap:!1,gridSize:10,handle:e,onStart:()=>{},onMove:()=>{},onEnd:()=>{},...t}}function F(t,o){t.style.left=`${o.left}px`,t.style.top=`${o.top}px`,t.style.position="absolute"}function G(t,o,s,i,f,$){let E=t.clientX-i-s.left,k=t.clientY-f-s.top;const U=Math.min(Math.max(E-parseFloat(o.style.left),-$),$),j=Math.min(Math.max(k-parseFloat(o.style.top),-$),$);return E=parseFloat(o.style.left)+U,k=parseFloat(o.style.top)+j,{newLeft:E,newTop:k}}function L(t,o,s,i){return t<0&&(t=0),o<0&&(o=0),t+s.width>i.width&&(t=i.width-s.width),o+s.height>i.height&&(o=i.height-s.height),{newLeft:t,newTop:o}}function z(t,o,s,i,f){return t<f&&(t=0),i.width-(t+s.width)<f&&(t=i.width-s.width),o<f&&(o=0),i.height-(o+s.height)<f&&(o=i.height-s.height),{newLeft:t,newTop:o}}function X(t,o,s){return t=Math.round(t/s)*s,o=Math.round(o/s)*s,{newLeft:t,newTop:o}}function Y(t,o,s,i){i==="horizontal"?t.style.left=`${o}px`:i==="vertical"?t.style.top=`${s}px`:(t.style.left=`${o}px`,t.style.top=`${s}px`)}function N(){document.addEventListener("mousemove",D),document.addEventListener("mouseup",w)}function S(){document.removeEventListener("mousemove",D),document.removeEventListener("mouseup",w)}return r.handle.addEventListener("mousedown",B),()=>{S(),r.handle.removeEventListener("mousedown",B)}}const M={mounted(e,l){const d=l.value||{},{parent:p=e.parentElement,handle:n}=d;if(n){const r=e.querySelector(n)||e;Object.assign(d,{handle:r})}const g=A(e,p,d);e._disableDrag=g},unmounted(e){e._disableDrag&&e._disableDrag()}},O={class:"parent",style:{position:"initial"}},V={class:"drag-a",style:{width:"100px",height:"100px",background:"red"}},q={__name:"basic-usage",setup(e){const l=M,d={parent:document.body,initialPosition:{top:120,left:500},onStart:()=>console.log("开始拖拽"),onMove:()=>console.log("拖动中..."),onEnd:()=>console.log("拖动结束！")};return(p,n)=>(c(),x(u(m),null,{header:h(()=>n[0]||(n[0]=[a("h2",null,"基础用法",-1)])),default:h(()=>[a("div",O,[y(a("div",V,null,512),[[u(l),d]])])]),_:1}))}},H=v(q,[["__scopeId","data-v-3d1ebe69"]]),J={class:"parent"},K={class:"drag-a",style:{width:"100px",height:"100px",background:"red"}},Q={__name:"bounded-draggable",setup(e){const l=M,d={boundaryLimit:!0,initialPosition:{top:50,left:50},onStart:()=>console.log("开始拖拽"),onMove:()=>console.log("拖动中..."),onEnd:()=>console.log("拖动结束！")};return(p,n)=>(c(),x(u(m),null,{header:h(()=>n[0]||(n[0]=[a("h2",null,"限制拖出父级容器",-1)])),default:h(()=>[a("div",J,[y(a("div",K,null,512),[[u(l),d]])])]),_:1}))}},W=v(Q,[["__scopeId","data-v-b65d27c0"]]),Z={class:"parent"},R={class:"drag-a",style:{width:"100px",height:"100px",background:"red"}},T={__name:"handle-draggable",setup(e){const l=M,d={boundaryLimit:!0,initialPosition:{top:50,left:50},handle:".handle",onStart:()=>console.log("开始拖拽"),onMove:()=>console.log("拖动中..."),onEnd:()=>console.log("拖动结束！")};return(p,n)=>(c(),x(u(m),null,{header:h(()=>n[0]||(n[0]=[a("h2",null,"手柄拖拽",-1)])),default:h(()=>[a("div",Z,[y((c(),_("div",R,n[1]||(n[1]=[a("div",{class:"handle",style:{width:"30px",height:"30px",background:"yellow"}},null,-1)]))),[[u(l),d]])])]),_:1}))}},tt=v(T,[["__scopeId","data-v-b26bf32b"]]),ot={class:"parent"},nt={class:"drag-a",style:{width:"100px",height:"100px",background:"red"}},st={class:"drag-a",style:{width:"100px",height:"100px",background:"red"}},et={__name:"directional-draggable",setup(e){const l=M,d={boundaryLimit:!0,initialPosition:{top:50,left:50},handle:".handle",direction:"horizontal",onStart:()=>console.log("开始拖拽"),onMove:()=>console.log("拖动中..."),onEnd:()=>console.log("拖动结束！")},p={boundaryLimit:!0,initialPosition:{top:50,left:300},handle:".handle",direction:"vertical",onStart:()=>console.log("开始拖拽"),onMove:()=>console.log("拖动中..."),onEnd:()=>console.log("拖动结束！")};return(n,g)=>(c(),x(u(m),null,{header:h(()=>g[0]||(g[0]=[a("h2",null,"限制拖拽方向",-1)])),default:h(()=>[a("div",ot,[y((c(),_("div",nt,g[1]||(g[1]=[a("div",{class:"handle",style:{width:"30px",height:"30px",background:"yellow"}},null,-1),a("div",null,"horizontal",-1)]))),[[u(l),d]]),y((c(),_("div",st,g[2]||(g[2]=[a("div",{class:"handle",style:{width:"30px",height:"30px",background:"yellow"}},null,-1),a("div",null,"vertical",-1)]))),[[u(l),p]])])]),_:1}))}},it=v(et,[["__scopeId","data-v-9dbedbd5"]]),at={class:"parent"},lt={class:"drag-a",style:{width:"100px",height:"100px",background:"red"}},dt={__name:"snap-to-boundary",setup(e){const l=M,d={boundaryLimit:!0,initialPosition:{top:50,left:300},handle:".handle",snapToBoundary:!0,onStart:()=>console.log("开始拖拽"),onMove:()=>console.log("拖动中..."),onEnd:()=>console.log("拖动结束！")};return(p,n)=>(c(),x(u(m),null,{header:h(()=>n[0]||(n[0]=[a("h2",null,"边界吸附",-1)])),default:h(()=>[a("div",at,[y((c(),_("div",lt,n[1]||(n[1]=[a("div",{class:"handle",style:{width:"30px",height:"30px",background:"yellow"}},null,-1)]))),[[u(l),d]])])]),_:1}))}},rt=v(dt,[["__scopeId","data-v-28f63f60"]]),ct={class:"grid-container"},ut={__name:"grid-container",setup(e){const l=[1,2,3,4,5,6].map(()=>Array.from({length:20}));return(d,p)=>(c(),_("div",ct,[(c(!0),_(P,null,I(u(l),n=>(c(),_("div",{key:n,class:"row-a"},[(c(!0),_(P,null,I(n,g=>(c(),_("div",{key:n,class:"col-b"}))),128))]))),128))]))}},pt=v(ut,[["__scopeId","data-v-aa9c921b"]]),gt={class:"parent"},ht={class:"drag-a",style:{width:"60px",height:"60px",background:"red"}},_t={__name:"grid-alignment",setup(e){const l={boundaryLimit:!0,initialPosition:{top:0,left:0},handle:".handle",enableGridSnap:!0,gridSize:60,onStart:()=>console.log("开始拖拽"),onMove:()=>console.log("拖动中..."),onEnd:()=>console.log("拖动结束！")},d=M;return(p,n)=>(c(),x(u(m),null,{header:h(()=>n[0]||(n[0]=[a("h2",null,"栅格对齐",-1)])),default:h(()=>[a("div",gt,[b(pt),y((c(),_("div",ht,n[1]||(n[1]=[a("div",{class:"handle",style:{width:"60px",height:"60px",background:"yellow"}},null,-1)]))),[[u(d),l]])])]),_:1}))}},ft=v(_t,[["__scopeId","data-v-fe36cebc"]]),vt={class:"drag container"},bt={__name:"index",setup(e){return(l,d)=>(c(),_("div",vt,[b(H),b(W),b(tt),b(it),b(rt),b(ft)]))}},mt=v(bt,[["__scopeId","data-v-1f2145d9"]]);export{mt as default};