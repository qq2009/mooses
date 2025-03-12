import{E as c}from"./core-D5d8HsbF.js";import{o as f,A as p,w as t,a as s,d as o,e as l,g as a,h as d,E as g,c as k}from"./index-By6WQf-7.js";import{_ as v}from"./plugin-vueexport-helper-DlAUqK2U.js";const n=new c;n.onError(_=>{console.log(`捕捉到错误: ${_.message}`)});const x={__name:"basic-usage",setup(_){const u=()=>{n.on("Hello",i=>{console.log(`Hello, ${i}!`)})},r=()=>{n.emit("Hello","赵铁柱")};return(i,e)=>(f(),p(l(g),null,{header:t(()=>e[0]||(e[0]=[s("h2",null,"基础用法",-1)])),default:t(()=>[s("div",null,[o(l(a),{onClick:u},{default:t(()=>e[1]||(e[1]=[d("注册 Hello")])),_:1}),o(l(a),{onClick:r},{default:t(()=>e[2]||(e[2]=[d("触发 Hello")])),_:1})])]),_:1}))}},C={__name:"event-namespace",setup(_){const u=()=>{n.on("user.create",e=>{console.log(`User created: ${user}`)}),n.on("user.create",e=>{console.log(`User created: ${user}`)})},r=()=>{n.emit("user.create","赵铁柱")},i=()=>{n.off("user.*")};return(e,m)=>(f(),p(l(g),null,{header:t(()=>m[0]||(m[0]=[s("h2",null,"事件命名空间",-1)])),default:t(()=>[s("div",null,[o(l(a),{onClick:u},{default:t(()=>m[1]||(m[1]=[d("注册2个事件")])),_:1}),o(l(a),{onClick:r},{default:t(()=>m[2]||(m[2]=[d("触发")])),_:1}),o(l(a),{onClick:i},{default:t(()=>m[3]||(m[3]=[d("取消所有相关事件")])),_:1})])]),_:1}))}},E={__name:"max-listeners-limit",setup(_){const u=()=>{n.setMaxListeners(2),n.on("event",()=>console.log("Listener 1")),n.on("event",()=>console.log("Listener 2")),n.on("event",()=>console.log("Listener 3"))};return(r,i)=>(f(),p(l(g),null,{header:t(()=>i[0]||(i[0]=[s("h2",null,"最大监听器数量限制",-1)])),default:t(()=>[s("div",null,[o(l(a),{onClick:u},{default:t(()=>i[1]||(i[1]=[d("最大注册2个同类型事件")])),_:1})])]),_:1}))}},$={__name:"event-priority",setup(_){const u=()=>{n.on("task",()=>console.log("优先级 1"),{priority:1}),n.on("task",()=>console.log("优先级 10"),{priority:10})},r=()=>{n.emit("task")};return(i,e)=>(f(),p(l(g),null,{header:t(()=>e[0]||(e[0]=[s("h2",null,"事件优先级",-1)])),default:t(()=>[s("div",null,[e[3]||(e[3]=s("h3",null,"权重越大 事件越靠前",-1)),o(l(a),{onClick:u},{default:t(()=>e[1]||(e[1]=[d("注册")])),_:1}),o(l(a),{onClick:r},{default:t(()=>e[2]||(e[2]=[d("触发")])),_:1})])]),_:1}))}},w={__name:"event-trigger-limit",setup(_){const u=()=>{n.on("limitedEvent",()=>{console.log("This will be logged twice")},{times:2})},r=()=>{n.emit("limitedEvent")};return(i,e)=>(f(),p(l(g),null,{header:t(()=>e[0]||(e[0]=[s("h2",null,"限制事件触发次数",-1)])),default:t(()=>[s("div",null,[o(l(a),{onClick:u},{default:t(()=>e[1]||(e[1]=[d("注册限制调用2次事件")])),_:1}),o(l(a),{onClick:r},{default:t(()=>e[2]||(e[2]=[d("触发")])),_:1})])]),_:1}))}},B={class:"moose-emitter container"},H={__name:"index",setup(_){return(u,r)=>(f(),k("div",B,[r[0]||(r[0]=s("h3",null,"打开开发者模式查看",-1)),o(x),o(C),o(E),o($),o(w)]))}},N=v(H,[["__scopeId","data-v-244b27ca"]]);export{N as default};
