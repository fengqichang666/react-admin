import{r as e,j as x}from"./index-788b1fdb.js";var O=(t=>(t[t.LOGIN=0]="LOGIN",t[t.REGISTER=1]="REGISTER",t[t.RESET_PASSWORD=2]="RESET_PASSWORD",t[t.MOBILE=3]="MOBILE",t[t.QR_CODE=4]="QR_CODE",t))(O||{});function n(){return e.useContext(s)}const s=e.createContext({loginState:0,setLoginState:()=>{},backToLogin:()=>{}});function S({children:t}){const[o,r]=e.useState(0),R=()=>{r(0)},c=e.useMemo(()=>({loginState:o,setLoginState:r,backToLogin:R}),[o]);return x.jsx(s.Provider,{value:c,children:t})}export{O as LoginStateEnum,S as LoginStateProvider,n as useLoginStateContext};
