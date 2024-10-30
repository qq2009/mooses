import{o as p,e as h,w as l,a as _,i as a,g as u,k as d,l as f,j as v,c as L}from"./index-BffhIKMD.js";import{_ as $}from"./plugin-vueexport-helper-DlAUqK2U.js";const b="*";class H{constructor(){this._events={},this._maxListeners=1/0,this._paused=!1,this._loggingEnabled=!1,this._errorHandler=null}setMaxListeners(t){this._maxListeners=t}enableLogging(){this._loggingEnabled=!0}disableLogging(){this._loggingEnabled=!1}on(t,n,{once:s=!1,priority:e=0,times:o=1/0}={}){return t.split(",").forEach(i=>{i=i.trim(),this._events[i]||(this._events[i]=[]),this._events[i].length>=this._maxListeners&&console.warn(`Max listeners exceeded for event: ${i}`),this._events[i].push({callback:n,once:s,priority:e,times:o}),this._events[i].sort((g,x)=>x.priority-g.priority)}),this}once(t,n){return this.on(t,n,{once:!0})}async emit(t,...n){this._paused||t.split(",").forEach(s=>{const e=this._events[s]||[],o=this._events[b]||[],i=async g=>{let x=g.length;for(let c=0;c<x;c++){if(!g[c])continue;const{callback:E,once:k,times:D}=g[c];try{await Promise.resolve(E.apply(this,n))}catch(C){this._errorHandler&&this._errorHandler(C)}g[c].times--,(k||g[c].times<=0)&&(g.splice(c,1),x--,c--)}};i(e),i(o),this._loggingEnabled&&console.log(`Event emitted: ${s}`,n)})}listeners(t){return this._events[t]||[]}getEvents(){return this._events}off(t,n){return t?(t.split(",").forEach(s=>{if(!n)delete this._events[s];else{const e=this._events[s]||[];let o=e.length;for(let i=0;i<o;i++)e[i].callback===n&&(e.splice(i,1),o--,i--);e.length===0&&delete this._events[s]}}),this):(this._events={},this)}pause(){this._paused=!0}resume(){this._paused=!1}onError(t){this._errorHandler=t}}const r=new H;r.onError(m=>{console.log(`捕捉到错误: ${m.message}`)});const w={__name:"basic-usage",setup(m){const t=()=>{r.on("Hello",s=>{console.log(`Hello, ${s}!`)})},n=()=>{r.emit("Hello","赵铁柱")};return(s,e)=>(p(),h(u(v),null,{header:l(()=>e[0]||(e[0]=[_("h2",null,"基础用法",-1)])),default:l(()=>[_("div",null,[a(u(d),{onClick:t},{default:l(()=>e[1]||(e[1]=[f("注册 Hello")])),_:1}),a(u(d),{onClick:n},{default:l(()=>e[2]||(e[2]=[f("触发 Hello")])),_:1})])]),_:1}))}},B={__name:"event-namespace",setup(m){const t=()=>{r.on("user.create",e=>{console.log(`User created: ${user}`)}),r.on("user.create",e=>{console.log(`User created: ${user}`)})},n=()=>{r.emit("user.create","赵铁柱")},s=()=>{r.off("user.*")};return(e,o)=>(p(),h(u(v),null,{header:l(()=>o[0]||(o[0]=[_("h2",null,"事件命名空间",-1)])),default:l(()=>[_("div",null,[a(u(d),{onClick:t},{default:l(()=>o[1]||(o[1]=[f("注册2个事件")])),_:1}),a(u(d),{onClick:n},{default:l(()=>o[2]||(o[2]=[f("触发")])),_:1}),a(u(d),{onClick:s},{default:l(()=>o[3]||(o[3]=[f("取消所有相关事件")])),_:1})])]),_:1}))}},y={__name:"max-listeners-limit",setup(m){const t=()=>{r.setMaxListeners(2),r.on("event",()=>console.log("Listener 1")),r.on("event",()=>console.log("Listener 2")),r.on("event",()=>console.log("Listener 3"))};return(n,s)=>(p(),h(u(v),null,{header:l(()=>s[0]||(s[0]=[_("h2",null,"最大监听器数量限制",-1)])),default:l(()=>[_("div",null,[a(u(d),{onClick:t},{default:l(()=>s[1]||(s[1]=[f("最大注册2个同类型事件")])),_:1})])]),_:1}))}},I={__name:"event-priority",setup(m){const t=()=>{r.on("task",()=>console.log("优先级 1"),{priority:1}),r.on("task",()=>console.log("优先级 10"),{priority:10})},n=()=>{r.emit("task")};return(s,e)=>(p(),h(u(v),null,{header:l(()=>e[0]||(e[0]=[_("h2",null,"事件优先级",-1)])),default:l(()=>[_("div",null,[e[3]||(e[3]=_("h3",null,"权重越大 事件越靠前",-1)),a(u(d),{onClick:t},{default:l(()=>e[1]||(e[1]=[f("注册")])),_:1}),a(u(d),{onClick:n},{default:l(()=>e[2]||(e[2]=[f("触发")])),_:1})])]),_:1}))}},M={__name:"event-trigger-limit",setup(m){const t=()=>{r.on("limitedEvent",()=>{console.log("This will be logged twice")},{times:2})},n=()=>{r.emit("limitedEvent")};return(s,e)=>(p(),h(u(v),null,{header:l(()=>e[0]||(e[0]=[_("h2",null,"限制事件触发次数",-1)])),default:l(()=>[_("div",null,[a(u(d),{onClick:t},{default:l(()=>e[1]||(e[1]=[f("注册限制调用2次事件")])),_:1}),a(u(d),{onClick:n},{default:l(()=>e[2]||(e[2]=[f("触发")])),_:1})])]),_:1}))}},N={class:"moose-emitter container"},V={__name:"index",setup(m){return(t,n)=>(p(),L("div",N,[n[0]||(n[0]=_("h3",null,"打开开发者模式查看",-1)),a(w),a(B),a(y),a(I),a(M)]))}},j=$(V,[["__scopeId","data-v-244b27ca"]]);export{j as default};