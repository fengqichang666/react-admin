import{j as t,D as r}from"./index-dfa6cdd4.js";import{useLoginStateContext as i,LoginStateEnum as e}from"./LoginStateProvider-1b65509f.js";const u=()=>{const{loginState:n,setLoginState:o}=i();return n!==e.REGISTER?null:t.jsx("div",{children:t.jsx(r,{onClick:()=>o(e.LOGIN),children:"返回"})})};export{u as default};
