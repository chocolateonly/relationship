import{d as D,X as S,l as F,r as v,R as $,S as q,u as G,m as J,q as L,B as O,C as X,s as j,v as K,z as Q,A as W,D as Z,a as ee,c as le,e as b,b as e,w as l,G as r,P as k,I as ae,H as x,M as ue,J as i,_ as te}from"./index.04d73999.js";/* empty css                   *//* empty css                      *//* empty css                 *//* empty css               *//* empty css                  *//* empty css                 *//* empty css                    *//* empty css                        *//* empty css                     *//* empty css                           */import{f as oe}from"./resumelibrary.bb874f24.js";import{h as se}from"./moment.9709ab41.js";import"./request.5c0f871a.js";const ne={class:"crumbs"},de=i("\u7B80\u5386\u5E93"),re=i(" \u65B0\u589E"),ie={class:"container"},pe={class:"handle-box"},_e=i(" \xA0"),ce=i("\u641C\u7D22"),me=i("\u91CD\u7F6E"),Ee=i("\u67E5\u770B "),be={class:"pagination"},fe={class:"dialog-footer"},ge=i("\u53D6 \u6D88"),ye=i("\u786E \u5B9A"),ve=D({name:"recruitlibrary"}),Ce=D({...ve,setup(he){const A=S(),t=F({address:""}),p=F({page_index:1,page_size:10}),V=v(""),f=v([]),B=v(0),E=()=>{oe(p).then(d=>{console.log("res",d),d.status==200?(f.value=d.data.list.map(a=>({...a,sex:a.sex==0?"\u5973":"\u7537",talent_type:a.talent_type==0?"\u666E\u901A":"\u4EBA\u624D",salary:a.min_salary+"~"+a.max_salary,application_time:se(a.application_time).format("YYYY-MM-DD HH:mm:ss")})),B.value=d.data.total_count):k.error("\u6743\u9650\u4E0D\u8DB3\uFF01")})};E();const w=()=>{p.page_index=1,E()},U=()=>{p.page_index=1,E()},z=()=>{t.address="",p.page_index=1,E()},I=d=>{p.page_index=d,E()},g=v(!1);let m=F({name:"",address:""}),C=-1;const T=d=>{A.push("/recruitmanage")},M=()=>{g.value=!1,k.success(`\u4FEE\u6539\u7B2C ${C+1} \u884C\u6210\u529F`),f.value[C].name=m.name,f.value[C].address=m.address};return(d,a)=>{const R=$,Y=q,_=G,o=J,c=L,n=O,y=X,h=j,s=K,H=Q,N=W,P=Z;return ee(),le("div",null,[b("div",ne,[e(Y,{separator:"/"},{default:l(()=>[e(R,null,{default:l(()=>[de]),_:1})]),_:1}),e(_,{type:"primary",icon:r(ae),onClick:U,style:{position:"absolute",right:"20px",top:"39px"}},{default:l(()=>[re]),_:1},8,["icon"])]),b("div",ie,[b("div",pe,[e(y,{inline:!0},{default:l(()=>[e(n,{label:"\u6027  \u522B"},{default:l(()=>[e(c,{modelValue:t.address,"onUpdate:modelValue":a[0]||(a[0]=u=>t.address=u),placeholder:"\u5730\u5740",class:"handle-select mr10"},{default:l(()=>[e(o,{key:"1",label:"\u5E7F\u4E1C\u7701",value:"\u5E7F\u4E1C\u7701"}),e(o,{key:"2",label:"\u6E56\u5357\u7701",value:"\u6E56\u5357\u7701"})]),_:1},8,["modelValue"])]),_:1}),e(n,{label:"\u5B66  \u5386"},{default:l(()=>[e(c,{modelValue:t.address,"onUpdate:modelValue":a[1]||(a[1]=u=>t.address=u),placeholder:"\u5730\u5740",class:"handle-select mr10"},{default:l(()=>[e(o,{key:"1",label:"\u5E7F\u4E1C\u7701",value:"\u5E7F\u4E1C\u7701"}),e(o,{key:"2",label:"\u6E56\u5357\u7701",value:"\u6E56\u5357\u7701"})]),_:1},8,["modelValue"])]),_:1}),e(n,{label:"\u7C7B  \u578B"},{default:l(()=>[e(c,{modelValue:t.address,"onUpdate:modelValue":a[2]||(a[2]=u=>t.address=u),placeholder:"\u5730\u5740",class:"handle-select mr10"},{default:l(()=>[e(o,{key:"1",label:"\u5E7F\u4E1C\u7701",value:"\u5E7F\u4E1C\u7701"}),e(o,{key:"2",label:"\u6E56\u5357\u7701",value:"\u6E56\u5357\u7701"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(y,{inline:!0},{default:l(()=>[e(n,{label:"\u5C97  \u4F4D"},{default:l(()=>[e(c,{modelValue:t.address,"onUpdate:modelValue":a[3]||(a[3]=u=>t.address=u),placeholder:"\u5730\u5740",class:"handle-select mr10"},{default:l(()=>[e(o,{key:"1",label:"\u5E7F\u4E1C\u7701",value:"\u5E7F\u4E1C\u7701"}),e(o,{key:"2",label:"\u6E56\u5357\u7701",value:"\u6E56\u5357\u7701"})]),_:1},8,["modelValue"])]),_:1}),e(n,{label:"\u4E13  \u4E1A"},{default:l(()=>[e(c,{modelValue:t.address,"onUpdate:modelValue":a[4]||(a[4]=u=>t.address=u),placeholder:"\u5730\u5740",class:"handle-select mr10"},{default:l(()=>[e(o,{key:"1",label:"\u5E7F\u4E1C\u7701",value:"\u5E7F\u4E1C\u7701"}),e(o,{key:"2",label:"\u6E56\u5357\u7701",value:"\u6E56\u5357\u7701"})]),_:1},8,["modelValue"])]),_:1}),e(n,{label:"\u5E74  \u9F84"},{default:l(()=>[e(c,{modelValue:t.address,"onUpdate:modelValue":a[5]||(a[5]=u=>t.address=u),placeholder:"\u5730\u5740",class:"handle-select mr10"},{default:l(()=>[e(o,{key:"1",label:"\u5E7F\u4E1C\u7701",value:"\u5E7F\u4E1C\u7701"}),e(o,{key:"2",label:"\u6E56\u5357\u7701",value:"\u6E56\u5357\u7701"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(y,{inline:!0},{default:l(()=>[e(n,{label:"\u85AA  \u8D44"},{default:l(()=>[e(c,{modelValue:t.address,"onUpdate:modelValue":a[6]||(a[6]=u=>t.address=u),placeholder:"\u5730\u5740",class:"handle-select mr10"},{default:l(()=>[e(o,{key:"1",label:"\u5E7F\u4E1C\u7701",value:"\u5E7F\u4E1C\u7701"}),e(o,{key:"2",label:"\u6E56\u5357\u7701",value:"\u6E56\u5357\u7701"})]),_:1},8,["modelValue"])]),_:1}),e(n,null,{default:l(()=>[e(h,{modelValue:V.value,"onUpdate:modelValue":a[7]||(a[7]=u=>V.value=u),style:{width:"266px"},placeholder:"\u59D3\u540D/\u624B\u673A\u53F7",class:"input-with-select"},{append:l(()=>[e(_,{icon:r(x)},null,8,["icon"])]),_:1},8,["modelValue"])]),_:1}),_e,e(n,null,{default:l(()=>[e(_,{type:"primary",icon:r(x),onClick:w},{default:l(()=>[ce]),_:1},8,["icon"])]),_:1}),e(n,null,{default:l(()=>[e(_,{type:"primary",icon:r(ue),onClick:z},{default:l(()=>[me]),_:1},8,["icon"])]),_:1})]),_:1})]),e(H,{height:"450",style:{width:"100%"},data:f.value,border:"",class:"table",ref:"multipleTable","header-cell-class-name":"table-header"},{default:l(()=>[e(s,{prop:"id",label:"\u5E8F\u53F7",align:"center"}),e(s,{label:"\u64CD\u4F5C",align:"center"},{default:l(u=>[e(_,{type:"primary",link:"",onClick:Fe=>T(u.row.id)},{default:l(()=>[Ee]),_:2},1032,["onClick"])]),_:1}),e(s,{prop:"channel",label:"\u7B80\u5386\u6765\u6E90",width:"95",align:"center"}),e(s,{prop:"name",label:"\u59D3\u540D",align:"center"}),e(s,{prop:"sex",label:"\u6027\u522B",width:"55",align:"center"}),e(s,{prop:"age",width:"55",label:"\u5E74\u9F84"}),e(s,{prop:"education",width:"155",label:"\u5B66\u5386",align:"center"}),e(s,{prop:"",label:"\u4E13\u4E1A",align:"center"}),e(s,{prop:"experience",label:"\u5DE5\u4F5C\u7ECF\u9A8C",width:"100",align:"center"}),e(s,{prop:"relation",label:"\u624B\u673A\u53F7\u7801",width:"120",align:"center"}),e(s,{prop:"salary",label:"\u671F\u671B\u85AA\u8D44",width:"100",align:"center"}),e(s,{prop:"talent_type",label:"\u7C7B\u578B",align:"center"}),e(s,{prop:"uploader",label:"\u4E0A\u4F20\u4EBA",align:"center"}),e(s,{prop:"application_time",width:"200",label:"\u5165\u5E93\u65F6\u95F4"})]),_:1},8,["data"]),b("div",be,[e(N,{background:"",layout:"total, prev, pager, next","current-page":p.page_index,"page-size":p.page_size,total:B.value,onCurrentChange:I},null,8,["current-page","page-size","total"])])]),e(P,{title:"\u7F16\u8F91",modelValue:g.value,"onUpdate:modelValue":a[11]||(a[11]=u=>g.value=u),width:"30%"},{footer:l(()=>[b("span",fe,[e(_,{onClick:a[10]||(a[10]=u=>g.value=!1)},{default:l(()=>[ge]),_:1}),e(_,{type:"primary",onClick:M},{default:l(()=>[ye]),_:1})])]),default:l(()=>[e(y,{"label-width":"70px"},{default:l(()=>[e(n,{label:"\u7528\u6237\u540D"},{default:l(()=>[e(h,{modelValue:r(m).name,"onUpdate:modelValue":a[8]||(a[8]=u=>r(m).name=u)},null,8,["modelValue"])]),_:1}),e(n,{label:"\u5730\u5740"},{default:l(()=>[e(h,{modelValue:r(m).address,"onUpdate:modelValue":a[9]||(a[9]=u=>r(m).address=u)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}});const He=te(Ce,[["__scopeId","data-v-79c355ca"]]);export{He as default};
