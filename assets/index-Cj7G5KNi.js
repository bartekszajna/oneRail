import{f as l,r as o,gk as d,j as e,u,L as c,gy as x,gz as h,a as p,gx as m}from"./index-B4Yr9dN7.js";import{c as n}from"./createLucideIcon-BSBTvFab.js";function g(t,a){const s=l(),i=s.getQueryCache();return o.useSyncExternalStore(o.useCallback(r=>i.subscribe(d.batchCalls(r)),[i]),()=>s.isFetching(t),()=>s.isFetching(t))}/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],b=n("loader-circle",f);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],j=n("log-out",y);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5",key:"slp6dd"}],["path",{d:"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",key:"o0xfot"}],["path",{d:"M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05",key:"wn3emo"}]],k=n("store",v);function N({isLoading:t}){return e.jsx("div",{className:`fixed top-0 left-0 size-full z-9999 transition-opacity duration-300 flex justify-center items-center bg-black/30 backdrop-blur-sm ${t?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}`,children:e.jsx(b,{className:"animate-spin  w-10 h-10"})})}const C=()=>{const t=u();return e.jsxs("nav",{className:"bg-[var(--dark-bg)] text-white fixed p-4 w-full z-10 flex flex-row gap-4 h-[70px] items-center justify-between shadow-xl",children:[e.jsxs(c,{to:"/products",className:"font-bold text-2xl flex gap-2 p-2 items-center outline-none hover:text-amber-500 focus-visible:text-amber-500",children:[e.jsx(k,{}),e.jsx("span",{className:"hidden sm:inline",children:"e-commerce"})]}),e.jsxs(c,{onClick:()=>{x(),h(),t("/login")},to:"/login",className:"flex items-center justify-center gap-2 p-2 outline-none hover:text-amber-500 focus-visible:text-amber-500",children:[e.jsx(j,{}),e.jsx("span",{className:"hidden sm:inline",children:"Sign out"})]})]})};function M(){const t=g(),a=p(),s=a.state==="loading"||a.state==="submitting"||t>0;return e.jsxs(e.Fragment,{children:[e.jsx(C,{}),e.jsxs("main",{className:"pt-24 px-8 pb-8 relative",children:[e.jsx(N,{isLoading:s}),e.jsx(m,{})]})]})}export{M as default};
